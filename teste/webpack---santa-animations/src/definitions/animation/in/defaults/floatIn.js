'use strict'
const {
    getElementsAsArray
} = require('../../../../utils/definitionsUtils')

const name = 'FloatIn'
const properties = {
    hideOnStart: true,
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
        distance: '60'
    },
    right: {
        dx: '1',
        dy: '0',
        distance: '120'
    },
    bottom: {
        dx: '0',
        dy: '1',
        distance: '60'
    },
    left: {
        dx: '-1',
        dy: '0',
        distance: '120'
    }
}

function register({
    engine,
    factory
}, frame) {
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
        const browserRect = {
            width: frame.innerWidth,
            height: frame.innerHeight
        }

        const sequence = factory.sequence(params)
        sequence.add(factory.animate('BaseFade', elements, duration, delay, {
            from: {
                opacity: 0
            },
            to: {
                opacity: 1
            },
            ease: 'Cubic.easeIn'
        }))

        elements.forEach(element => {
            const compRect = engine.getBoundingRect(element)
            let transformX
            const transformY = fromParams.dy * fromParams.distance

            if (fromParams.dx > 0) {
                transformX = fromParams.dx * Math.max(0, Math.min(browserRect.width - compRect.right, fromParams.distance))
            } else {
                transformX = fromParams.dx * Math.max(0, Math.min(compRect.left, fromParams.distance))
            }

            sequence.add(factory.animate('BasePosition', element, duration, delay, {
                from: {
                    x: transformX,
                    y: transformY
                },
                ease: 'Sine.easeOut'
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