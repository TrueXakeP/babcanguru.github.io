'use strict'
const {
    getClipParams,
    getClipFallbackParams,
    getAdjustedDirection,
    getTransformTweenParams,
    getElementsAsArray
} = require('../../../../utils/definitionsUtils')

const name = 'Reveal'
const properties = {
    hideOnStart: true,
    mobile: true,
    viewportThreshold: 0.15,

    groups: ['mask', 'entrance', 'animation'],
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
        direction: {
            type: 'string',
            enum: ['top', 'right', 'center', 'bottom', 'left'],
            default: 'left'
        }
    }
}

const paramsMap = {
    top: {
        dx: 0,
        dy: -1,
        idx: 0
    },
    right: {
        dx: 1,
        dy: 0,
        idx: 1
    },
    bottom: {
        dx: 0,
        dy: 1,
        idx: 2
    },
    left: {
        dx: -1,
        dy: 0,
        idx: 3
    }
}

function register({
    engine,
    factory
}) {
    /**
     * Reveal (Clip) animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params]
     * @param {'top'|'right'|'bottom'|'left'} [direction=left] 'top' or 'right' or 'bottom' or 'left'
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        direction = properties.schema.direction.default,
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)

        const sequence = factory.sequence(params)
        sequence.add(factory.animate('BaseFade', elements, 0.1, delay, {
            from: {
                opacity: 0
            },
            to: {
                opacity: 1
            },
            ease: 'Cubic.easeInOut'
        }))

        elements.forEach(element => {
            const compRect = engine.getBoundingRect(element)
            const contentRect = engine.getBoundingContentRect(element)

            const angle = element.getAttribute('data-angle') || 0
            const angleInRad = angle * Math.PI / 180

            const adjDirection = direction !== 'center' ? getAdjustedDirection(paramsMap, direction, angle) : direction

            /**
             * Dec 30 2018: Fallback for IE / Edge which does not support clipPath. One day we could delete this
             * Reveal, Conceal, SlideIn and SlideOut do the same in fallback state
             */
            if (typeof element.style.clipPath === 'undefined') {
                const scale = getClipFallbackParams(adjDirection)
                const directionFix = paramsMap[adjDirection] || {
                    dx: 0,
                    dy: 0
                } // We have "center" only here
                const directionOverride = {
                    dx: directionFix.dx / 2,
                    dy: directionFix.dy / 2
                }
                const position = getTransformTweenParams(contentRect, directionOverride, angleInRad)

                sequence.add([
                    factory.animate('BaseScale', element, duration, delay, {
                        from: scale,
                        ease: 'Cubic.easeOut'
                    }),
                    factory.animate('BasePosition', element, duration, delay, {
                        from: position,
                        ease: 'Cubic.easeOut'
                    })
                ], 0)
            } else {
                const from = getClipParams(compRect, contentRect, adjDirection)

                sequence.add(factory.animate('BaseClipPath', element, duration, delay, {
                    from,
                    ease: 'Cubic.easeOut'
                }), 0)
            }
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