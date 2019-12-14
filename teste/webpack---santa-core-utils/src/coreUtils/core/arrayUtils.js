'use strict'

const _ = require('lodash')

/**
 * Inspired by https://www.youtube.com/watch?v=rmV-iVwvqwU
 * @param stringsArray
 * @returns {object<string, bool>}
 */
function toTrueObj(stringsArray) {
    return _.transform(stringsArray, function(acc, str) {
        acc[str] = true
    }, {})
}

module.exports = {
    toTrueObj
}