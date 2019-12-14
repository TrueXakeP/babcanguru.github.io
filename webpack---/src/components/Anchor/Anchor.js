'use strict'

const skinsJson = require('./skins/skins.json.js')
const createReactClass = require('create-react-class')
const skinBasedComp = require('../../mixins/skinBasedComp')

const getComponentSkins = () => skinsJson

const Anchor = createReactClass({
    displayName: 'Anchor',

    mixins: [skinBasedComp(getComponentSkins())],

    statics: {
        useSantaTypes: true,
        getComponentSkins,
        compType: 'wysiwyg.common.components.anchor.viewer.Anchor'
    },

    getSkinProperties() {
        return {
            '': {
                tabIndex: -1,
                role: 'region',
                'aria-label': this.props.compData.name,
                children: '\u00A0' // Add space char for screen readers to be able to read aria label of the anchor
            }
        }
    }
})

module.exports = Anchor