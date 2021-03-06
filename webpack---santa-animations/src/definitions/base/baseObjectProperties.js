'use strict'
const {
    getElementsAsArray
} = require('../../utils/definitionsUtils')

const name = 'BaseObjectProps'
const properties = {}

function register({
    engine,
    factory
}) {
    /**
     * Bae Animation to mutate object properties
     * @param {Array<Object>|Object} objects
     * @param {Number} [duration=1.0]
     * @param {Number} [delay=0]
     * @param {Object} params
     * @returns {TweenMax}
     */
    function animation(objects, duration = 0, delay = 0, params = {}) {
        objects = getElementsAsArray(objects)
        const paramsSet = new Set(objects.reduce((acc, object) => acc.concat(Object.keys(object)), []))
        const allowedParams = Array.from(paramsSet)

        return engine.tween(objects, {
            duration,
            delay,
            ...params
        }, allowedParams)
    }

    factory.registerAnimation(name, animation, properties)
}

module.exports = {
    name,
    properties,
    register
}