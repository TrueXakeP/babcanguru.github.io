'use strict'

const ReactDOM = require('react-dom')
const _ = require('lodash')

function forceRedraw(comp) {
    const display = comp.style.display
    comp.style.display = 'none'
    // no need to store this anywhere, the reference is enough
    comp.offsetHeight // eslint-disable-line no-unused-expressions
    comp.style.display = display
}

module.exports = {
    isAnimatable: true,
    shouldChildrenUpdate: true,

    /**
     * Reset the animations counter
     */
    componentWillMount() {
        this._animatableMixin = {
            animationsCounter: 0,
            deferredStates: []
        }
        this._onAnimationEnded = _.noop
    },

    componentDidMount() {
        this._animatableMixin.setStateOrig = this.setState
    },

    /**
     * Reset the layout update when unmounting
     */
    componentWillUnmount() {
        this._animatableMixin.updateOnAnimationEnded = false
        // TODO delete sequence if unmounting
    },

    /**
     * Increase the animations counter when an animation starts
     */
    animationStarted() {
        if (++this._animatableMixin.animationsCounter === 1) {
            this.setState = this.setStateDeferred
            this.isCurrentlyAnimating = true
        }
        if (!this.shouldChildrenUpdate) {
            _(this.refs)
                .filter('isAnimatable')
                .invokeMap('animationStarted')
                .value()
        }
    },
    /**
     * Decrease the animations counter when an animation ends.
     * @param {boolean} [shouldUpdate=true]
     */
    animationEnded(shouldUpdate) {
        shouldUpdate = shouldUpdate !== false

        if (!this.shouldChildrenUpdate) {
            _(this.refs)
                .filter('isAnimatable')
                .invokeMap('animationEnded', false)
                .value()
        }

        const animatableMixin = this._animatableMixin
        if (animatableMixin.animationsCounter) {
            if (--animatableMixin.animationsCounter === 0) {
                this.setState = animatableMixin.setStateOrig
                this.isCurrentlyAnimating = false
                _.invoke(this, '_onAnimationEnded')
            }
        }

        if (shouldUpdate) {
            if (animatableMixin.deferredStates.length) {
                const deferredStates = animatableMixin.deferredStates
                for (let i = 0; i < deferredStates.length; i += 2) {
                    animatableMixin.setStateOrig.call(this, deferredStates[i], deferredStates[i + 1])
                }
                deferredStates.length = 0
            } else if (animatableMixin.updateOnAnimationEnded) {
                this.forceUpdate()
            }
        }
        animatableMixin.updateOnAnimationEnded = false

        if (this.forceRedrawOnAnimationEnded === true) {
            forceRedraw(ReactDOM.findDOMNode(this))
        }
    },

    setStateDeferred(newState, callback) {
        const deferredStates = this._animatableMixin.deferredStates
        const length = deferredStates.length
        if (length === 0 || deferredStates[length - 1] || callback) {
            deferredStates.push(newState)
            deferredStates.push(callback)
        } else {
            _.assign(deferredStates[length - 2], newState)
            deferredStates[length - 1] = callback
        }
    },

    /**
     * Return false if this component is currently animating and should not be updated
     * @returns {boolean}
     */
    shouldComponentUpdateAnimatable() {
        const goingToUpdate = this._animatableMixin.animationsCounter === 0
        if (!goingToUpdate) {
            this._animatableMixin.updateOnAnimationEnded = true
        }

        return goingToUpdate
    },

    registerOnAnimationEnd(cb) {
        this._onAnimationEnded = cb
    },

    unregisterOnAnimationEnd() {
        this._onAnimationEnded = _.noop
    }
}