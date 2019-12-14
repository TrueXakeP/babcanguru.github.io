'use strict'

const santaTypesDefinitions = require('./definitions/santaTypesDefinitions')
const santaTypesUtils = require('./utils/santaTypesUtils')
const compStateMixin = require('./mixins/compStateMixin')
const textScaleMixin = require('./mixins/textMixins/textScaleMixin')
const withHandleAction = require('./HOC/withEventHandlers')
const skinBasedComp = require('./mixins/skinBasedComp')
const inputFocusMixin = require('./mixins/inputFocusMixin')
const runTimeCompData = require('./mixins/runTimeCompData')
const validatableMixin = require('./mixins/validatableMixin')
const validatableWithSyncMixin = require('./mixins/validatableWithSyncMixin')
const createReactElement = require('./utils/createReactElement')
const createSantaTypesDefinitions = require('./utils/createSantaTypesDefinitions')
const imageClientApi = require('image-client-api/dist/imageClientApi')
const santaCoreUtils = require('santa-core-utils')

module.exports = {
    HOC: {
        withHandleAction
    },
    mixins: {
        compStateMixin,
        inputFocusMixin,
        runTimeCompData,
        skinBasedComp,
        textScaleMixin,
        validatableMixin,
        validatableWithSyncMixin
    },
    santaTypesDefinitions,
    utils: {
        imageClientApi,
        createReactElement,
        createSantaTypesDefinitions,
        santaTypesUtils
    },
    constants: {
        MEDIA: santaCoreUtils.mediaConsts,
        SITE: santaCoreUtils.siteConstants
    }
}