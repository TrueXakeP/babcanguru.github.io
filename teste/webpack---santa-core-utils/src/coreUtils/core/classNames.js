'use strict'
const _ = require('lodash')

module.exports = function(classNames) {
    return _.keys(_.pickBy(classNames, _.identity)).join(' ')
}