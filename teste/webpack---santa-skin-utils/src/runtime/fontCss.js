'use strict'

const _ = require('lodash')
const coreUtils = require('santa-core-utils')
const fontUtils = coreUtils.fonts

function getFullFontFamily(fontFamily) {
    let fullFontFamily = fontFamily
    const fallback = fontUtils.getFontFallback(fontFamily)
    if (fallback) {
        fullFontFamily = `${fullFontFamily},${fallback}`
    }

    //surround fonts with quotes if font name contains spaces or non-latin chars
    fullFontFamily = fullFontFamily.replace(/[^,]*[^\w,\d\-][^,]*/g, fontFamilyStr => `'${fontFamilyStr.replace(/\+/g, ' ')}'`)
    return fullFontFamily
}

function getFontCSSFromFontString(fontVal) {
    let font = fontVal
    if (_.includes(font, '#')) {
        font = font.slice(0, font.indexOf('#'))
    }
    font = font.replace(/\{color_\d+\}/, '')
    const fontFamily = fontUtils.getFontFamily(font)
    const fullFontFamily = getFullFontFamily(fontFamily)
    const childFont = font.replace(fontFamily, fullFontFamily)
    return `${childFont};`
}

/**
 *
 * @param fontString
 * @param {{color: string[], font: []}} themeData
 * @returns {*}
 */
function getFontVal(fontString, themeData) {
    if (_.startsWith(fontString, 'font_')) {
        const fontParts = fontString.split('font_')
        if (fontParts.length === 2) {
            return themeData.font[fontParts[1]]
        }
    }
    return fontString
}

/**
 *
 * @param fontString
 * @param themeData
 * @returns {*}
 */
function fontToCSSWithoutColor(fontString, themeData) {
    const fontVal = getFontVal(fontString, themeData)
    return getFontCSSFromFontString(fontVal)
}

module.exports = {
    fontToCSSWithoutColor,
    getFullFontFamily
}