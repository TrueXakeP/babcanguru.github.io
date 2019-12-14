'use strict'

const toNumber = string => Number(string.replace('px', ''))

module.exports = (border, verticalPadding, horizontalPadding) => {
    const minPadding = Math.min(
        toNumber(verticalPadding),
        toNumber(horizontalPadding)
    )

    return toNumber(border) > minPadding ? `${minPadding}px` : border
}