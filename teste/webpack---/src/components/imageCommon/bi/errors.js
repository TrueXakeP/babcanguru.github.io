'use strict'

const _ = require('lodash')
const errors = require('./errors.json')

/**
 * Please ctrl/cmd + click on biError to see the schema :)
 * @type {Object.<String, biError>}
 */

_.forEach(errors, function(error, key) {
    error.errorName = key
    error.packageName = 'components'
})

module.exports = errors