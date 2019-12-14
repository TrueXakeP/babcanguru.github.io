'use strict'

const _ = require('lodash')
const stringUtils = require('./stringUtils')

const CSS_UNITS = {
    pct: '%',
    px: 'px',
    vw: 'vw',
    vh: 'vh'
}

const rgbaRegexp = /^\d+,\d+,\d+,(\d+.?\d*)?/

function toCalcExp(measurements) {
    return `calc(${measurements.join(' + ')})`
}

function roundToNearestHalf(num) {
    return Math.round(num * 2) / 2
}

function getScreenUnitsAsPixels(screenUnits, screenDimension) {
    return roundToNearestHalf(screenUnits / 100 * screenDimension)
}

function getUnitsDataWithoutScreenUnits(unitsData, screenDimension) {
    const newUnitsData = _.clone(unitsData)

    if (_.isFinite(unitsData.vw)) {
        newUnitsData[CSS_UNITS.px] = (newUnitsData[CSS_UNITS.px] || 0) + getScreenUnitsAsPixels(unitsData.vw, screenDimension)
        delete newUnitsData[CSS_UNITS.vw]
    }

    if (_.isFinite(unitsData.vh)) {
        newUnitsData[CSS_UNITS.px] = (newUnitsData[CSS_UNITS.px] || 0) + getScreenUnitsAsPixels(unitsData.vh, screenDimension)
        delete newUnitsData[CSS_UNITS.vh]
    }

    return newUnitsData
}

/**
 * @param unitsData
 * @param screenSizeInRelevantAxis
 * @returns {*}
 */
function convertUnitsDataToCssStringValue(unitsData, screenSizeInRelevantAxis) {
    const unitsDataWithoutScreenUnits = getUnitsDataWithoutScreenUnits(unitsData, screenSizeInRelevantAxis)

    const measurements = _(unitsDataWithoutScreenUnits)
        .pick(_.keys(CSS_UNITS))
        .map((val, key) => val + CSS_UNITS[key])
        .value()
    return measurements.length > 1 ? toCalcExp(measurements) : measurements[0]
}

function concatenateStyleIdToClassName(styleId, className) {
    return `${styleId}_${className}`
}

function concatenateStyleIdToSkinPart(styleId, skinPartName) {
    return styleId + skinPartName
}

function concatenateStyleIdToClassList(styleId, classes) {
    return _(classes)
        .compact()
        .map(cls => concatenateStyleIdToClassName(styleId, cls))
        .join(' ')
}

function normalizeColorStr(colorStr) {
    return rgbaRegexp.test(colorStr) ? `rgba(${colorStr})` : colorStr
}

function createColorStyleText(colorVal, cssClassName, styleAttributeName) {
    let childColor = ''
    if (stringUtils.startsWith(colorVal, '#')) {
        childColor = `${styleAttributeName}: ${colorVal};`
    } else {
        childColor = `${styleAttributeName}: rgba(${colorVal});`
    }
    return `.${cssClassName} {${childColor}}`
}

function getColorsCssString(colorsArr) {
    return _.map(colorsArr, (color, colorIndex) => //eslint-disable-line prefer-template
            `${createColorStyleText(color, `color_${colorIndex}`, 'color')}\n${createColorStyleText(color, `backcolor_${colorIndex}`, 'background-color')}`)
        .join('\n') + '\n'
}

function elementHasClass(element, classname) {
    return _(element.className || '')
        .split(' ')
        .includes(classname)
}

function addClassToElement(element, classname) {
    if (!elementHasClass(classname)) {
        element.className = element.className ? `${element.className} ${classname}` : classname
    }
}

function removeClassFromElement(element, classname) {
    element.className = _(element.className)
        .split(' ')
        .without(classname)
        .join(' ')
}

function addStylesheetOfUrl(url) {
    const link = window.document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = url
    window.document.getElementsByTagName('head')[0].appendChild(link)
}

function parseFontStr(fontStr) {
    const split = fontStr.split(' ')
    const sizeSplit = split[3] ? split[3].split('/') : []
    return {
        style: split[0],
        variant: split[1],
        weight: split[2],
        size: sizeSplit[0],
        lineHeight: sizeSplit[1],
        family: split[4].replace(/\+/g, ' '),
        color: split[5],
        bold: split[2] === 'bold' || parseInt(split[2], 10) >= 700,
        italic: split[0] === 'italic'
    }
}

module.exports = {
    convertUnitsDataToCssStringValue,
    concatenateStyleIdToClassName,
    concatenateStyleIdToClassList,
    concatenateStyleIdToSkinPart,
    normalizeColorStr,
    elementHasClass,
    addClassToElement,
    removeClassFromElement,
    addStylesheetOfUrl,
    getColorsCssString,
    parseFontStr
}