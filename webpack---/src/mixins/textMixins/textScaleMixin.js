'use strict'

const _ = require('lodash')
const coreUtilsLib = require('santa-core-utils')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const skinInfoMixin = require('../skinInfoMixin')
const getSkinFromSkinsDefinitions = require('../getSkinFromSkinsDefinitions')

function getMobileFontSize(desktopFontSize, scale) {
    return coreUtilsLib.mobileUtils.convertFontSizeToMobile(desktopFontSize, scale)
}

function getFontFromExports(container, skins) {
    const skin = getSkinFromSkinsDefinitions(skins, container.props.skin, container.props.isExperimentOpen)
    const exports = skin && skin.exports
    const exportWithFont = _.find(exports, singleExport => {
        const skinName = singleExport.skin
        return !_.isUndefined(container.getParamFromSkin('fnt', skinName).value)
    })

    return exportWithFont && container.getParamFromSkin('fnt', exportWithFont.skin).value
}

function getLastScale(props) {
    return props.scale || 1
}

module.exports = skins => ({
    mixins: [skinInfoMixin(skins)],

    propTypes: {
        compTheme: santaTypesDefinitions.Component.theme,
        scale: santaTypesDefinitions.Component.scale,
        skin: santaTypesDefinitions.Component.skin,
        isMobileView: santaTypesDefinitions.isMobileView,
        fontsMap: santaTypesDefinitions.Fonts.fontsMap,
        isExperimentOpen: santaTypesDefinitions.isExperimentOpen
    },

    componentWillMount() {
        this.lastScale = getLastScale(this.props)
    },

    componentWillReceiveProps() {
        this.lastScale = getLastScale(this.props)
    },

    fontGetter(fontClassName) {
        const fontNumber = fontClassName.split('_')[1]
        return this.props.fontsMap[fontNumber]
    },

    getFontSize(fontParam, scale) {
        const fontStyle = {}
        if (this.props.isMobileView) {
            const desktopFontSize = this.getDesktopFontSize(fontParam)
            if (desktopFontSize) {
                const mobileScale = scale || this.props.scale
                fontStyle.fontSize = `${getMobileFontSize(desktopFontSize, mobileScale)}px`
            }
        }
        return fontStyle
    },

    getDesktopFontSize(fontParam) {
        const style = this.props.compTheme
        const fontParamName = fontParam || 'fnt'

        const fontClassName = _.get(style, ['style', 'properties', fontParamName]) ||
            _.get(getSkinFromSkinsDefinitions(skins, this.props.skin, this.props.isExperimentOpen), ['paramsDefaults', fontParamName]) ||
            getFontFromExports(this, skins)
        if (fontClassName) {
            const font = this.fontGetter(fontClassName) || fontClassName
            return parseInt(coreUtilsLib.fonts.parseFontStr(font).size, 10)
        }
    }
})