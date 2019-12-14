'use strict'

const _ = require('lodash')

function map(value, x1, x2, y1, y2) {
    return (value - x1) * ((y2 - y1) / (x2 - x1)) + y1
}

function parseDegrees(x) {
    if (typeof x !== 'number') {
        return NaN
    }
    return (x % 360 + 360) % 360
}

function interpolateSegmentsFunction(couples) {
    const xys = _.unzip(couples)
    const xs = xys[0]
    const ys = xys[1]

    return function(val) {
        let seg = 0

        while (seg < xs.length - 2 && val > xs[seg + 1]) {
            seg++
        }

        const res = map(val, xs[seg], xs[seg + 1], ys[seg], ys[seg + 1])
        return res
    }
}

module.exports = {
    map,
    parseDegrees,
    interpolateSegmentsFunction
}