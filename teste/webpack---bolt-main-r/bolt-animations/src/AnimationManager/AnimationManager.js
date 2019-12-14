/**
 * @typedef {Object} AnimationDefsMap
 * @property {CompAnimationDefs} <compId>
 *
 * @typedef {Object} CompAnimationDefs
 * @property {AnimationDef[]} <action>
 *
 * @typedef {Object} AnimationDef
 * @property {string} targetId
 * @property {string} action
 * @property {string} name
 * @property {number} duration
 * @property {number} delay
 * @property {Object} params
 *
 * @typedef {Object} TriggerDescriptor
 * @property {string} compId
 * @property {string} action
 */

const CLEAR_PROPS = 'clip,clipPath,webkitClipPath,willChange,opacity,transform,transformOrigin'
const getStateId = (id, action) => `${id}-${action}`

/**
 * @param {AnimationDefsMap} animationDefsMap
 * @param {object} animationProperties
 * @param {string} [optionalAction] a specific ation to hide
 * @returns {array<string>}
 */
function getCompsToHide(animationDefsMap, animationProperties, optionalAction) {
    return Object
        .entries(animationDefsMap)
        .reduce((acc, [compId, actions]) => {
            const actionsToHide = optionalAction ? [optionalAction] : Object.keys(actions)
            actionsToHide.forEach(action => {
                const behaviors = actions[action] || []
                const hide = behaviors.some(({
                    name
                }) => animationProperties[name] && animationProperties[name].hideOnStart)
                if (hide) {
                    acc.push([compId, action])
                }
            })

            return acc
        }, [])
}

/**
 * @class AnimationManager
 */
export class AnimationManager {
    /**
     * @param {SantaAnimations} santaAnimations
     * @param {core.animations.tweenEngine} tweenEngineAndFactory
     * @param {'MOBILE'|'DESKTOP'} viewMode
     */
    constructor({
        santaAnimations,
        tweenEngineAndFactory
    }, viewMode) {
        /**@type SantaAnimations*/
        this.animator = santaAnimations.create(tweenEngineAndFactory, undefined, viewMode)
        this.animationProperties = santaAnimations.animationProperties
        /**@type AnimationDefsMap*/
        this.definitions = {}
        /**
         * State persistent across pages
         * @type {{running: Map<TimelineMax, {id: string, action: string}>, played: Map<string, {playOnce: boolean, persistOnNav: boolean}>}}
         */
        this.sessionState = {
            played: new Map(),
            running: new Map()
        }
        /**
         * State for current page, by actions
         * @type {{screenIn: {played: Map<string, {targetId: string, id: string}>}}}
         */
        this.localState = {
            screenIn: {
                played: new Map()
            }
        }
    }

    _shouldSkipPlayedAnimation(stateId) {
        const wasPlayedLocally = this.localState.screenIn.played.has(stateId)
        const wasPlayedInSession = this.sessionState.played.has(stateId)
        const {
            playOnce,
            persistOnNav
        } = this.sessionState.played.get(stateId) || {}
        return wasPlayedLocally || wasPlayedInSession && (playOnce || persistOnNav)
    }

    _shouldHideComponent(id, action) {
        const compActions = this.definitions[id]

        if (compActions) {
            const animationDefs = compActions[action]

            if (animationDefs) {
                const properties = this.animationProperties

                return animationDefs.some(({
                        name
                    }) =>
                    properties[name] && properties[name].hideOnStart)
            }
        }

        return false
    }

    _hideComponent(compId) {
        const element = document.querySelector(`#${compId}`)
        if (element) {
            element.style.opacity = 0
        }
    }

    _unhideComponent(compId) {
        const element = document.querySelector(`#${compId}`)
        if (element) {
            element.style.opacity = ''
        }
    }

    getAnimatorInstance() {
        return this.animator
    }

    /**
     * Save a copy of all animation definitions
     * @param {AnimationDefsMap} animationDefsMap
     * {
     *     [compId]: {
     *         [action]: [{
     *             targetId: compId,
     *             name: 'FadeIn',
     *             action: 'screenIn',
     *             duration: 1,
     *             delay: 0,
     *             params: {...}
     *         }, ...],
     *     ...
     *     }
     *     ...
     * }
     */
    setDefinitions(animationDefsMap) {
        this.definitions = animationDefsMap
    }

    _hideCompBeforeAnimation(compId, action) {
        const stateId = getStateId(compId, action)

        if (this._shouldSkipPlayedAnimation(stateId)) {
            return
        }

        this._hideComponent(compId)
    }

    /**
     * Hide components that should be animated
     * @param {string} [optionalAction] a specific action to hide
     */
    hideBeforeAnimation(optionalAction) {
        // Handle screen in hide on start
        const compsToHide = getCompsToHide(this.definitions, this.animationProperties, optionalAction)
        compsToHide.forEach(([compId, action]) => {
            this._hideCompBeforeAnimation(compId, action)
        })
    }

    /**
     * Reset the local state and the session state of this manager
     * Useful when imitating the behavior of a page load, like when presenting a preview from the editor
     */
    resetLocalAndSessionStates() {
        [this.localState.screenIn.played,
            this.sessionState.played,
            this.sessionState.running
        ].forEach(map => map.clear())
    }

    /**
     * Trigger animations on all trigger descriptors passed.
     * @param {TriggerDescriptor[]} triggers
     */
    trigger(triggers = []) {
        const animationDefs = triggers.reduce((acc, {
            compId,
            action
        }) => {
            const componentDefs = this.definitions[compId] || {}
            const actionDefs = componentDefs[action] || []
            return acc.concat(actionDefs)
        }, [])
        animationDefs.forEach(({
            action,
            ...animation
        }) => this.executeAnimation(action, animation))
    }

    initAction(action, id) {
        switch (action) {
            case 'screenIn':
                {
                    this.stopAnimations([action], {
                        idToKeep: id
                    })
                    this.clearLocalStore(action, id)

                    this.hideBeforeAnimation(action)
                }
        }
    }

    /**
     * Clear component's state and hide it
     *
     * @param {string} id
     * @param {string} action
     * @param {boolean} [clearStore = true]
     */
    initComponentAction(id, action, {
        clearStore = true
    }) {
        // this.stopAnimations([action], {ids: [id]})
        if (clearStore) {
            this.clearCompLocalStore(id, action)
        }

        if (this._shouldHideComponent(id, action)) {
            this._hideCompBeforeAnimation(id, action)
        }
    }

    /**
     * Run an animation by action defs, each action has different pre-requisites and post-requisites
     * trying only screenIn now
     * @param action
     * @param name
     * @param targetId
     * @param pageId
     * @param duration
     * @param playOnce
     * @param persistOnNav
     * @param delay
     * @param params
     */
    executeAnimation(action, {
        name,
        targetId,
        pageId,
        duration = 0,
        delay = 0,
        playOnce = false,
        persistOnNav = false,
        params = {}
    }) {
        const stateId = getStateId(targetId, action)
        switch (action) {
            case 'screenIn':
                {
                    // Skip if played in current page or played in current session and marked as play once
                    if (this._shouldSkipPlayedAnimation(stateId)) {
                        break
                    }

                    const sequence = this.animator.sequence({
                        callbacks: {
                            onStart: instance => this.sessionState.running.set(instance, {
                                targetId,
                                action,
                                id: pageId
                            }),
                            onComplete: instance => this.sessionState.running.delete(instance),
                            onInterrupt: instance => this.sessionState.running.delete(instance)
                        }
                    })
                    const clearParams = {
                        props: CLEAR_PROPS,
                        immediateRender: false
                    }
                    const element = document.querySelector(`#${targetId}`) // TODO: see where to handle the DOM fetching

                    sequence
                    .add(this.animator.animate(name, element, duration, delay, params), 0)
                    .add(this.animator.animate('BaseClear', element, 0, 0, clearParams))

                    this.localState.screenIn.played.set(stateId, {
                        targetId,
                        id: pageId
                    })
                    this.sessionState.played.set(stateId, {
                        playOnce,
                        persistOnNav
                    })

                    break
                }
        }
    }

    preventPendingScreenInAnimation(targetId) {
        const stateId = getStateId(targetId, 'screenIn')
        this.localState.screenIn.played.set(stateId, {
            targetId
        })
        this._unhideComponent(targetId)
    }

    /**
     * kill all running animations of a specific action, if no action passed, kill all
     * @param {array<string>} actions
     * @param {boolean} [skipPersistent=true] skip animations marked as persistent (like masterPage animations)
     * @param {string} idToKeep
     */
    stopAnimations(actions = [], {
        skipPersistent = true,
        idToKeep
    } = {}) {
        this.sessionState.running.forEach(({
            targetId,
            action,
            id
        }, animation) => {
            const stateId = getStateId(targetId, action)
            // If no actions passed, stop all. Else, stop by actions
            const isActionToStop = !actions.length || actions.includes(action)
            // If animation is marked as persistent (ie. master page)
            const isPersistentToSkip = skipPersistent && this.sessionState.played.get(stateId).persistOnNav
            if (isActionToStop && !isPersistentToSkip && idToKeep !== id) {
                this.animator.kill(animation, 1)
            }
        })
    }

    /**
     * Clear temp (page) played animations list by action name
     * @param {string} action
     * @param {string} idToKeep
     */
    clearLocalStore(action, {
        idToKeep
    }) {
        const state = this.localState[action]

        if (state) {
            state.played.forEach(({
                targetId,
                id
            }, stateId) => {
                if (!this.definitions[targetId] || idToKeep !== id) {
                    state.played.delete(stateId)
                }
            })
        }
    }

    /**
     * Clear temp played animations by action and component id
     *
     * @param {string} action
     * @param {string} compId
     */
    clearCompLocalStore(compId, action) {
        const state = this.localState[action]

        if (state) {
            const stateId = getStateId(compId, action)
            state.played.delete(stateId)
        }
    }
}