var baseFor = require('./_baseFor'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;



//////////////////
// WEBPACK FOOTER
// ./~/lodash/_baseForOwn.js
// module id = 22
// module chunks = 0