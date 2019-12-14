'use strict'
module.exports = (key, val) => {
    if (typeof val === 'symbol') {
        return val.toString()
    }
    if (Number.isNaN(val)) {
        return 'NaN'
    }
    switch (val) {
        case undefined:
            return 'undefined'
        case null:
            return 'null'
        case Infinity:
            return 'Infinity'
        case -Infinity:
            return '-Infinity'
        default:
            return val
    }
}