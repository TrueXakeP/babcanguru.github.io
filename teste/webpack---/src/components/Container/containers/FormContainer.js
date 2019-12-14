'use strict'
const _ = require('lodash')
const inlineContentMixin = require('../../../mixins/inlineContentMixin')
const scrollMixin = require('../../../mixins/scrollMixin/scrollMixin')
const skinsJson = require('../skins/skins.json')
const skinBasedComp = require('../../../mixins/skinBasedComp')
const createReactClass = require('create-react-class')

const skins = _.pick(skinsJson, ['wysiwyg.viewer.skins.FormContainerSkin'])

module.exports = createReactClass({
    displayName: 'FormContainer',
    mixins: [skinBasedComp(skins), scrollMixin, inlineContentMixin],
    statics: {
        compType: 'wysiwyg.viewer.components.FormContainer'
    },
    getSkinProperties() {
        const preventSubmit = e => e.preventDefault()
        return {
            '': {
                style: {}
            },
            form: {
                onSubmit: preventSubmit,
                children: this.getChildrenRenderer({
                    contentSkinPartId: 'form'
                })
            }
        }
    }
})