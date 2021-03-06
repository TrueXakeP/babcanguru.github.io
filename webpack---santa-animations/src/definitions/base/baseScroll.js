'use strict'
const name = 'BaseScroll'
const properties = {}

function register({
    engine,
    factory
}) {
    /**
     * Scroll base animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM elements
     * @param {Number} [duration=1.0]
     * @param {Number} [delay=0]
     * @param {Object} params
     * @param {Object} [scrollTo] params.to.scrollTo will work to for compatibility reasons, defaults to {x:0, y:0}
     * @param {Number} [x]
     * @param {Number} [y]
     * @param {Boolean} [params.autoKill=false] set to false so the scroll will continue even if interrupted
     * @returns {TimelineMax|TweenMax}
     */
    function animation(elements, duration = 0, delay = 0, {
        x = 0,
        y = 0,
        autoKill = false,
        ...params
    } = {}) { // eslint-disable-line complexity
        const scrollTo = {
            x,
            y,
            autoKill
        }
        const sequence = factory.sequence()

        sequence.add(engine.tween(elements, {
            duration,
            delay,
            scrollTo,
            ...params
        }, ['scrollTo', 'autoKill']), 0)
        return sequence.get()
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}