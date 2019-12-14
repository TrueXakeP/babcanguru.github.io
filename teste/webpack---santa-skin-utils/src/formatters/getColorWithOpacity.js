'use strict'

const rgbaRegexp = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/

module.exports = (color, opacity) => {
    if (!color) {
        return color
    }

    const parts = color.match(rgbaRegexp)

    if (parts === null) {
        return color
    }

    const r = parts[1]
    const g = parts[2]
    const b = parts[3]

    if (
        typeof r === 'undefined' ||
        typeof g === 'undefined' ||
        typeof b === 'undefined'
    ) {
        return color
    }

    return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${opacity})`
}