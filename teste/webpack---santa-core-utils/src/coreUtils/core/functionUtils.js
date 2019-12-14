'use strict'

const _ = require('lodash')

function runMultiple(callbacks) {
    return function() {
        const args = arguments
        _.forEach(callbacks, callback => {
            callback.apply(this, args)
        })
    }
}

module.exports = {
    runMultiple
}