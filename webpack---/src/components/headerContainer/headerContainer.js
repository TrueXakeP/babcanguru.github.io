'use strict'

const _ = require('lodash')
const createReactClass = require('create-react-class')
const PropTypes = require('prop-types')
const skinBasedComp = require('../../mixins/skinBasedComp')
const inlineContentMixin = require('../../mixins/inlineContentMixin')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')

const skinsJson = require('../../components/ScreenWidthContainer/screenWidthSkins/skins.json.js')

const headerSkins = _.pick(skinsJson, [
    'wysiwyg.viewer.skins.screenwidthcontainer.DefaultScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.BevelScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.InnerShadowScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.ThreeDeeScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.TransparentScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.LiftedTopScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.LiftedBottomScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.ShadowBottomScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.IronScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.DoubleBorderScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.BoxScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.BlankScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.SolidScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.NoiseScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.LineBottomScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.WoodScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.AfterScroll'
])

const getComponentSkins = () => headerSkins

const getHeaderInlineStyle = (fixedPosition, headerTop, wixTopAdsHeight, isMeshLayoutMechanism, isMobileView) => {
    const style = {}

    if (fixedPosition) {
        style.position = 'fixed'
        style.marginTop = wixTopAdsHeight
        style.top = 0
    } else if (isMeshLayoutMechanism) {
        style.position = 'relative'
        style.marginTop = headerTop
    } else {
        style.position = 'absolute'
    }

    if (isMobileView && !fixedPosition) {
        style.transform = ''
    }

    return style
}

const HeaderContainer = createReactClass({
    displayName: 'HeaderContainer',

    mixins: [skinBasedComp(getComponentSkins()), inlineContentMixin],

    propTypes: {
        children: PropTypes.node,
        defaultBackgroundStyle: santaTypesDefinitions.Container.defaultBackgroundStyle.isRequired,
        defaultContentArea: santaTypesDefinitions.Container.defaultContentArea.isRequired,
        style: santaTypesDefinitions.Component.style.isRequired,
        isMobileView: santaTypesDefinitions.isMobileView.isRequired,
        isExperimentOpen: santaTypesDefinitions.isExperimentOpen,
        isMeshLayoutMechanism: santaTypesDefinitions.Layout.isMeshLayoutMechanism,
        isMobileDevice: santaTypesDefinitions.Device.isMobileDevice.isRequired,
        siteWidth: santaTypesDefinitions.siteWidth.isRequired,
        structure: santaTypesDefinitions.Component.structure.isRequired,
        wixTopAdsHeight: santaTypesDefinitions.WixAds.wixTopAdsHeight.isRequired,
        isAfterScroll: santaTypesDefinitions.HeaderContainer.isAfterScroll.isRequired,
        isPlayingAllowed: santaTypesDefinitions.RenderFlags.isPlayingAllowed.isRequired
    },

    isScreenWidth() {
        return true
    },

    statics: {
        useSantaTypes: true,
        compSpecificIsDomOnlyOverride: () => false,
        getComponentSkins,
        compType: 'wysiwyg.viewer.components.HeaderContainer'
    },

    getInitialState() {
        return {}
    },

    measureComponent(domNode) {
        const newState = _.defaults({
            headerHeight: domNode.clientHeight,
            bodyHeight: domNode.ownerDocument.body.clientHeight
        }, this.state)

        if (!_.isEqual(newState, this.state)) {
            this.setState(newState)
        }
    },

    getSkinProperties() { //NOTE: see screenWidthBase.scss to see where this gets fixed/absolute position overrides from
        const {
            isMobileView,
            isMobileDevice,
            structure,
            isMeshLayoutMechanism,
            wixTopAdsHeight,
            isAfterScroll,
            isPlayingAllowed
        } = this.props
        const isDesktop = !isMobileDevice && !isMobileView
        const {
            headerHeight,
            bodyHeight
        } = this.state
        const fixedPosition = _.get(this.props, 'renderFixedPositionContainers', true) &&
            _.get(structure, 'layout.fixedPosition', false) &&
            (isDesktop || !_.isNumber(headerHeight) || headerHeight <= bodyHeight / 2)
        const headerTop = this.props.structure.layout.y
        return {
            '': {
                tagName: 'header',
                'data-is-mobile': isMobileView || isMobileDevice,
                'data-state': _([fixedPosition && 'fixedPosition', isMobileView && 'mobileView', isAfterScroll && 'scrolled', isPlayingAllowed && 'transition-allowed']).compact().join(' '),
                'data-site-width': this.props.siteWidth,
                'data-header-top': headerTop,
                style: getHeaderInlineStyle(fixedPosition, headerTop, wixTopAdsHeight, isMeshLayoutMechanism, isMobileView)
            },
            screenWidthBackground: {
                style: {
                    left: 0,
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

module.exports = HeaderContainer