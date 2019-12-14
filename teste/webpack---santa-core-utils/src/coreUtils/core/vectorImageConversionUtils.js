'use strict'

const _ = require('lodash')

const vectorImageDefaults = {
    comp: 'wysiwyg.viewer.components.VectorImage',
    skin: 'skins.viewer.VectorImageSkin',
    propertyType: 'VectorImageProperties',
    dataType: 'VectorImage',
    style: {
        'fillcolor': '#242323',
        'stroke-width': 1,
        'alpha-fillcolor': 1,
        'stroke': '#5E97FF',
        'alpha-stroke': 1,
        'enablestroke': false
    }
}

const skinStyleKeysMap = {
    'alpha-fillcolor': 'opacity',
    'alpha-stroke': 'strokeOpacity',
    'enablestroke': 'enableStroke',
    'fillcolor': 'color1',
    'stroke': 'stroke',
    'strokewidth': 'strokeWidth',
    'opacity': 'opacity'
}

const legacyFallbackSkinName = 'skins.viewer.svgshape.SvgShapeDefaultSkin'
const fallbackSvgId = '08e9266742a9484b90115d29bbfa9360.svg'

/**
 * Convert old format of svg "skinName" back to public media uri
 * @param svgId
 * @returns {string}
 */
function skinNameToUri(svgId) {
    const partsArr = svgId.replace(/^.*\//, '').split('.')
    const version = partsArr[1] === 'v1' ? 1 : 2
    const svgHash = partsArr[2].replace(/svg_/i, '')
    const svgName = partsArr[3]
    return `${svgHash + (version === 1 ? `_svgshape.v1.${svgName}` : '')}.svg`
}

/**
 * Set the right primitive type to svg style values
 * @param value
 * @param key
 * @returns {*}
 */
function normalizeValue(value, key) {
    switch (key) {
        case 'strokewidth':
            return parseInt(value, 10)
        case 'alpha-fillcolor':
        case 'alpha-stroke':
        case 'opacity':
            return parseFloat(value)
        case 'enablestroke':
            return _.isString(value) ? value !== 'false' : value
        default:
            return value
    }
}

/**
 * Convert svg style values to data "shapeStyle" values
 * @param design
 * @param style
 * @param compDef
 */
function convertStyleToDesignData(design, style, compDef) {
    const styleProps = _.get(style, ['style', 'properties'])
    if (_.isEmpty(styleProps)) {
        return
    }

    const shapeStyle = _.reduce(styleProps, function(res, value, key) {
        res[skinStyleKeysMap[key]] = normalizeValue(value, key)
        return res
    }, {})

    // If compDef passed, it means we convert an old SvgShape component to new VectorArt
    // This happens only in addComponentHook, so we are safe to assume the styleId is unique.
    if (compDef) {
        // Set comp and skin names
        style.componentClassName = compDef.comp
        style.skin = compDef.skin
        // empty style
        style.style.properties = {}
        style.style.propertiesSource = {}
    }
    if (shapeStyle.color1) {
        design.overrideColors = _.pick(shapeStyle, 'color1')
    }
    design.shapeStyle = _.omit(shapeStyle, 'color1')
    design.type = 'VectorImageDesignData'
}

function convertStructure(component, compDef) {
    component.componentType = compDef.comp
    component.skin = compDef.skin
}

/**
 * Convert svgShape style to a style readable by VectorShapeSantaTypes
 * NOTE: this is a temp stage since we can't "data fix" styles into data, they live on different pages
 * @param style
 * @param compDef
 */
function convertStyle(style, compDef) {
    const properties = _.get(style, ['style', 'properties'])
    const strokeWidth = parseInt(_.get(properties, 'strokewidth', 0), 10)
    const propertiesSources = _.get(style, ['style', 'propertiesSource'])

    // Set comp and skin names
    style.componentClassName = compDef.comp
    style.skin = compDef.skin

    if (!_.isEmpty(properties)) {
        // transform no stroke or strokewidth:0 to enablestroke:false
        properties.enablestroke = properties.enablestroke || !!strokeWidth

        //set the stroke width, since we added "enablestroke", minimum stroke width is 1
        properties.strokewidth = Math.max(1, strokeWidth)

        // Assign new sources values
        _.forEach(properties, function(value, property) {
            propertiesSources[property] = /^(color|font)_\d+$/.test(value) ? 'theme' : 'value'
        })
    }
}

/**
 * Set svgId to data
 * @param compData
 * @param compDef
 * @param skinName
 */
function convertData(compData, compDef, skinName) {
    if (compData.type === 'RepeatedData') {
        convertData(compData.original, compDef, skinName)
        _.forEach(compData.overrides, override => convertData(override, compDef, skinName))
        return
    }
    if (compData.type !== compDef.dataType) {
        compData.type = compDef.dataType
        compData.svgId = skinName === legacyFallbackSkinName ? fallbackSvgId : skinNameToUri(skinName)
    }
}

/**
 * Convert maintainAspectRatio to displayMode
 * @param compProps
 * @param compDef
 */
function convertProperties(compProps, compDef) {
    if (compProps.type !== compDef.propertyType) {
        compProps.type = compDef.propertyType
        compProps.displayMode = compProps.maintainAspectRatio ? 'legacyFit' : 'stretch'
        _.unset(compProps, 'maintainAspectRatio')
    }
}

module.exports = {
    convertStyle,
    convertStyleToDesignData,
    convertProperties,
    convertData,
    convertStructure,
    vectorImageDefaults,
    skinNameToUri
}