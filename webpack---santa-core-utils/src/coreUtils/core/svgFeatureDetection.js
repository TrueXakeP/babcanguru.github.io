'use strict'

const _ = require('lodash')

const flags = {
    /**
     * checks if the browser supports vector-effect attribute
     * @type {boolean}
     */
    isVectorEffect: false
}

/**
 * Check once for browser support and store on global features support object
 */
function checkVectorEffectSupport(featureSupportObj) {
    featureSupportObj.isVectorEffect = 'vectorEffect' in window.document.documentElement.style
}

if (typeof window !== 'undefined') {
    checkVectorEffectSupport(flags)
}

function getFlags() {
    return _.clone(flags)
}

module.exports = {
    flags: getFlags
}