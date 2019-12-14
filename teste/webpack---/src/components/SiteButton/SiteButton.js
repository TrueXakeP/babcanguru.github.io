'use strict'

const _ = require('lodash')
const skinsMap = require('./skins.json.js')
const buttonMixin = require('../../mixins/buttonMixin')
const skinBasedComp = require('../../mixins/skinBasedComp')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const createReactElement = require('../../utils/createReactElement')
const coreUtilsLib = require('santa-core-utils')
const createReactClass = require('create-react-class')
const createSantaTypesDefinitions = require('../../utils/createSantaTypesDefinitions')
const PropTypes = require('prop-types')

const privateSantaTypes = createSantaTypesDefinitions({
    link: PropTypes.object,
    impliedLink: PropTypes.object
}, 'SiteButton')

/**
 * @class components.siteButton
 * @extends {core.skinBasedComp}
 */

const siteButton = createReactClass({
    displayName: 'SiteButton',
    mixins: [skinBasedComp(skinsMap), buttonMixin(skinsMap)],

    propTypes: {
        structure: santaTypesDefinitions.Component.structure.isRequired,
        compData: santaTypesDefinitions.Component.compData,
        registerLayoutFunc: santaTypesDefinitions.Layout.registerLayoutFunc.isRequired,
        isMobileDevice: santaTypesDefinitions.Device.isMobileDevice,
        isMobileView: santaTypesDefinitions.isMobileView,
        link: privateSantaTypes.link,
        impliedLink: privateSantaTypes.impliedLink
    },

    statics: {
        compSpecificIsDomOnlyOverride() {
            return false
        },
        getComponentSkins: () => skinsMap,
        compType: 'wysiwyg.viewer.components.SiteButton',
        santaTypeDefinitions: privateSantaTypes
    },

    getDefaultProps() {
        return {
            shouldUseFlex: true
        }
    },

    getInitialState() {
        return {
            $mobile: this.props.isMobileDevice ? 'mobile' : 'desktop',
            $shouldUseFlex: this.props.shouldUseFlex ? 'shouldUseFlex' : '',
            $align: this.props.compProp.align
        }
    },

    componentWillReceiveProps(nextProps) {
        if (this.state.$align !== nextProps.compProp.align) {
            this.setState({
                $align: nextProps.compProp.align
            })
        }
    },

    getImpliedLink() {
        return this.props.impliedLink
    },

    isClickActionDefinedInWixCode() {
        return _.get(this.props, 'compActions.click')
    },

    getLinkSkinPart() {
        const compProps = this.props.compProp
        const noLink = {
            parentConst: createReactElement.bind(null, 'div')
        }

        if (compProps.isDisabled) {
            return noLink
        }

        // Render button to trigger user code click event handler using both Space and Enter keys
        // If both editor link and user code are defined, only wix code will occur
        if (this.isClickActionDefinedInWixCode()) {
            return {
                parentConst: createReactElement.bind(null, 'button'),
                style: {
                    cursor: 'pointer'
                }
            }
        }

        if (this.props.link) {
            const linkSkinProps = this.props.link
            const additionPropsForAccessibility = {
                onKeyDown: coreUtilsLib.accessibility.keyboardInteractions.activateBySpaceButton
            }
            if (linkSkinProps.parentConstType) {
                additionPropsForAccessibility.parentConst = createReactElement.bind(null, linkSkinProps.parentConstType)
                delete linkSkinProps.parentConstType
            }
            return _.assign(linkSkinProps, additionPropsForAccessibility)
        }

        return this.getImpliedLink() || noLink
    },

    getWrapperSkinPart(isDisabled) {
        const role = 'button'
        const defaultSkinProps = {
            id: this.props.id,
            key: `f${this.getDesktopFontSize() * this.currentScale}`,
            ref: this.props.id,
            'data-align': this.props.compProp.align,
            'data-disabled': isDisabled,
            'data-margin': this.props.compProp.margin,
            'data-should-use-flex': this.props.shouldUseFlex,
            'data-width': _.get(this.props.structure, 'layout.width', 0),
            'data-height': _.get(this.props.structure, 'layout.height', 0)
        }

        if (isDisabled) {
            defaultSkinProps['aria-disabled'] = true
            defaultSkinProps.tabIndex = -1
            defaultSkinProps.role = role

            return defaultSkinProps
        }

        const additionPropsForAccessibility = {}
        const isLink = !!this.props.link
        const isButton = this.isClickActionDefinedInWixCode()
        const isLightBox = isLink && _.get(this.props.compData.link, ['type']) === 'PageLink' && _.get(this.props.compData.link, ['pageId', 'isPopup'])

        if (!isButton && (!isLink || isLightBox)) {
            additionPropsForAccessibility.role = role
            additionPropsForAccessibility.tabIndex = 0
        }

        return _.assign(defaultSkinProps, additionPropsForAccessibility)
    },

    getSkinProperties() {
        this.lastScale = this.props.scale || 1
        const isDisabled = !!this.props.compProp.isDisabled

        const wrapperSkinPart = this.getWrapperSkinPart(isDisabled)
        const linkSkinPart = this.getLinkSkinPart()

        if (!this.props.shouldUseFlex) {
            linkSkinPart.style = linkSkinPart.style || {}
            linkSkinPart.style.textAlign = this.props.compProp.align
        }

        const skinProps = {
            '': wrapperSkinPart,
            label: {
                children: [this.props.compData.label],
                style: this.getLabelStyle()
            },
            link: linkSkinPart
        }

        if (this.props.onClick && !isDisabled) {
            skinProps[''].onClick = this.props.onClick
        }

        this.resetMinHeightIfNeeded(skinProps)
        return skinProps
    }
})

module.exports = siteButton