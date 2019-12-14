'use strict'

const _ = require('lodash')
const {
    skinNameToUri
} = require('./vectorImageConversionUtils')
const fragment = require('./fragment')

const EMPTY_SVG_ID = '0da768_b05a1a324a9f4a2e9be9a9c5dc3f50c9.svg'
const EMPTY_SHAPE = '<svg type="shape" viewBox="0 0 1 1"><g></g></svg>'
const SVG_ROOT = 'svgShapes'
const SVG_STORES = {
    CONTENT: 'content',
    INFO: 'info',
    BOX_BOUNDARIES: 'boxBoundaries'
}

const SVG_TYPES = {
    SHAPE: 'shape',
    TINT: 'tint',
    COLOR: 'color',
    UGC: 'ugc'
}

const SOURCE_TYPES = {
    URL: 'url',
    INLINE: 'inline',
    WIX_MEDIA_ID: 'svgId',
    EMPTY: 'empty'
}

const SHAPE_STYLE_DEFAULTS = {
    strokeWidth: 4,
    opacity: 1,
    stroke: '#5E97FF',
    strokeOpacity: 1,
    enableStroke: false
}
const ART_STYLE_DEFAULTS = {
    opacity: 1
}
const COLOR_DEFAULT = {
    color1: '#242323'
}

const SKIN_STYLE_KEYS_MAP = {
    'alpha-fillcolor': 'opacity',
    'alpha-stroke': 'strokeOpacity',
    'enablestroke': 'enableStroke',
    'fillcolor': 'fill',
    'stroke': 'stroke',
    'strokewidth': 'strokeWidth',
    'opacity': 'opacity'
}

/**
 * Since changing SvgShape to VectorImage we save the original uri of the svg in data
 * So, we only need to transform leftover components with svgs that start with svgshape.v1 or svgshape.v2
 * @param {string} mediaRootUrl
 * @param {string} svgId
 * @returns {string}
 */
function svgIdToUrl(mediaRootUrl, svgId) {
    if (/^svgshape\.v[12]/.test(svgId)) {
        const svgUri = skinNameToUri(svgId)
        return `${mediaRootUrl}shapes/${svgUri}`
    }
    return `${mediaRootUrl}shapes/${svgId}`
}

/**
 * Return the type of src
 * @param {string} svgSrc
 * @returns {string}
 */
function getSourceType(svgSrc) {
    const isUrl = /^https?:\/\//
    const isSrc = /^\s*<(\?xml|svg)/i

    if (svgSrc) {
        if (isUrl.test(svgSrc)) {
            return SOURCE_TYPES.URL
        }
        if (isSrc.test(svgSrc)) {
            return SOURCE_TYPES.INLINE
        }
        return SOURCE_TYPES.WIX_MEDIA_ID
    }
    return SOURCE_TYPES.EMPTY
}

/**
 *
 * @param {string} svgType
 * @param {SVGElement} svgNode
 * @returns {string}
 */
function getUGCViewBox(svgType, svgNode) {
    if (svgType === SVG_TYPES.UGC) {
        const width = parseInt(svgNode.getAttribute('width'), 0)
        const height = parseInt(svgNode.getAttribute('height'), 0)
        if (width && height) {
            return `0 0 ${width} ${height}`
        }
    }
    return ''
}

/**
 * get fill colors from svg string
 * @param {string} svgString
 * @param {Object} [externalFragment]
 * @returns {{
 *  color1?: string,
 *  color2?: string,
 *  color3?: string,
 *  color4?: string,
 *  color5?: string,
 *  color6?: string,
 *  color7?: string,
 *  color8?: string,
 *  svgType: 'shape'|'color'|'tint',
 *  viewBox: string,
 *  }}
 */
function parseSvgInfo(svgString, externalFragment) {
    const div = (externalFragment || fragment).document.createElement('div')
    div.innerHTML = svgString

    const colorNodes = div.querySelectorAll('[data-color]')
    const svgInfo = _.reduce(colorNodes, function(colors, node) {
        colors[`color${node.getAttribute('data-color')}`] = node.getAttribute('fill')
        return colors
    }, {})
    const svgNode = div.querySelector('svg')
    svgInfo.svgType = svgNode.getAttribute('data-type') || SVG_TYPES.SHAPE
    svgInfo.viewBox = svgNode.getAttribute('viewBox') || getUGCViewBox(svgInfo.svgType, svgNode)
    return svgInfo
}

/**
 * SvgStore data structure
 * @param {string} svgString
 * @param {Object} [externalFragment]
 * @returns {{}}
 */
function svgStringToStoreData(svgString, externalFragment) {
    return {
        [SVG_STORES.CONTENT]: svgString,
        [SVG_STORES.INFO]: parseSvgInfo(svgString, externalFragment),
        [SVG_STORES.BOX_BOUNDARIES]: {}
    }
}

module.exports = {
    svgIdToUrl,
    getSourceType,
    svgStringToStoreData,
    EMPTY_SVG_ID,
    EMPTY_SHAPE,
    SVG_STORES,
    SVG_TYPES,
    SOURCE_TYPES,
    SHAPE_STYLE_DEFAULTS,
    ART_STYLE_DEFAULTS,
    COLOR_DEFAULT,
    SKIN_STYLE_KEYS_MAP,
    SVG_ROOT
}