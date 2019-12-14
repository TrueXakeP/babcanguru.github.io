'use strict'
const _ = require('lodash')
const ReactDOM = require('react-dom')
const coreUtils = require('santa-core-utils')

/**
 * Recursively collect all refs of animatable components referenced by this animation item
 * @param {object} item of type: {refNames:refNames, animationName:animationName, duration:duration, delay:delay, params:params, position:null}
 * @returns {Array<core.animatableMixin>}
 */
function collectAnimateableRefs(item) {
    const animatable = item.comp
    return _(item.animations)
        .map(def => {
            let res
            if (_.isPlainObject(def.refNames)) {
                res = getAnimatablesByRefs(animatable, def.refNames.sourceRefs)
                if (def.refNames.destRefs) {
                    res = res.concat(getAnimatablesByRefs(animatable, def.refNames.destRefs))
                }
            } else {
                res = getAnimatablesByRefs(animatable, def.refNames)
            }
            return res
        }).flattenDeep()
        .compact()
        .uniq()
        .value()
}

function getParams(item) {
    if (!item.params) {
        return {}
    }
    return _.isFunction(item.params) ? item.params() : coreUtils.objectUtils.cloneDeep(item.params)
}

/**
 *
 * @param {object} item of type: {refNames:refNames, animationName:animationName, duration:duration, delay:delay, params:params, position:null}
 * @param {comp.animationsMixin} comp
 * @param {SequenceBuilder} sequence
 * @returns {TimelineMax}
 */
function flushSequenceItems(animations, item, comp, sequence) {
    /**
     * @param {{refNames:{sourceRefs:Array<string>|string, destRefs:Array<string>|string|undefined}|Array<string>|string="", animationName:String, duration:Number, delay:Number, params:Object, position:String|Number|null}} def
     */
    _.forEach(item.animations, function(def) {
        const params = getParams(def)

        let sourceElements
        let destinationElements
        if (_.isPlainObject(def.refNames)) {
            sourceElements = getElementsByRefs(comp, def.refNames.sourceRefs)
            destinationElements = def.refNames.destRefs && getElementsByRefs(comp, def.refNames.destRefs)
        } else {
            sourceElements = getElementsByRefs(comp, def.refNames)
        }

        let tween
        if (destinationElements) {
            //Transitions
            tween = animations.transition(def.animationName, sourceElements, destinationElements, def.duration, def.delay, params)
            if (tween) {
                sequence.add(tween, def.position)
            }
        } else {
            //Animations
            tween = animations.animate(def.animationName, sourceElements, def.duration, def.delay, params)
            if (tween) {
                sequence.add(tween, def.position)
            }
        }
    })
    return sequence.get()
}

function _flushQueue(animations, queue, sequences) {
    //noinspection LoopStatementThatDoesntLoopJS
    while (queue.length > 0) {
        // {animatable: animatable, id: id, animations: animations, callbacks: callbacks, params: params}
        //TODO: save animations by {id:id}

        const item = queue.pop()
        item.callbacks = item.callbacks || {}
        const allAnimateableRefs = collectAnimateableRefs(item)

        const params = getParams(item)

        const handlersParams = {
            suppressReactRendering: params.suppressReactRendering !== false, // default to true
            forgetSequenceOnComplete: params.forgetSequenceOnComplete !== false, // default to true
            id: item.id
        }

        params.callbacks = {
            onStart: item.callbacks.onStart,
            onComplete: endHandler.bind(null, allAnimateableRefs, handlersParams, item.callbacks.onComplete, sequences),
            onReverseComplete: endHandler.bind(null, allAnimateableRefs, handlersParams, item.callbacks.onReverseComplete, sequences),
            onInterrupt: endHandler.bind(null, allAnimateableRefs, handlersParams, item.callbacks.onInterrupt, sequences)
        }

        sequences[item.id] = flushSequenceItems(animations, item, item.comp, animations.sequence(params))

        if (item.callbacks.onInit) {
            item.callbacks.onInit(sequences[item.id])
        }

        // Call startHandler synchronously *before* the animation runs and not on "onStart"
        // because "onStart" is called one animationFrame too late and unwanted renders can slip in the gap
        startHandler(allAnimateableRefs, handlersParams)
    }
}

/**
 * Play all the animations stored in the passed queue
 * Creates a separate sequence (TimelineMax instance) for each of the animation, transition or sequence definitions
 * There are two important parameters defined in the sequence parameters to define some low-level behaviors of the animations:
 * 1. suppressReactRendering, defaults to 'true': defines whether react should stop updating the animating element while the animation is running
 * 2. forgetSequenceOnComplete, defaults to 'true': defines whether the sequence should be removed from the live sequences list of the animating component
 *
 * @param {Array<Object>} queue Queue of animation, transition or sequence definitions
 * @param {Object} sequences a list of live TweenMax tweens by their ids, populated by this function
 * NOTE: the queue ans sequences params are directly manipulated by this function and will become empty at the end
 */
function flushQueue(animations, queue, sequences, isDebug) {
    try {
        _flushQueue(animations, queue, sequences)
    } catch (e) {
        if (isDebug) {
            throw e
        }
    }
}

/**
 * Notify the component of the beginning of an animation and run the passed callback
 * @param {array<core.animatableMixin>} allAnimateableRefs
 * @param {{suppressReactRendering:boolean}} params
 * @param {function} [callback]
 */
function startHandler(allAnimateableRefs, params, callback) {
    if (params.suppressReactRendering) {
        _.invokeMap(allAnimateableRefs, 'animationStarted')
    }
    if (callback) {
        callback()
    }
}

/**
 * Notify the component of the end of an animation and run the passed callback
 * @param {array<core.animatableMixin>} allAnimateableRefs
 * @param {{suppressReactRendering:boolean, forgetSequenceOnComplete:boolean, id:string}} params
 * @param {function} [callback]
 * @param {Object} sequences
 * NOTE: the sequences param is directly manipulated by this function and will become empty at the end
 */
function endHandler(allAnimateableRefs, params, callback, sequences) {
    if (params.forgetSequenceOnComplete) {
        delete sequences[params.id]
    }

    if (params.suppressReactRendering) {
        _.invokeMap(allAnimateableRefs, 'animationEnded')
    }
    if (callback) {
        callback()
    }
}

//TODO-mobx  - I'm not happy having utility that touches compRefs, we want a way to have this logic in one place
function getComponentRef(comp, ref) {
    return comp.compRefs && comp.compRefs[ref] || comp.refs[ref]
}

/**
 * Return the dom elements represented by the passed refs
 * @param {ReactCompositeComponent} comp comp.animatableMixin
 * @param {String|Array<String>|Array<Array<String>>} refNames
 * @returns {Array<HTMLElement>}
 */
function getAnimatablesByRefs(comp, refNames) {
    refNames = _.isArray(refNames) ? refNames : [refNames]
    return _(refNames)
        .flatMap(ref => {
            if (_.isArray(ref)) {
                return _.reduce(ref, getComponentRef, comp)
            }
            return _.isString(ref) ? getComponentRef(comp, ref) : ref
        })
        .compact()
        .value()
}

/**
 * Return the dom elements represented by the passed refs
 * @param {ReactCompositeComponent} comp
 * @param {String|Array<String>} refNames
 * @returns {Array<HTMLElement>}
 */
function getElementsByRefs(comp, refNames) {
    return _.map(getAnimatablesByRefs(comp, refNames), ReactDOM.findDOMNode)
}

module.exports = {
    flushQueue,
    getElementsByRefs
}