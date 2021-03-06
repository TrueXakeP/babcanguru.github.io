'use strict'
const {
    getAdjustedDirection,
    getTransformOriginTweenParams,
    getElementTransformedPosition,
    getElementsAsArray
} = require('../../../utils/definitionsUtils')

const name = 'FoldOut'
const properties = {
    groups: ['3d', 'exit', 'animation'],
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
            enum: ['top', 'right', 'bottom', 'left'],
            default: 'left'
        }
    }
}

const paramsMap = {
    top: {
        angleX: '-90',
        angleY: '0',
        origin: {
            x: '50%',
            y: '0'
        },
        idx: 0
    },
    right: {
        angleX: '0',
        angleY: '-90',
        origin: {
            x: '100%',
            y: '50%'
        },
        idx: 1
    },
    bottom: {
        angleX: '90',
        angleY: '0',
        origin: {
            x: '50%',
            y: '100%'
        },
        idx: 2
    },
    left: {
        angleX: '0',
        angleY: '90',
        origin: {
            x: '0',
            y: '50%'
        },
        idx: 3
    }
}

function register({
    engine,
    factory
}) {
    /**
     * FoldOut animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params]
     * @param {'top'|'right'|'bottom'|'left'} [direction='left'] top, right, bottom, left
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        direction = properties.schema.direction.default,
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)

        const sequence = factory.sequence(params)
        sequence.add(factory.animate('BaseFade', elements, duration * 0.75, delay + duration * 0.25, {
            from: {
                opacity: 1
            },
            to: {
                autoAlpha: 0
            },
            ease: 'Sine.easeInOut'
        })) // eslint-disable-line no-mixed-operators

        elements.forEach(element => {
            const angle = element.getAttribute('data-angle') || 0

            const elementAngleInRad = angle * Math.PI / 180
            const adjDirection = getAdjustedDirection(paramsMap, direction, angle)

            const compRect = engine.getBoundingRect(element)
            const contentRect = engine.getBoundingContentRect(element)

            const transformXYParams = getElementTransformedPosition(paramsMap[adjDirection].origin, contentRect, elementAngleInRad)
            const originParams = getTransformOriginTweenParams(compRect, contentRect, paramsMap[adjDirection].origin)
            const toParams = {
                rotationX: paramsMap[adjDirection].angleX,
                rotationY: paramsMap[adjDirection].angleY
            }
            // the tween
            sequence.add([
                factory.animate('BasePosition', element, 0, delay, {
                    from: {
                        transformOrigin: originParams,
                        x: transformXYParams.x,
                        y: transformXYParams.y
                    }
                }),
                factory.animate('BaseRotate3D', element, duration, delay, {
                    to: toParams,
                    perspective: 800,
                    fallbackFor3D: true,
                    ease: 'Cubic.easeInOut'
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