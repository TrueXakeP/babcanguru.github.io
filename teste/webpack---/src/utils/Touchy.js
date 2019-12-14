'use strict'

const _ = require('lodash')

const defaults = {
    touched: false,
    moved: false,
    deltaCoords: {
        x: 0,
        y: 0
    },
    evObj: {}
}

Object.freeze(defaults)

const touchEvents = ['onSwipeLeft', 'onSwipeRight', 'onSwipeUp', 'onSwipeDown', 'onTap']
const swipeDirectionCallbacks = {
    left: 'onSwipeLeft',
    right: 'onSwipeRight',
    up: 'onSwipeUp',
    down: 'onSwipeDown'
}

/**
 *
 * @param e
 * @returns {{x: number, y: number}}
 */
function getCoords(e) {
    if (e.touches && e.touches.length) {
        const touch = e.touches[0]
        return {
            x: touch.pageX,
            y: touch.pageY
        }
    }
}

/**
 *
 * @constructor
 */
function Touchy() {
    this.data = {}
}

Touchy.prototype = {

    /**
     *
     * @param e
     */
    onTouchStart(e) {
        this.data = _.defaults({
            touched: true,
            numOfTouches: e.touches.length,
            startCoords: getCoords(e),
            startTime: Date.now(),
            evObj: _.clone(e)
        }, defaults)
    },

    /**
     *
     * @param e
     */
    onTouchMove(e) {
        const coords = getCoords(e)
        if (coords) {
            if (!this.data.startCoords) {
                this.data.startCoords = coords
            }

            const deltaX = this.data.startCoords.x - coords.x
            const deltaY = this.data.startCoords.y - coords.y

            this.data.moved = true
            this.data.deltaCoords = {
                x: deltaX,
                y: deltaY
            }
        }
    },

    /**
     *
     * @param callbacks
     */
    onTouchEnd(callbacks) {
        this.data.endTime = Date.now()

        if (_.isEmpty(callbacks)) {
            return
        }

        if (this.isValidSwipe()) {
            const swipeDirection = this.getSwipeDirection(this.data.deltaCoords.x, this.data.deltaCoords.y)
            const swipeCallback = swipeDirectionCallbacks[swipeDirection]
            if (callbacks[swipeCallback]) {
                callbacks[swipeCallback](this.data.evObj)
            }
        } else if (this.isValidTap()) {
            if (callbacks.onTap) {
                callbacks.onTap(this.data.evObj)
            }
        }
    },

    /**
     *
     * @param ref
     */
    registerTouchEvents(ref) {
        const callbacks = _.pick(ref, touchEvents)

        if (!_.isEmpty(callbacks)) {
            ref.onTouchStart = this.onTouchStart.bind(this)
            ref.onTouchMove = this.onTouchMove.bind(this)
            ref.onTouchEnd = this.onTouchEnd.bind(this, callbacks)
        }
    },

    removeCustomTouchEvents(ref) {
        if (ref) {
            touchEvents.forEach(eventName => delete ref[eventName])
        }
    },

    /**
     *
     * @returns {boolean}
     */
    isValidSwipe() {
        return this.data.moved &&
            this.data.numOfTouches === 1 &&
            this.data.endTime - this.data.startTime < 500 &&
            (Math.abs(this.data.deltaCoords.x) > 100 || Math.abs(this.data.deltaCoords.y) > 60)
    },

    /**
     *
     * @returns {boolean}
     */
    isValidTap() {
        return this.data.touched && !this.data.moved && this.data.numOfTouches === 1
    },

    /**
     *
     * @param deltaX
     * @param deltaY
     * @returns {string}
     */
    getSwipeDirection(deltaX, deltaY) {
        let direction
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction = deltaX > 0 ? 'left' : 'right'
        } else {
            direction = deltaY > 0 ? 'up' : 'down'
        }
        return direction
    }
}

module.exports = Touchy