'use strict'
const {
    getClipParams,
    getElementsAsArray
} = require('../../utils/definitionsUtils')

const name = 'BaseClipPath'
const properties = {}

function register({
    engine,
    factory
}) {
    /**
     * ClipPath Polygon base animation object, expect all passed elements to be of the same size
     * If no 'to' or 'from' defined each will default to a rectangle the size of the element content
     * @param {Array<HTMLElement>|HTMLElement} elements DOM elements
     * @param {Number} [duration=1.0]
     * @param {Number} [delay=0]
     * @param {Object} params
     * @param {Object} to
     * @param {Object} from
     * @param {String} [params.from.clipPath]
     * @param {String} [params.to.clipPath]
     * @returns {TimelineMax}
     */
    function animation(elements, duration = 0, delay = 0, {
        to = {},
        from = {},
        ...params
    } = {}) { // eslint-disable-line complexity
        elements = getElementsAsArray(elements)
        const sequence = factory.sequence()

        elements.forEach(element => {
            const compRect = engine.getBoundingRect(element)
            const contentRect = engine.getBoundingContentRect(element)
            const initialClipPath = getClipParams(compRect, contentRect, 'initial')

            sequence.add(engine.tween(element, {
                duration,
                delay,
                to: {
                    ...initialClipPath,
                    ...to
                },
                from: {
                    ...initialClipPath,
                    ...from
                },
                ...params
            }, ['clipPath', 'webkitClipPath']), 0)
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