'use strict'

const _ = require('lodash')
const createReactClass = require('create-react-class')
const PropTypes = require('prop-types')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const skinBasedComp = require('../../mixins/skinBasedComp')

const skinsJson = require(
    '../../components/ScreenWidthContainer/screenWidthSkins/skins.json.js'
)

const skins = _.pick(skinsJson, [
    'wysiwyg.viewer.skins.screenwidthcontainer.TransparentScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.DefaultScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.BevelScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.BoxScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.LiftedShadowScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.AppleScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.BlankScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.GridScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.TransparentHalfScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.TwoColorScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.LineBottomScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.ShadowScreen'
])

const getComponentSkins = () => skins

/**
 * @class components.PagesContainer
 * @extends {core.skinBasedComp}
 */

const getTransparentBG = () => ({
    bg: {
        style: {
            display: 'none'
        }
    }
})

const PagesContainer = createReactClass({
    displayName: 'PagesContainer',

    mixins: [skinBasedComp(skins)],

    propTypes: {
        children: PropTypes.node,
        isMobileView: santaTypesDefinitions.isMobileView.isRequired,
        siteWidth: santaTypesDefinitions.siteWidth.isRequired,
        isMobileDevice: santaTypesDefinitions.Device.isMobileDevice.isRequired,
        isResponsive: santaTypesDefinitions.RendererModel.isResponsive.isRequired,
        isMeshLayoutMechanism: santaTypesDefinitions.Layout.isMeshLayoutMechanism.isRequired
    },

    statics: {
        useSantaTypes: true,
        getComponentSkins,
        compSpecificIsDomOnlyOverride: () => false,
        compType: 'wysiwyg.viewer.components.PagesContainer'
    },

    isScreenWidth() {
        return true
    },

    ignoreDimensions() {
        return this.props.isMeshLayoutMechanism
    },

    getInitialState() {
        return {
            $displayDevice: this.props.isMobileView ? 'mobileView' : ''
        }
    },

    getSkinProperties() {
        const isMobile = !!(this.props.isMobileView || this.props.isMobileDevice)
        const {
            isMeshLayoutMechanism,
            isResponsive
        } = this.props
        const skinProps = _.assign({
            '': {
                tagName: 'main',
                tabIndex: '-1',
                'data-is-mobile': isMobile,
                'data-is-mesh': isMeshLayoutMechanism,
                'data-site-width': this.props.siteWidth
            },
            screenWidthBackground: {
                style: {
                    left: 0
                }
            },
            inlineContent: {
                children: this.props.children
            }
        }, getTransparentBG())

        if (isMeshLayoutMechanism || isResponsive) {
            skinProps.centeredContent = {
                style: {
                    position: 'relative'
                }
            }

            skinProps.inlineContent.style = {
                position: 'relative'
            }
        }

        return skinProps
    }
})

module.exports = PagesContainer