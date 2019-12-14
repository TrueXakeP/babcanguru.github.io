'use strict'

const parseCSSFont = require('parse-css-font')

const VALUE_UNITS_REG = /^(\d+)(.+)/

module.exports = (font, min, max) => {
    /**
     * It is not possible to use cssUtils.parseFontSts because
     * it work incorrect if font family with quotes
     */
    let fontObj
    try {
        fontObj = parseCSSFont(font)
    } catch (e) {
        return font
    }

    const parts = fontObj.size.match(VALUE_UNITS_REG)

    if (parts === null) {
        return font
    }

    let size = parseInt(parts[1], 10)
    const units = parts[2]

    if (size < min) {
        size = min
    }

    if (size > max) {
        size = max
    }

    return `${fontObj.style} ${fontObj.variant} ${
        fontObj.weight
    } ${size}${units}/${fontObj.lineHeight} ${fontObj.family.join(', ')}`
}