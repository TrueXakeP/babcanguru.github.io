'use strict'

const MAX_CLONE_ITER = 5000000
const _ = require('lodash')

function resolvePath(source, path) {
    let ret = source
    for (let i = 0; i < path.length; i++) {
        const prop = path[i]
        if (_.has(ret, prop)) {
            ret = ret[prop]
        } else {
            return null
        }
    }
    return ret
}

function ensurePath(source, path) {
    let ret = source
    for (let i = 0; i < path.length; i++) {
        const prop = path[i]
        if (!_.has(ret, prop)) {
            ret[prop] = {}
        }
        ret = ret[prop]
    }
}

function setInPath(source, path, value) {
    const scope = resolvePath(source, _.initial(path))
    if (scope !== null) {
        scope[_.last(path)] = value
    }
}

function filter(source, predicate, canEnterSubtreePredicate) {
    canEnterSubtreePredicate = canEnterSubtreePredicate || (() => true)
    const ret = []

    function findInner(obj) {
        if (_.isNil(obj)) {
            return
        }

        if (predicate(obj)) {
            ret.push(obj)
        }

        if (!canEnterSubtreePredicate(obj)) {
            return
        }

        if (_.isPlainObject(obj) || _.isArray(obj)) {
            _.forEach(obj, function(value) {
                findInner(value)
            })
        }
    }

    findInner(source)
    return ret
}

function findPath(obj, predicate, path) {
    path = path || []

    if (predicate(obj)) {
        return path
    }

    let found = null
    if (_.isPlainObject(obj) || _.isArray(obj)) {
        _.forEach(obj, function(val, key) {
            found = findPath(obj[key], predicate, path.concat(key))
            if (found) {
                return false
            }
        })
    }

    return found
}

//copied lodash implementation
function cloneDate(date) {
    return new Date(+date)
}

function cloneObject(object) {
    return _.isArray(object) ? [] : Object.create(Object.getPrototypeOf(object))
}

// Unlike _.cloneDeep, this has no protection against circular data structures
function cloneDeep(value, customizer) {
    const hasCustomizer = _.isFunction(customizer)
    if (hasCustomizer) {
        const customizerResult = customizer(value)
        if (!_.isUndefined(customizerResult)) {
            return customizerResult
        }
    }

    if (!value || typeof value !== 'object') {
        return value
    }

    if (_.isDate(value)) {
        return cloneDate(value)
    }

    const result = cloneObject(value)
    const stack = [result, value]
    let curr, count = 0
    while (curr = stack.pop()) { //eslint-disable-line no-cond-assign
        if (++count > MAX_CLONE_ITER) {
            throw new Error('cloneDeep too big')
        }

        const base = stack.pop()
        const keys = Object.keys(curr)
        for (let i = 0; i < keys.length; ++i) {
            const key = keys[i]
            const v = curr[key]

            if (hasCustomizer) {
                const customizerResult = customizer(v)
                if (!_.isUndefined(customizerResult)) {
                    base[key] = customizerResult
                    continue
                }
            }

            if (v && typeof v === 'object') {
                if (_.isDate(v)) {
                    base[key] = cloneDate(v)
                } else {
                    const newObj = cloneObject(v)
                    base[key] = newObj
                    stack.push(newObj, v)
                }
            } else {
                base[key] = v
            }
        }
    }
    return result
}

function isDifferent(a, b) {
    return !_.isEqual(a || null, b || null)
}

/**
 * does not change the original objects
 * the function clones only if there might be a change that will change the object
 * @param {Object} object the object to clone and merge to
 * @param {Object} source the object to compare to and merge into object
 * @param {function(String|Number|Boolean, String|Number|Boolean, String) -> boolean} shouldTakeSourceValue
 * gets the value of object at key, the value of source at key and the key.
 * the function is called only on primitive fields, should return true if you want to take the source value
 * @returns {Object}
 */
function cloneAndConditionalMergeOfFields(object, source, shouldTakeSourceValue) {
    if (!_.isObject(object)) {
        return object
    }
    const result = _.clone(object)


    _.forOwn(source, function(val, key) {
        if (typeof val !== 'object' && shouldTakeSourceValue(object[key], source[key], key)) {
            result[key] = source[key]
            return
        }
        if (!object[key]) {
            return
        }

        if (_.isPlainObject(val)) {
            result[key] = cloneAndConditionalMergeOfFields(object[key], val, shouldTakeSourceValue)
        } else if (_.isArray(val)) {
            result[key] = _.compact(_.map(val, function(item, index) {
                if (!object[key][index]) {
                    return undefined
                }
                return cloneAndConditionalMergeOfFields(object[key][index], item, shouldTakeSourceValue)
            }))
            _.defaults(result[key], object[key])
        }
    })
    return result
}

function isObject(value) {
    return _.isObject(value) && !_.isArray(value)
}

/**
 * This function checks whether all values in a partial object are equal to the corresponding values in another object.
 * @param {Object} object the main object to compare
 * @param {Object} partialObject the partial object to test against
 * @returns {boolean}
 */
function isSubset(object, partialObject) {
    if (!object) {
        return false
    }
    let queue = _.toPairs(partialObject)
    for (let i = 0; i < queue.length; i++) {
        const key = queue[i][0]
        const value = queue[i][1]
        const valueToCompare = _.get(object, key)
        if (isObject(valueToCompare) && isObject(value) && !_.isEmpty(value)) {
            const nestedObj = _.mapKeys(value, (v, k) => `${key}.${k}`)
            queue = _.concat(queue, _.toPairs(nestedObj)) // add nested object properties to the queue
        } else if (!_.isEqual(valueToCompare, value)) {
            return false
        }
    }
    return true
}

module.exports = {
    resolvePath,
    ensurePath,
    setInPath,
    filter,
    findPath,
    cloneDeep,
    isDifferent,
    isSubset,
    cloneAndConditionalMergeOfFields
}