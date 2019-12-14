'use strict'

const _ = require('lodash')
const PropTypes = require('prop-types')
const coreUtils = require('santa-core-utils')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const skinBasedComp = require('../skinBasedComp')
const skinsJson = require('./textSkins/skins.json.js')
/**
 * @class core.textCompMixin
 */

const {
    filterHtmlString
} = coreUtils.xssUtils

function getCustomCompFonts({
    compData,
    isInSSR,
    isExperimentOpen
}) {
    if (!compData) {
        return []
    }

    if (compData.usedFonts) {
        return compData.usedFonts
    }

    const onlyUploaded = isInSSR && isExperimentOpen('ssrFontShortcut')
    const useRegExp = isExperimentOpen('useRegExpForFontsParse')
    return coreUtils.fonts.collectFontsFromTextDataArray(compData.text, {
        onlyUploaded,
        useRegExp
    })
}

getCustomCompFonts.fontsTypes = {
    compData: santaTypesDefinitions.Component.compData,
    isInSSR: santaTypesDefinitions.isInSSR.isRequired,
    isExperimentOpen: santaTypesDefinitions.isExperimentOpen
}

function getDefaultSkinName() {
    return 'wysiwyg.viewer.skins.WRichTextNewSkin'
}

const skinsMap = _.pick(skinsJson, [getDefaultSkinName(), ..._.keys(skinsJson)])

const skinBasedCompMixin = skinBasedComp(skinsMap)
skinBasedCompMixin.statics.getCompFonts = getCustomCompFonts

const baseGetCompFonts = skinBasedCompMixin.statics.getCompFonts
skinBasedCompMixin.statics.getCompFonts = (styleIds, props) => {
    const defaultFonts = baseGetCompFonts(styleIds, props)
    const customFonts = getCustomCompFonts(props)

    return _.union(defaultFonts, customFonts)
}

skinBasedCompMixin.statics.getCompFonts.fontsTypes = _.assign(getCustomCompFonts.fontsTypes, skinBasedCompMixin.statics.getCompFonts.fontsTypes)

// add css overrides come from component style props that are not in skin
// this is the way to change style per responsive breakpoint for WRichText
const baseGetCompCss = skinBasedCompMixin.statics.getCompCss
skinBasedCompMixin.statics.getCompCss = (styleId, props, styleClassId = styleId) => {
    const cssData = baseGetCompCss(styleId, props, styleClassId)
    const responsiveCssExtensions = getCompResponsiveCss(styleId, props, styleClassId)
    if (cssData && responsiveCssExtensions) {
        cssData[styleId] = `${cssData[styleId]}\n${responsiveCssExtensions}`
    }
    return cssData
}
skinBasedCompMixin.statics.getCompCss.cssTypes = baseGetCompCss.cssTypes

function getCompResponsiveCss(styleId, props, styleClassId) {
    const {
        getStyleData,
        themeData
    } = props

    const elementsToTarget = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol']
    const responsiveCssSelector = elementsToTarget.map(element => `.${styleClassId} ${element}`).join(',')
    const responsiveCssRules = {
        color: value => `color:${/color_/.test(value) ? themeData.color[value.split('color_')[1]] : value};`,
        backgroundColor: value => `background-color:${/color_/.test(value) ? themeData.color[value.split('color_')[1]] : value};`,
        fontSize: value => `font-size:${value};`,
        fontFamily: value => `font-family:${value};`,
        fontWeight: value => `font-weight:${value};`,
        fontStyle: value => `font-style:${value};`,
        textDecoration: value => `text-decoration:${value};`,
        textAlign: value => `text-align:${value};`,
        letterSpacing: value => `letter-spacing:${value};`,
        lineHeight: value => `line-height:${value};`
    }

    const compStyleProps = _.get(getStyleData(styleId), ['style', 'properties'], {})
    const responsiveParamsWithValue = _.keys(_.pick(compStyleProps, _.keys(responsiveCssRules)))
    const responsiveCss = _.map(responsiveParamsWithValue, param => responsiveCssRules[param](compStyleProps[param])).join('')
    return !_.isEmpty(responsiveCss) ? `${responsiveCssSelector} {${responsiveCss}}\n` : ''
}

module.exports = {

    propTypes: {
        reportBI: santaTypesDefinitions.reportBI,
        id: santaTypesDefinitions.Component.id.isRequired,
        skin: santaTypesDefinitions.Component.skin.isRequired,
        style: santaTypesDefinitions.Component.style,
        scale: santaTypesDefinitions.Component.scale,
        isPreviewMode: santaTypesDefinitions.isPreviewMode,
        isMobileView: santaTypesDefinitions.isMobileView.isRequired,
        componentViewMode: santaTypesDefinitions.RenderFlags.componentViewMode,
        isResponsive: santaTypesDefinitions.RendererModel.isResponsive,
        title: PropTypes.string
    },

    mixins: [skinBasedCompMixin],

    statics: {
        getComponentSkins: () => skinsMap
    },

    getDefaultSkinName,

    componentWillMount() {
        this.updateHTML(this.props)
    },

    updateHTML(props) {
        this._componentHtml = filterHtmlString(props.compData.text || '', {
            allowIframes: this.allowIframes
        })
        this.convertCompDataTextToHTML(props)
    },

    componentWillReceiveProps(nextProps) {
        this.updateHTML(nextProps)
    },

    isPacked() {
        const isMobilePreview = this.props.isMobileView && this.props.isPreviewMode
        return _.get(this.props.compProp, 'packed', false) || isMobilePreview
    },

    getRootStyle(style) {
        const styleWithoutHeight = _.clone(style || {})
        if ((styleWithoutHeight['overflow-y'] || styleWithoutHeight.overflowY) !== 'hidden') {
            styleWithoutHeight.height = 'auto'
        }
        const minHeight = this.getMinHeight && this.getMinHeight()
        if (minHeight) {
            styleWithoutHeight.minHeight = minHeight
        }
        return styleWithoutHeight
    },

    getResponsiveRootProps(skinName) {
        const style = {}
        // TODO: yinonc remove next line editor check when preview extensions will be fully working in the responsive ds.
        if (skinName === 'wysiwyg.viewer.skins.WRichTextNewSkin' && this.props.componentViewMode !== 'editor') {
            style.pointerEvents = 'none'
        }

        return _.assign({
                style
            },
            this.props.title && {
                title: this.props.title
            }
        )
    },

    getRootProps(skinName) {
        const savedMinHeight = this.getMinHeight && this.getMinHeight()

        const style = this.getRootStyle(this.props.style)
        if (skinName === 'wysiwyg.viewer.skins.WRichTextNewSkin') {
            style.pointerEvents = 'none'
        }

        return _.assign({
                'data-packed': this.isPacked(),
                style
            },
            savedMinHeight && {
                'data-min-height': savedMinHeight
            },
            this.props.title && {
                title: this.props.title
            }
        )
    },

    getA11yProps() {
        const a11y = _.get(this.props, ['compData', 'a11y'], {})
        const attributes = ['label', 'live', 'atomic', 'hidden', 'level', 'current'].reduce((acc, curr) => {
            acc[`aria-${curr}`] = a11y[curr]
            return acc
        }, {})
        return _.assign({
            role: a11y.role
        }, attributes)
    },

    getSkinProperties() { // eslint-disable-line complexity
        this.lastScale = this.props.scale || 1
        const skinName = _.has(skinsMap, this.props.skin) ? this.props.skin : this.getDefaultSkinName()

        const a11yProps = this.getA11yProps()
        const rootProps = this.props.isResponsive ? this.getResponsiveRootProps(skinName) : this.getRootProps(skinName)
        const refData = {
            '': _.assign(a11yProps, rootProps)
        }

        let textContainer
        if (skinName === 'wysiwyg.viewer.skins.WRichTextSkin' || skinName === 'wysiwyg.viewer.skins.WRichTextClickableSkin') {
            textContainer = refData.richTextContainer = {}
        } else {
            textContainer = refData['']
        }

        if (_.isString(this._componentHtml)) {
            textContainer.dangerouslySetInnerHTML = {
                __html: this._componentHtml || ''
            }
        } else {
            textContainer.children = this._componentHtml
        }

        const overrideAlignment = _.get(this.props, ['compProp', 'overrideAlignment'])
        if (overrideAlignment) {
            textContainer.className = this.classSet(_.zipObject([`override-${overrideAlignment}`], [true]))
        }

        return refData
    }
}