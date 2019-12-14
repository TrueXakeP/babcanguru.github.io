'use strict'

const _ = require('lodash')
const params = require('./params')
const fontCss = require('./fontCss')
const functions = require('./functions')

function defaultToPixelUnits(propValue) {
    return isNaN(propValue) ? propValue : `${propValue}px`
}

const paramPropRendering = {
    BORDER_RADIUS: value => `border-radius:${value};`,
    BORDER_SIZES: value => `border-width:${value};`,
    BOX_SHADOW: value => `box-shadow:${value};`,
    FONT: value => `font:${value}`,
    FONT_FAMILY: value => `font-family:${value};`,
    TRANSITION: value => `transition:${value};`,
    INVERTED_ZOOM: value => `zoom:${value};`,
    INVERTED_ZOOM_FIXED: value => `zoom:${value};`,
    ORIENTATION_ZOOM_FIX: value => `zoom:${value};`,
    ZOOM_BY_SCREEN_PROPERTIES: value => `zoom:${value};`,
    DEFAULT: _.identity
}

const paramRendering = {
    BORDER_RADIUS: _.identity,
    BORDER_SIZES: _.identity,
    TRANSITION: _.identity,
    ALPHA: _.identity,
    BORDER_SIDES: _.constant(''),
    ICON_TYPE: _.constant(''),
    BOX_SHADOW: defaultToPixelUnits,
    SIZE: defaultToPixelUnits,
    FONT: (value, themeData) => fontCss.fontToCSSWithoutColor(value, themeData),
    FONT_FAMILY: value => fontCss.getFullFontFamily(value),
    COLOR: color => color.hexString(),
    BG_COLOR(color) {
        return color.alpha() > 0 ? color.rgbaString() : 'transparent'
    },
    COLOR_ALPHA(color) {
        return color.alpha() > 0 ? color.rgbaString() : 'transparent'
    },
    INVERTED_ZOOM: (_v, _t, env) => env.siteZoomRatio,
    INVERTED_ZOOM_FIXED: (_v, _t, env) => env.invertedZoomRatio,
    ORIENTATION_ZOOM_FIX: (_v, _t, env) => env.orientationZoomFix,
    ZOOM_BY_SCREEN_PROPERTIES: (_v, _t, env) => env.mobileZoom,
    URL: (value, _t, env) => {
        if (value === 'BASE_THEME_DIRECTORY') {
            return env.baseThemeUrl
        } else if (value === 'WEB_THEME_DIRECTORY') {
            return env.webThemeUrl
        }
        return value
    },
    DEFAULT: _.identity
}

/**
 * param types:
 * BG_COLOR
 * BORDER_RADIUS
 * BORDER_SIZES
 * BOX_SHADOW
 * FONT
 * SIZE
 * COLOR
 * COLOR_ALPHA
 * TRANSITION
 * URL
 * OTHER param type is not in use.
 *
 * @param paramValue
 * @param {string} paramType BORDER_RADIUS
 * @param {string} paramType BORDER_SIZES
 * @param themeData
 * @param options
 * @return {*}
 */
function paramValueToCss(paramValue, paramType, themeData, {
    renderingEnv
}) {
    if (_.isNil(paramValue)) {
        return ''
    }

    const propRender = paramPropRendering[paramType] || paramPropRendering.DEFAULT
    const valueRender = paramRendering[paramType] || paramRendering.DEFAULT

    return propRender(valueRender(paramValue, themeData, renderingEnv))
}

function getParamSplit(prop, skinData, styleProps, themeData, options) {
    const param = params.renderParam(prop, skinData, styleProps, themeData.color, options.evals)
    const paramsSplit = param.type === 'SIZE' && _.isString(param.value) ? _.map(param.value.split(' '), value => ({
        value,
        type: 'SIZE'
    })) : [param]

    return _.map(paramsSplit, paramToMap => paramValueToCss(paramToMap.value, paramToMap.type, themeData, options))
}

/***
 *
 * @param skinCssValue
 * @param skinData
 * @param styleProps
 * @param themeData
 * @param options
 * @returns {string} the compiled css definitions without [p1] expressions
 */
function handleParams(skinCssValue, skinData, styleProps, themeData, options) {
    return skinCssValue.replace(/\[(.*?)\]/g, (full, prop) => {
        const param = params.renderParam(prop, skinData, styleProps, themeData.color, options.evals)
        return paramValueToCss(param.value, param.type, themeData, options)
    })
}

/***
 *
 * @param skinCssValue
 * @param skinData
 * @param styleProps
 * @param themeData
 * @param options
 * @returns {string} the compiled css definitions without calc([p1] + [p2]) expressions
 */
function handleCalcWithParams(skinCssValue, skinData, styleProps, themeData, options) {
    //e.g: replace calc([p1] - [p2]) when p1 is '10px 11px 12px 13px' and p2=3px, to "calc(10px - 3px) calc(11px - 3px) calc(12px - 3px) calc(13px - 3px)"
    //both p1 and p2 can be of multiple values
    return skinCssValue.replace(/calc\(\[([\w\d]+)\] ([-+*\/]) \[([\w\d]+)\]\)/g, (full, prop1, calcSign, prop2) => {
        const param1Split = getParamSplit(prop1, skinData, styleProps, themeData, options)
        const param2Split = getParamSplit(prop2, skinData, styleProps, themeData, options)

        const cssTemplate = _.template('calc(${p1} ${sign} ${p2})')
        const cssValue = []

        for (let i = 0; i < Math.max(param1Split.length, param2Split.length); i++) {
            cssValue.push(cssTemplate({
                p1: param1Split[i] || param1Split[0],
                p2: param2Split[i] || param2Split[0],
                sign: calcSign
            }))
        }

        return cssValue.join(' ')
    })
}

/***
 *
 * @param cssVal
 * @param styleId
 * @returns {*}
 */
function handleAnimationReferences(cssVal, styleId) {
    return cssVal.replace(/((-webkit-)?animation(-name)?: ?)/mgi, `$1${styleId}_`)
}

/****************************************************************************************
 * Render css with custom render function
 * this is here to support stylable skins
 */
function renderCustom(skinJsonObj, styleData, themeData, styleId, options) {
    return skinJsonObj.$render(
        getStyleIdRootClass(styleId),
        getCustomRenderParams(skinJsonObj, styleData, themeData, options),
        functions
    )
}

function getStyleIdRootClass(styleId) {
    return `.${styleId}`
}

function getCustomRenderParams(skinJsonObj, styleData, themeData, options) {
    return _.mapValues(skinJsonObj.params, (value, prop) => {
        const param = params.renderParam(prop, skinJsonObj, styleData, themeData.color, options.evals)
        return resolveParamValue(param.value, param.type, themeData, options)
    })
}

function hasCustomRender(skinJsonObj) {
    return typeof skinJsonObj.$render === 'function'
}

function resolveParamValue(paramValue, paramType, themeData, {
    renderingEnv
}) {
    if (_.isNil(paramValue)) {
        return ''
    }
    return (paramRendering[paramType] || paramRendering.DEFAULT)(paramValue, themeData, renderingEnv)
}

/********************************************************************************************************************/


/**
 * Transform Media Object to Css Media Query
 *
 * @param skinData
 * @param styleData
 * @param themeData
 * @param styleName
 */
function renderSkinMediaQueries(skinData, styleData, themeData, styleName) {
    if (!skinData.mediaQueries || !skinData.mediaQueries.length) {
        return ''
    }

    return _.map(skinData.mediaQueries, media => {
        const css = createSkinCss({
            css: media.css
        }, styleData, themeData, styleName)
        return [media.query, '{', css, '}'].join('')
    }).join('\n')
}

/***
 *
 * @param skinData
 * @param styleProps
 * @param themeData
 * @param styleId
 * @param mobileData
 * @param serviceTopology
 * @returns {string} the compiled css definitions for the skin (after applying params, etc)
 */
function renderSkinCssRules(skinData, styleProps, themeData, styleId, options) {
    return _.map(skinData.css, (cssVal, cssSelector) => {
        const prefix = cssSelector[0] === '@' ? `${styleId}_` : `.${styleId}`
        cssSelector = cssSelector.replace(/%/g, prefix)

        cssVal = handleCalcWithParams(cssVal, skinData, styleProps, themeData, options)
        cssVal = handleParams(cssVal, skinData, styleProps, themeData, options)
        cssVal = handleAnimationReferences(cssVal, styleId)

        return `${cssSelector} {${cssVal}}`
    }).join('\n')
}

/**
 * @typedef {{
 *  siteZoomRatio: {Number},
 *  invertedZoomRatio: {Number},
 *  orientationZoomFix: {Number},
 *  mobileZoom: {Number},
 *  baseThemeUrl: {string},
 *  webThemeUrl: {string}
 * }} envOptions
 */

/**
 *
 * @param {Object}skinJsonObj
 * @param {Object}styleData
 * @param {{font: string[], color:string[]}}themeData
 * @param {string} styleId
 * @param {{renderingEnv: envOptions, evals: <string, function>}}options
 * @returns {string} compiled css
 */
function createSkinCss(skinJsonObj, styleData, themeData, styleId, options = {
    evals: {}
}) {
    return hasCustomRender(skinJsonObj) ? renderCustom(skinJsonObj, styleData, themeData, styleId, options) :
        renderSkinCssRules(skinJsonObj, styleData, themeData, styleId, options) +
        renderSkinMediaQueries(skinJsonObj, styleData, themeData, styleId, options)
}

module.exports = createSkinCss