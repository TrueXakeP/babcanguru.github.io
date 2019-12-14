'use strict'

const _ = require('lodash')
const skinsJson = require('./skins/skins.json.js')
const createReactClass = require('create-react-class')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const skinBasedComp = require('../../mixins/skinBasedComp')

const force3Dskins = [
    'wysiwyg.viewer.skins.line.ZigzagLineFlipSkin',
    'wysiwyg.viewer.skins.line.ZigzagLineSkin'
]

const FiveGridLine = createReactClass({
    displayName: 'FiveGridLine',
    mixins: [skinBasedComp(skinsJson)],
    propTypes: {
        compProp: santaTypesDefinitions.Component.compProp,
        skin: santaTypesDefinitions.Component.skin,
        theme: santaTypesDefinitions.Component.theme
    },
    statics: {
        compSpecificIsDomOnlyOverride: () => false,
        getComponentSkins: () => skinsJson,
        compType: 'wysiwyg.viewer.components.FiveGridLine'
    },
    getSkinProperties() {
        const borderTopWidth = _.get(this.props.theme, 'style.properties.lnw', null)
        const rotationYOffset = borderTopWidth !== null ? `${parseFloat(borderTopWidth) / 2}px` : 'center'
        const isLegacyFullScreen = _.get(this.props.compProp, 'fullScreenModeOn', false)
        const isForced3DSkin = _.includes(force3Dskins, this.props.skin)

        return {
            '': _.assign({
                    'data-border-width': borderTopWidth,
                    style: {
                        transformOrigin: `center ${rotationYOffset}`
                    }
                },
                isLegacyFullScreen ? {
                    'data-legacy-full-screen': true
                } : {},
                isForced3DSkin ? {
                    'data-force-3d': true
                } : {})
        }
    }
})

module.exports = FiveGridLine