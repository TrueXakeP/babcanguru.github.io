'use strict'

const math = require('./math')

const scrollDurationByDistance = {
    desktop: math.interpolateSegmentsFunction([
        [0, 0.6],
        [360, 0.8],
        [720, 1],
        [1440, 1.2],
        [7200, 2.8],
        [9600, 3],
        [10000, 3]
    ]),
    mobile: math.interpolateSegmentsFunction([
        [0, 0.5],
        [360, 0.7],
        [720, 0.9],
        [1440, 1.1],
        [7200, 2.7],
        [9600, 2.9],
        [10000, 2.9]
    ])
}

function calcScrollDuration(currentY, targetY, isMobile) {
    const delta = Math.abs(targetY - currentY)
    return scrollDurationByDistance[isMobile ? 'mobile' : 'desktop'](delta)
}

module.exports = {
    calcScrollDuration
}