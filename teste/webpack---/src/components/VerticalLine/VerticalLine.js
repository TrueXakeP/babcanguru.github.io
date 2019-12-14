'use strict'
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const skinsJson = require('./skins/skins.json.js')
const skinBasedComp = require('../../mixins/skinBasedComp')
const createReactClass = require('create-react-class')

const getComponentSkins = () => skinsJson

const VerticalLine = createReactClass({
    displayName: 'VerticalLine',

    propTypes: {
        isResponsive: santaTypesDefinitions.RendererModel.isResponsive
    },

    mixins: [skinBasedComp(getComponentSkins())],

    statics: {
        useSantaTypes: true,
        getComponentSkins,
        compType: 'wysiwyg.viewer.components.VerticalLine'
    },

    getSkinProperties() {
        return {
            '': {
                'data-is-responsive': this.props.isResponsive
            }
        }
    }
})

module.exports = VerticalLine