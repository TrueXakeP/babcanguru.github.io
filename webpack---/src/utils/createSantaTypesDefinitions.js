'use strict'

const _ = require('lodash')

function clonePropType(propType) {
    const newPropType = propType.bind(null)
    newPropType.isRequired = propType.isRequired.bind(null)
    return newPropType
}

function createSantaTypesDefinitions(namespace, prefix) {
    return _.reduce(namespace, (acc, val, key) => {
        const path = prefix ? `${prefix}.${key}` : key
        switch (typeof val) {
            case 'function':
                val = clonePropType(val)
                val.id = path
                val.isRequired.id = path
                return _.set(acc, key, val)
            case 'object':
                return _.set(acc, key, createSantaTypesDefinitions(val, path))
            default:
                throw new Error(`wtf:${key}`)
        }
    }, {})
}

module.exports = createSantaTypesDefinitions