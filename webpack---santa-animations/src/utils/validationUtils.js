'use strict'

/**
 * Validate if a value is a real number
 * From https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
 * With one change - not supporting numeric strings
 * @param {*} n
 * @returns {boolean}
 */
function isNumber(n) {
    return !Number.isNaN(n) && Number.isFinite(n)
}

/**
 * Validate if a string value is of the form '123.456' / '-123.456' / '+=123.456' / '-=123.456'
 * @param {*} n
 * @returns {boolean}
 */
function isRelativeNumber(n) {
    return typeof n === 'string' && /^(-|[+-]=)?\d*\.?\d+$/.test(n)
}

/**
 * Validate if a value is a number, a number string or a relative number (+=/-=)
 * @param {*} n
 * @returns {boolean}
 */
function isNumberLike(n) {
    return isNumber(+n) || isRelativeNumber(n)
}

/**
 * Validate if a value is a real object
 * Based on https://stackoverflow.com/a/14706877, Added check for isArray()
 * @param {*} obj
 * @returns {boolean}
 */
function isObject(obj) {
    const type = typeof obj
    return type === 'function' || type === 'object' && !Array.isArray(obj) && !!obj
}

const validateTypes = {
    string(key, validator, param) {
        return typeof param === 'string' && (!validator.enum || validator.enum.includes(param))
    },

    number(key, validator, param) {
        if (!isNumber(param)) {
            return false
        }
        const {
            min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER
        } = validator
        return param >= min && param <= max && (!validator.enum || validator.enum.includes(param))
    },

    integer(key, validator, param) {
        const isFloat = validateTypes.number(key, validator, param)
        return isFloat && parseInt(param, 10) === param
    },

    numberLike(key, validator, param) {
        return isNumberLike(param)
    },

    boolean(key, validator, param) {
        return typeof param === 'boolean'
    },

    object(key, validator, param) {
        if (isObject(param)) {
            if (isObject(validator.properties)) {
                return validateSchema(validator.properties, param)
            }
            return true
        }
        return false
    },

    array(key, validator, param) {
        return Array.isArray(param)
    }
}

/**
 * Validate animation properties by schema
 * The schema structure is loosely based on JSON Schema
 * TODO: document schema types and structure
 * TODO: document validation errors
 * @param {object} schema
 * @param {object} params
 * @param {function(array)} [logger]
 * @returns {boolean}
 */
function validateSchema(schema, params, logger) {
    const errors = Object
        .entries(schema)
        .map(([key, validator]) => {
            const value = params[key]
            const validateType = validateTypes[validator.type]
            const isValid = typeof value !== 'undefined' && validateType ? validateType(key, validator, value) : true
            return !isValid && {
                key,
                value: JSON.stringify(value),
                expected: validator
            }
        })
        .filter(value => value)
    if (logger) {
        logger(errors)
    }
    return !errors.length
}

module.exports = {
    validateSchema
}