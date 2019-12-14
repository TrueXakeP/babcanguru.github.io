'use strict'

const _ = require('lodash')
const createReactClass = require('create-react-class')
const PropTypes = require('prop-types')
const skinBasedComp = require('../../mixins/skinBasedComp')
const fixedPositionContainerMixin = require('../../mixins/fixedPositionContainerMixin')
const inlineContentMixin = require('../../mixins/inlineContentMixin')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')

const skinsJson = require('../../components/ScreenWidthContainer/screenWidthSkins/skins.json.js')

const footerSkins = _.pick(skinsJson, [
    'wysiwyg.viewer.skins.screenwidthcontainer.DefaultScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.BevelScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.InnerShadowScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.ThreeDeeScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.TransparentScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.LiftedTopScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.LiftedBottomScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.ShadowTopScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.IronScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.DoubleBorderScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.BoxScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.BlankScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.SolidScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.NoiseScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.LineTopScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.WoodScreen'
])

const getComponentSkins = () => footerSkins

const getFooterStyle = (footerStructure, isMobile) => {
    const style = {}
    const isFixed = _.get(footerStructure, 'layout.fixedPosition', false)
    if (isFixed) {
        style.top = 'auto'
    } else {
        style.bottom = 'auto'
    }
    if (isMobile) {
        // forcing footer to be 0 on mobile even if was specified different in structure somehow
        // see site with 2 footer components where first one has layout.x=20. see:
        // https://autoskins.wixsite.com/stronka?devicepixelratio=2&hideComponents=WixAdsMobile&showMobileView=true
        style.left = 0
    }

    return style
}

/**
 * @class components.FooterContainer
 * @extends {components.WixScreenWidthContainer}
 * @type {{displayName: string, mixins: *[], getSkinProperties: getSkinProperties}}
 */

const FooterContainer = createReactClass({
    displayName: 'FooterContainer',

    mixins: [skinBasedComp(footerSkins), fixedPositionContainerMixin, inlineContentMixin],

    propTypes: {
        children: PropTypes.node,
        defaultBackgroundStyle: santaTypesDefinitions.Container.defaultBackgroundStyle.isRequired,
        defaultContentArea: santaTypesDefinitions.Container.defaultContentArea.isRequired,
        isMobileDevice: santaTypesDefinitions.Device.isMobileDevice.isRequired,
        isMobileView: santaTypesDefinitions.isMobileView.isRequired,
        structure: santaTypesDefinitions.Component.structure.isRequired,
        siteWidth: santaTypesDefinitions.siteWidth.isRequired,
        style: santaTypesDefinitions.Component.style
    },

    statics: {
        compSpecificIsDomOnlyOverride: () => false,
        getComponentSkins,
        compType: 'wysiwyg.viewer.components.FooterContainer'
    },

    isScreenWidth() {
        return true
    },

    getSkinProperties() {
        const isRunningInMobileMode = this.props.isMobileView || this.props.isMobileDevice
        const footerStyle = getFooterStyle(this.props.structure, isRunningInMobileMode) //NOTE: see screenWidthBase.scss to see where this gets fixed/absolute position overrides from
        return {
            '': {
                tagName: 'footer',
                style: _.assign(this.getRootStyle(this.props.style), footerStyle),
                className: this.classSet({
                    footer: true
                }),
                tabIndex: '-1',
                'data-site-width': this.props.siteWidth,
                'data-fixedposition': !!this.props.structure.layout.fixedPosition,
                'data-isrunninginmobile': isRunningInMobileMode
            },
            screenWidthBackground: {
                style: {
                    left: 0,
                    width: '100%'
                }
            },
            centeredContent: {
                style: {
                    width: '100%'
                }
            },
            bg: {
                style: this.props.defaultBackgroundStyle
            },
            inlineContent: {
                children: this.getChildrenRenderer({
                    contentArea: this.props.defaultContentArea
                })
            }
        }
    }
})

module.exports = FooterContainer