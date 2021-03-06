'use strict'
const {
    getClipParams,
    getElementsAsArray
} = require('../../../../utils/definitionsUtils')

const name = 'DropClipIn'
const properties = {
    hideOnStart: true,
    mobile: true,
    viewportThreshold: 0.15,

    groups: ['entrance', 'animation'],
    schema: {
        duration: {
            type: 'number',
            min: 0,
            default: 0
        },
        delay: {
            type: 'number',
            min: 0,
            default: 0
        },
        power: {
            type: 'string',
            enum: ['soft', 'medium', 'hard'],
            default: 'soft'
        }
    }
}

const scaleMap = {
    soft: 1.2,
    medium: 3.6,
    hard: 6
}

function register({
    factory,
    engine
}) {
    /**
     * Expand in from
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params] Timeline optional parameters (Tween values cannot be changed here, use BaseFade).
     * @param {number} [scale=1.2]
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        power = properties.schema.power.default,
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)
        const scale = scaleMap[power]

        const sequence = factory.sequence(params)
        sequence.add(factory.animate('BaseFade', elements, duration, delay, {
            from: {
                opacity: 0
            },
            to: {
                opacity: 1
            },
            ease: 'Circ.easeOut'
        }))

        elements.forEach(element => {
            const compRect = engine.getBoundingRect(element)
            const contentRect = engine.getBoundingContentRect(element)
            const from = getClipParams(compRect, contentRect, 'initial', {
                scaleX: 1 / scale,
                scaleY: 1 / scale
            })

            sequence.add([
                factory.animate('BaseClipPath', element, duration, delay, {
                    from,
                    ease: 'Quad.easeOut'
                }),
                factory.animate('BaseScale', element, duration, delay, {
                    from: {
                        scale
                    },
                    ease: 'Quad.easeOut'
                })
            ], 0)
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