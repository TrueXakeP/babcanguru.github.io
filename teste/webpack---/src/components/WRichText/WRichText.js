'use strict'

const _ = require('lodash')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const textCompMixins = require('../../mixins/textMixins/textCompMixin')
const textComponentsUtils = require('../../utils/text/textComponentsUtils')
const createReactClass = require('create-react-class')
const createSantaTypesDefinitions = require('../../utils/createSantaTypesDefinitions')
const PropTypes = require('prop-types')

const privateSantaTypes = createSantaTypesDefinitions({
    Links: PropTypes.object
}, 'WRichText')


/**
 * @class components.WRichText
 * @extends {ReactCompositeComponent}
 * @property {WRichText.properties} props
 */

const WRichText = createReactClass({ //eslint-disable-line santa/no-module-state
    displayName: 'WRichText',

    statics: {
        compType: 'wysiwyg.viewer.components.WRichText',
        santaTypeDefinitions: privateSantaTypes
    },
    propTypes: {
        compData: santaTypesDefinitions.Component.compData.isRequired,
        scale: santaTypesDefinitions.Component.scale,
        compProp: santaTypesDefinitions.Component.compProp,
        links: santaTypesDefinitions.WRichText.Links,
        colorsMap: santaTypesDefinitions.Theme.colorsMap.isRequired,
        fontsMap: santaTypesDefinitions.Fonts.fontsMap.isRequired,
        isMobileView: santaTypesDefinitions.isMobileView,
        isMeshLayoutMechanism: santaTypesDefinitions.Layout.isMeshLayoutMechanism,
        isPreviewMode: santaTypesDefinitions.isPreviewMode,
        isExperimentOpen: santaTypesDefinitions.isExperimentOpen
    },

    mixins: [textCompMixins],

    allowIframes: false,

    fontGetter(fontClassName) {
        const fontNumber = fontClassName.split('_')[1]
        return this.props.fontsMap[fontNumber]
    },

    colorGetter(colorClassName) {
        const colorNumber = colorClassName.split('_')[1]
        return this.props.colorsMap[colorNumber] || colorClassName
    },

    getMinHeight() {
        if (this.props.rotationInDegrees) {
            return 0
        }
        const actualMinHeight = this.props.isMobileView ? 0 : _.toNumber(_.get(this.props.compProp, 'minHeight', 0))
        if (this.props.isMeshLayoutMechanism && !this.isPacked()) {
            return actualMinHeight || this.props.style.height
        }
        return actualMinHeight
    },

    convertCompDataTextToHTML(props) {
        if (!this._componentHtml) {
            return
        }

        this._componentHtml = textComponentsUtils.convertDataQueryLinksIntoHtmlAnchors(
            this._componentHtml,
            props.links
        )

        let overrideColor = _.get(props, ['compProp', 'overrideColor'])
        overrideColor = overrideColor && this.colorGetter(overrideColor)

        this._componentHtml = textComponentsUtils.mobileTextTransformIfNeeded(
            this._componentHtml, {
                brightness: _.get(props, 'compProp.brightness'),
                overrideColor,
                isMobileView: props.isMobileView,
                scale: props.scale,
                fontGetter: this.fontGetter,
                colorGetter: this.colorGetter
            }
        )

        if (!props.noAutoLinkGeneration && !this.props.isPreviewMode) {
            this._componentHtml = textComponentsUtils.createImpliedLinks({
                htmlContent: this._componentHtml,
                isMobileView: this.props.isMobileView,
                useEarlyLinkCheck: this.props.isExperimentOpen('useEarlyLinkCheck')
            })
        }
    }
})

module.exports = WRichText