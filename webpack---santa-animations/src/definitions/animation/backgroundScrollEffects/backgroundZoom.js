'use strict'
const {
    getElementsAsArray
} = require('../../../utils/definitionsUtils')

const balataConsts = require('./balataConsts')

const name = 'BackgroundZoom'
const properties = {
    hideOnStart: false,
    shouldDisableSmoothScrolling: true,
    getMaxTravel(elementMeasure, viewportHeight) {
        return viewportHeight + elementMeasure.height
    },
    groups: ['animation', 'background'],
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
        }
    }
}

function register({
    factory
}) {
    /**
     * Move balata media elements vertically and zoom(from y:0)
     * @param {Array<HTMLElement>|HTMLElement} elements DOM elements to animate
     * @param {Number} [duration]
     * @param {Number} [delay]
     * @param {Object} [params] Timeline optional parameters (Tween values cannot be changed here, use BaseFade).
     * @param {Number} [params.speedFactor] the speed of the animation relative to the scroll
     * @returns {TimelineMax}
     */
    function animation(elements, duration, delay, params = {}) {
        elements = getElementsAsArray(elements)
        const sequence = factory.sequence(params)

        elements.forEach(element => {
            const childrenToZoom = balataConsts.ZOOM_SELECTORS.map(selector => element.querySelector(selector))
            sequence.add([
                factory.animate('BasePosition', element, 0, delay, {
                    perspective: 100,
                    force3D: true,
                    immediateRender: true
                }),
                factory.animate('BasePosition', childrenToZoom, duration, delay, {
                    force3D: true,
                    from: {
                        z: 0
                    },
                    to: {
                        z: 40
                    },
                    ease: 'Sine.easeIn',
                    immediateRender: true
                })
            ])
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