'use strict'

const PropTypes = require('prop-types')
const styleNodeUtils = require('../../utils/styleNodeUtils')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const coreUtilsLib = require('santa-core-utils')

const fontCss = coreUtilsLib.fonts

const WixFontsStyleNode = props =>
    props.colorsMap && props.fontsMap ? styleNodeUtils.generateStyleNode('theme_fonts', fontCss.getThemeFontsCss(props.fontsMap, props.colorsMap), props.styleRoot) : null

WixFontsStyleNode.displayName = 'WixFontsStyleNode'
WixFontsStyleNode.propTypes = {
    fontsMap: santaTypesDefinitions.Fonts.fontsMap,
    colorsMap: santaTypesDefinitions.Theme.colorsMap,
    styleRoot: PropTypes.string
}

module.exports = WixFontsStyleNode