'use strict'
const {
    getAdjustedDirection,
    getElementsAsArray
} = require('../../../../utils/definitionsUtils')

const name = 'ArcIn'
const properties = {
    hideOnStart: true,
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
            enum: ['right', 'left'],
            default: 'left'
        }
    }
}

const paramsMap = {
    pseudoRight: {
        angleX: '180',
        angleY: '0',
        idx: 0
    },
    right: {
        angleX: '0',
        angleY: '180',
        idx: 1
    },
    pseudoLeft: {
        angleX: '-180',
        angleY: '0',
        idx: 2
    },
    left: {
        angleX: '0',
        angleY: '-180',
        idx: 3
    }
}

function getRotate3DParams(direction) {
    return {
        rotationX: paramsMap[direction].angleX,
        rotationY: paramsMap[direction].angleY
    }
}

function getTransformOriginParams(element) {
    return `50% 50% ${-1.50 * element.offsetWidth}`
}

function register({
    engine,
    factory
}) {
    /**
     * ArcIn from opacity 0 animation object
     * @param {HTMLCollection|Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params]
     * @param {'left'|'right'} [direction=left] right, left
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        direction = properties.schema.direction.default,
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)

        const sequence = factory.sequence(params)
        sequence.add(factory.animate('BaseFade', elements, duration, delay, {
            from: {
                opacity: 0
            },
            to: {
                opacity: 1
            },
            ease: 'Sine.easeInOut'
        }))

        elements.forEach(element => {
            const elementAngleInDeg = element.getAttribute('data-angle') || 0
            const adjDirection = getAdjustedDirection(paramsMap, direction, elementAngleInDeg)
            const rotate3DParams = getRotate3DParams(adjDirection)
            const transformOriginParams = getTransformOriginParams(element)

            sequence
                .add(engine.set(element, {
                    transformOrigin: transformOriginParams
                }), 0)
                .add(factory.animate('BaseRotate3D', element, duration, delay, {
                    from: rotate3DParams,
                    perspective: 200,
                    fallbackFor3D: false,
                    ease: 'Sine.easeInOut'
                }), 0)
        })

        return sequence.get()
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    properties,
    name,
    register
}