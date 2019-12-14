'use strict'

const _ = require('lodash')
const React = require('react')
const PropTypes = require('prop-types')
const coreUtilsLib = require('santa-core-utils')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const createReactElement = require('../../utils/createReactElement')
const WixFontsStyleNode = require('./WixFontsStyleNode')
const WixColorsStyleNode = require('./WixColorsStyleNode')

const getThemeStyles = props => [
    createReactElement(WixFontsStyleNode, _.assign({
        key: 'fontsStyleNode'
    }, props)),
    createReactElement(WixColorsStyleNode, _.assign({
        key: 'colorsStyleNode'
    }, props))
]

/**
 * @class components.ThemeRenderer
 */
//eslint-disable-line santa/no-module-state
class ThemeRenderer extends React.Component {
    render() {
        const childStyles = _.compact(getThemeStyles(this.props))

        return createReactElement('div', {
            key: 'theme'
        }, ...childStyles)
    }
}

class ThemeRendererWithFonts extends ThemeRenderer {
    static getCompFonts(styleIds, {
        fontsMap
    }) {
        return fontsMap.map(fontStr => {
            const font = coreUtilsLib.cssUtils.parseFontStr(fontStr)
            return font.family
        })
    }
}

ThemeRendererWithFonts.getCompFonts.fontsTypes = {
    fontsMap: santaTypesDefinitions.Fonts.fontsMap
}

ThemeRenderer.displayName = 'ThemeRenderer'
ThemeRenderer.useSantaTypes = true
ThemeRenderer.compType = 'wysiwyg.viewer.components.ThemeRenderer'
ThemeRenderer.propTypes = _.assign({
    fontsMap: santaTypesDefinitions.Fonts.fontsMap,
    colorsMap: santaTypesDefinitions.Theme.colorsMap,
    styleRoot: PropTypes.string
}, WixFontsStyleNode.propTypes, WixColorsStyleNode.propTypes)

module.exports = ThemeRenderer

module.exports.ThemeRendererWithFonts = ThemeRendererWithFonts