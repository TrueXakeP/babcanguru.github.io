'use strict'
const {
    getAdjustedDirection,
    getElementTransformedPosition,
    getTransformOriginTweenParams,
    getElementsAsArray
} = require('../../../../utils/definitionsUtils')

const name = 'FoldIn'
const properties = {
    hideOnStart: true,
    mobile: true,
    viewportThreshold: 0.15,

    groups: ['3d', 'entrance', 'animation'],
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
        angleX: '-45',
        angleY: '0',
        origin: {
            x: '50%',
            y: '0'
        },
        idx: 0
    },
    right: {
        angleX: '0',
        angleY: '-45',
        origin: {
            x: '100%',
            y: '50%'
        },
        idx: 1
    },
    bottom: {
        angleX: '45',
        angleY: '0',
        origin: {
            x: '50%',
            y: '100%'
        },
        idx: 2
    },
    left: {
        angleX: '0',
        angleY: '45',
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
     * FoldIn animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params]
     * @param {'top'|'right'|'bottom'|'left'} [direction=left] top, right, bottom, left
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        direction = properties.schema.direction.default,
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)

        const sequence = factory.sequence(params)
        sequence.add(factory.animate('BaseFade', elements, 0, 0, {
            to: {
                opacity: 0.01
            }
        }))
        sequence.add(factory.animate('BaseFade', elements, duration * 0.5, delay, {
            to: {
                opacity: 1
            },
            ease: 'Quad.easeOut'
        }), 'animation-start')

        elements.forEach(element => {
            const elementAngleInDeg = element.getAttribute('data-angle') || 0

            const elementAngleInRad = elementAngleInDeg * Math.PI / 180
            const adjDirection = getAdjustedDirection(paramsMap, direction, elementAngleInDeg)

            const compRect = engine.getBoundingRect(element)
            const contentRect = engine.getBoundingContentRect(element)

            const {
                x,
                y
            } = getElementTransformedPosition(paramsMap[adjDirection].origin, contentRect, elementAngleInRad)
            const transformOrigin = getTransformOriginTweenParams(compRect, contentRect, paramsMap[adjDirection].origin)
            const from = {
                rotationX: paramsMap[adjDirection].angleX,
                rotationY: paramsMap[adjDirection].angleY
            }
            // the tween
            sequence.add([
                factory.animate('BasePosition', element, 0, delay, {
                    transformOrigin,
                    x,
                    y,
                    immediateRender: false
                }),
                factory.animate('BaseRotate3D', element, duration, delay, {
                    from,
                    perspective: 800,
                    ease: 'Quad.easeOut',
                    immediateRender: false
                })
            ], 'animation-start')
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