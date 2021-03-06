'use strict'
const {
    getElementsAsArray
} = require('../../../../utils/definitionsUtils')

const name = 'FloatIn'
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
        direction: {
            type: 'string',
            enum: ['top', 'right', 'bottom', 'left'],
            default: 'right'
        }
    }
}

const paramsMap = {
    top: {
        dx: '0',
        dy: '-1',
        distance: '50'
    },
    right: {
        dx: '1',
        dy: '0',
        distance: '50'
    },
    bottom: {
        dx: '0',
        dy: '1',
        distance: '50'
    },
    left: {
        dx: '-1',
        dy: '0',
        distance: '50'
    }
}

function register({
    factory
}) {
    /**
     * FloatIn animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM element to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params]
     * @param {'top'|'right'|'bottom'|'left'} [direction=right] 'top' or 'right' or 'bottom' or 'left'
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, {
        direction = properties.schema.direction.default,
        ...params
    } = {}) {
        elements = getElementsAsArray(elements)

        const fromParams = paramsMap[direction]

        const sequence = factory.sequence(params)
        sequence.add(factory.animate('BaseFade', elements, duration, delay, {
            from: {
                opacity: 0
            },
            to: {
                opacity: 1
            },
            ease: 'Cubic.easeInOut'
        }))

        elements.forEach(element => {
            const transformX = fromParams.dx * fromParams.distance
            const transformY = fromParams.dy * fromParams.distance

            sequence.add(factory.animate('BasePosition', element, duration, delay, {
                from: {
                    x: transformX,
                    y: transformY
                },
                ease: 'Quad.easeInOut'
            }), 0)
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