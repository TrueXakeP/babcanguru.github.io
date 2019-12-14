'use strict'
const _ = require('lodash')
const cssProperties = [
    'min-height',
    'background-color',
    'margin-top',
    'box-flex',
    'padding-bottom',
    'min-width',
    'max-width'
]
const invalidKeyMap = _.reduce(cssProperties, (acc, value) => {
    acc[value] = _.camelCase(value)
    return acc
}, {})

module.exports = styleObject => _.mapKeys(styleObject, (value, key) => _.defaultTo(invalidKeyMap[key], key))