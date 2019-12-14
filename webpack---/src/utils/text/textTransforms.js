// define(['lodash', 'coreUtils', 'color'], function (_, coreUtils, Color) {
'use strict'

const _ = require('lodash')
const coreUtils = require('santa-core-utils')
const Color = require('color')
const cssUtils = coreUtils.cssUtils
const fragment = coreUtils.fragment

function getBrightenedColor(color, brightness) {
    // if the color is pure black, light it a bit, so it changes in brightness could be seen
    // this is a legacy behavior we don't want to change
    const newColor = color.hexString() !== '#000000' ?
        color.clone() :
        new Color('#121212')


    newColor.lightness(newColor.hslArray()[2] * (brightness || 1.0))
    return newColor
}

function getFontSize(str) {
    const fontSize = parseFloat(str)
    if (!isNaN(fontSize)) {
        return fontSize
    }
}

function getFontName(fontFamily) {
    if (!fontFamily) {
        return
    }
    return _.head(fontFamily.split(','))
}

function getColor(colorData) {
    if (!colorData) {
        return
    }
    return new Color(cssUtils.normalizeColorStr(colorData))
}

function setElementStyle(element, key, value) {
    const previousStyle = element.getAttribute('style') || ''
    const style = `${previousStyle.replace(new RegExp(`(?:(^|;)\\s*)${key}\\s*:\\s*(?:.*?)\\s*(?:;|$)`), '$1') +
        (previousStyle !== '' && previousStyle[previousStyle.length - 1] !== ';' ? ';' : '') +
        key}:${value}`
    element.setAttribute('style', style)
}

function correctFontSize(element, transformData, options) {
    if (!transformData.fontSize) {
        return
    }

    if (transformData.fontSize % 1 !== 0) {
        // This is a reproduction of a bug in the legacy textTransform algorithm
        // In some rare cases when the user would have font-size with a floating point value the legacy algorithm failed to recognize it.
        // The floating point font-size was then left untouched.
        // Fixing this bug now may have noticeable effect on these sites.
        return
    }

    if (!element.style.fontSize && !tryGetFontData(element, options)) {
        // To keep in sync with the legacy textTransform algorithm
        // Font-size should only be applied to elements that already had font size style or class definitions
        return
    }

    const scale = parseFloat(options.scale)
    const mobileFriendlyFontSize = Math.round(coreUtils.mobileUtils.convertFontSizeToMobile(transformData.fontSize, scale))
    setElementStyle(element, 'font-size', `${mobileFriendlyFontSize}px`)
}

function performTextStyleMigrationAdjustments(element, transformdata, options) {
    wrapLinkOrFixParentColorIfNeeded(element)

    if (isListElement(element)) {
        return
    }

    const themeData = tryGetFontData(element, options)

    if (themeData) {
        if (!_.includes(element.getAttribute('style'), 'line-height')) {
            setElementStyle(element, 'line-height', themeData.lineHeight)
        }
    }
}

function isListElement(el) {
    return el && _.includes(['ol', 'ul'], el.tagName.toLowerCase())
}

function wrapLinkOrFixParentColorIfNeeded(element) {
    if (element.tagName.toLowerCase() !== 'a') {
        return
    }

    const firstColorAncestor = getFirstColorSpanAncestorOfSingleDescendant(element)

    if (firstColorAncestor) {
        replaceElementColor(firstColorAncestor, '#0000FF')
    } else {
        const wrapper = element.ownerDocument.createElement('span')
        wrapper.style.color = '#0000FF'

        wrapElement(element, wrapper)
    }
}

function replaceElementColor(element, color) {
    element.style.color = color

    element.className = element.className.replace(/\bcolor_\d+\b/, '')
    if (_.isEmpty(element.className)) {
        element.removeAttribute('class')
    }
}

function isColorSpan(element) {
    return !_.isEmpty(element.style.color) || element.className.match(/\bcolor_\d+\b/)
}

function getFirstColorSpanAncestorOfSingleDescendant(element) {
    const parent = element.parentElement

    if (parent &&
        parent.tagName.toLowerCase() === 'span' &&
        parent.childNodes.length === 1) {
        if (isColorSpan(parent)) {
            return parent
        }

        return getFirstColorSpanAncestorOfSingleDescendant(parent)
    }

    return null
}

function findElementPositionInParent(element) {
    const parent = element.parentNode

    for (let i = 0; i < parent.childNodes.length; i++) {
        if (parent.childNodes[i] === element) {
            return i
        }
    }
}

function wrapElement(element, wrapper) {
    const parent = element.parentNode

    const position = findElementPositionInParent(element)

    wrapper.appendChild(element)
    parent.insertBefore(wrapper, parent.childNodes[position])
}

function correctBrightness(element, transformData, options) {
    if (!transformData.color) {
        return
    }

    const fontData = tryGetFontData(element, options)
    if (!element.style.color && !tryGetColorData(element, fontData, options)) {
        // To keep in sync with the legacy textTransform algorithm
        // Color should only be applied to elements that already had color style or class definitions
        return
    }

    const brightness = parseFloat(options.brightness)
    const mobileAdjustedColor = getBrightenedColor(transformData.color, brightness)
    setElementStyle(element, 'color', mobileAdjustedColor.rgbaString())
}

function isFontDataContainsColor(fontData) {
    return !!(fontData && fontData.color)
}

function correctColor(element, transformData, options) {
    const fontData = tryGetFontData(element, options)
    if (element.style.color || tryGetColorData(element, fontData, options) || isFontDataContainsColor(fontData)) {
        const overrideColor = options.overrideColor.replace(/(^\d+,\d+,\d+,\d+$)/, 'rgba($1)')
        setElementStyle(element, 'color', overrideColor)
    }
}

function tryGetFontData(element, options) {
    const execResult = /(?:\s|^)(font_\d+)(?:\s|$)/g.exec(element.className)
    if (!execResult) {
        return
    }

    const font = options.fontGetter && options.fontGetter(execResult[1])
    if (font) {
        return cssUtils.parseFontStr(font)
    }
}

function tryGetColorClassFromElement(element) {
    const execResult = /(?:\s|^)(color_\d+)(?:\s|$)/g.exec(element.className)
    if (execResult) {
        return execResult[1]
    }
}

function tryGetColorClassFromFontData(fontData) {
    const execResult = /^{(color_\d+)}$/.exec(_.get(fontData, 'color'))
    if (execResult) {
        return execResult[1]
    }
}

function tryGetColorData(element, fontData, options) {
    const colorClass = tryGetColorClassFromElement(element) || tryGetColorClassFromFontData(fontData)
    if (!colorClass) {
        return
    }

    const colorData = options.colorGetter && options.colorGetter(colorClass)
    if (colorData) {
        return colorData
    }
}

function getClassDefinitions(element, options) {
    const fontData = tryGetFontData(element, options)
    const colorData = tryGetColorData(element, fontData, options)
    return {
        fontSize: getFontSize(_.get(fontData, 'size')),
        fontName: getFontName(_.get(fontData, 'family')),
        color: getColor(colorData)
    }
}

function getElementStyleDefinitions(element) {
    const style = _(element.style)
        .pick(['fontSize', 'fontFamily', 'color'])
        .omitBy(_.isEmpty)
        .value()

    return {
        fontSize: getFontSize(style.fontSize),
        fontName: getFontName(style.fontFamily),
        color: getColor(style.color)
    }
}

function applyOverDomElement(element, inheritedData, actions, options) {
    const transformData = _.defaults(
        getElementStyleDefinitions(element),
        getClassDefinitions(element, options),
        inheritedData
    )

    _.forEach(element.children, function(child) {
        applyOverDomElement(child, transformData, actions, options)
    })

    _.invokeMap(actions, 'call', null, element, transformData)
}

function applyOverDomContainer(container, actions, options) {
    const transformData = {
        characterCount: container.textContent.length
    }

    applyOverDomElement(container, transformData, actions, options)
}

function buildActionsList(options) {
    const actions = []
    if (options.overrideColor) {
        actions.push(_.partial(correctColor, _, _, options))
    } else if (options.brightness && parseFloat(options.brightness) !== 1) {
        actions.push(_.partial(correctBrightness, _, _, options))
    }
    if (options.scale) {
        actions.push(_.partial(correctFontSize, _, _, options))
    }

    if (options.fixMigratedStyle) {
        actions.push(_.partial(performTextStyleMigrationAdjustments, _, _, options))
    }

    return actions
}

function createDocumentFragment() {
    const docfrag = fragment.document.createDocumentFragment()
    return docfrag.appendChild(fragment.document.createElement('div'))
}

function applyTransformsOnElements(htmlText, options) {
    const actions = buildActionsList(options)
    if (actions.length === 0) {
        return htmlText
    }

    const container = createDocumentFragment()
    container.innerHTML = htmlText
    _.forEach(container.children, _.partial(applyOverDomContainer, _, actions, options))

    return container.innerHTML
}

module.exports = {
    applyMobileAdjustments: applyTransformsOnElements,
    applyTextStyleMigrationAdjustments(htmlText, fontGetter) {
        const options = {
            fontGetter,
            fixMigratedStyle: true
        }

        return applyTransformsOnElements(htmlText, options)
    }
}
// });