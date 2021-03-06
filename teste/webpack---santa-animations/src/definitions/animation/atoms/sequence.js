'use strict'
const name = 'Sequence'
const properties = {
    groups: ['animation'],
    schema: {
        delay: {
            type: 'integer',
            min: 0,
            default: 0
        },
        animations: {
            type: 'array'
        },
        repeat: {
            type: 'integer',
            min: -1
        },
        repeatDelay: {
            type: 'number',
            min: 0
        },
        yoyo: {
            type: 'boolean'
        }
    }
}

function register({
    factory
}) {
    /**
     * Sequence animations
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {array<object>} [animations]
     * @param {Object} [params] Timeline optional parameters.
     * @param {Object} [params.repeat] Timeline optional parameters.
     * @param {Object} [params.repeatDelay] Timeline optional parameters.
     * @param {Object} [params.yoyo] Timeline optional parameters.
     * @param {Object} [durationStub] stub. no duration for sequence.
     * @param {Object} [sequenceDelay] Timeline optional parameters.
     * @returns {TimelineMax}
     */
    function animation(elements, durationStub, sequenceDelay = 0, {
        animations,
        ...params
    } = {}) {
        const sequence = factory.sequence({
            delay: sequenceDelay,
            ...params
        })

        animations.forEach(def => {
            const {
                name: animationName,
                duration,
                delay,
                offset,
                from = {},
                to = {},
                ease
            } = def
            sequence.add(factory.animate(animationName, elements, duration, delay, {
                from,
                to,
                ease
            }), offset)
        })

        return sequence.get()
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}