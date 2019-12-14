'use strict'

const PropTypes = require('prop-types')
const styleNodeUtils = require('../../utils/styleNodeUtils')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const coreUtilsLib = require('santa-core-utils')

const cssUtils = coreUtilsLib.cssUtils

const WixColorsStyleNode = props =>
    props.colorsMap ? styleNodeUtils.generateStyleNode('theme_colors', cssUtils.getColorsCssString(props.colorsMap), props.styleRoot) : null

WixColorsStyleNode.displayName = 'WixColorsStyleNode'
WixColorsStyleNode.propTypes = {
    colorsMap: santaTypesDefinitions.Theme.colorsMap,
    styleRoot: PropTypes.string
}

module.exports = WixColorsStyleNode