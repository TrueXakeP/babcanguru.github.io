'use strict'

function isEmptyCSSValue(value) {
    return value === '0' || value === 'none' || value === '0px' || value === ''
}

module.exports = (...values) => values.every(value => isEmptyCSSValue(value))