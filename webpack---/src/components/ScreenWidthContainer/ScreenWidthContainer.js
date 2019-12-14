'use strict'

const _ = require('lodash')
const createReactClass = require('create-react-class')
const PropTypes = require('prop-types')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const skinBasedComp = require('../../mixins/skinBasedComp')
const inlineContentMixin = require('../../mixins/inlineContentMixin')

const skinsJson = require('../../components/ScreenWidthContainer/screenWidthSkins/skins.json.js')


const skins = _.pick(skinsJson, [
    'wysiwyg.viewer.skins.screenwidthcontainer.DefaultScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.BevelScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.IronScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.DoubleBorderScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.GridScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.TransparentHalfScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.TwoColorScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.LineBottomScreen',
    'wysiwyg.viewer.skins.screenwidthcontainer.ShadowScreen'
])

const getComponentSkins = () => skins


/**
 * @class components.WixScreenWidthContainer
 * @extends {core.skinBasedComp}
 */

const ScreenWidthContainer = createReactClass({
    displayName: 'WixScreenWidthContainer',

    mixins: [skinBasedComp(skins), inlineContentMixin],

    propTypes: {
        children: PropTypes.node,
        defaultBackgroundStyle: santaTypesDefinitions.Container.defaultBackgroundStyle.isRequired,
        defaultContentArea: santaTypesDefinitions.Container.defaultContentArea.isRequired,
        isMobileView: santaTypesDefinitions.isMobileView.isRequired,
        isMobileDevice: santaTypesDefinitions.Device.isMobileDevice.isRequired,
        siteWidth: santaTypesDefinitions.siteWidth.isRequired
    },

    statics: {
        useSantaTypes: true,
        getComponentSkins,
        compType: 'wysiwyg.viewer.components.ScreenWidthContainer'
    },

    isScreenWidth: () => true,

    getInitialState() {
        return {
            $displayDevice: this.props.isMobileView ? 'mobileView' : ''
        }
    },

    getSkinProperties() {
        return {
            '': {
                'data-is-mobile': this.props.isMobileView || this.props.isMobileDevice,
                'data-site-width': this.props.siteWidth,
                style: {
                    left: 0
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

module.exports = ScreenWidthContainer