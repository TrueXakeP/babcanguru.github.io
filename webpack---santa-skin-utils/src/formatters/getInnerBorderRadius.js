'use strict'
/**
 * Based on https://www.w3.org/TR/css-backgrounds-3/#corners
 * "The padding edge (inner border) radius is the outer border radius minus the corresponding border thickness."
 */
module.exports = (borderRadius, borderWidth) => {
    const numericWidth = +borderWidth.replace('px', '')
    if (isNaN(numericWidth)) {
        return borderRadius
    }

    function getInner(value) {
        const numeric = value - numericWidth
        return numeric > 0 ? numeric : 0
    }
    const innerRadiusParts = []
    for (const part of borderRadius.split(' ')) {
        const value = +part.replace('px', '')
        if (isNaN(value)) {
            return borderRadius
        }
        innerRadiusParts.push(`${getInner(value)}px`)
    }
    return innerRadiusParts.join(' ')
}