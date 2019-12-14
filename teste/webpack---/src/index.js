'use strict'

const _ = require('lodash')
const components = require('./components/components')
const animatableMixin = require('./mixins/animatableMixin')
const animationsMixin = require('./mixins/animationsMixin')
const buttonMixin = require('./mixins/buttonMixin')
const compActionMixin = require('./mixins/compActionMixin')
const baseCompMixin = require('./mixins/baseCompMixin')
const inlineContentMixin = require('./mixins/inlineContentMixin')
const fixedPositionContainerMixin = require('./mixins/fixedPositionContainerMixin')
const pinnedLayerHelper = require('./utils/pinnedLayerHelper')
const lightboxLayerHelper = require('./utils/lightboxLayerHelper')
const skinInfoMixin = require('./mixins/skinInfoMixin')
const animationsQueueHandler = require('./utils/animationsQueueHandler')
const createChildComponentUtils = require('./utils/createChildComponentUtils')
const fixInvalidStyles = require('./utils/fixInvalidStyles')
const collectFontsFromLoadedCompStyles = require('./utils/skins/collectFontsFromLoadedCompStyles')
const skinRenderer = require('./utils/skins/skinRenderer')
const styleNodeUtils = require('./utils/styleNodeUtils')
const withBehaviors = require('./HOC/withBehaviors')
const scrollMixin = require('./mixins/scrollMixin/scrollMixin')
const timersMixins = require('./mixins/timersMixins')
const textCompMixin = require('./mixins/textMixins/textCompMixin')
const textComponentsUtils = require('./utils/text/textComponentsUtils')
const infra = require('./infra')
const SantaComponent = require('./baseComponents/SantaComponent')

module.exports = _.merge({}, infra, {
    components,
    mixins: {
        animatableMixin,
        animationsMixin,
        buttonMixin,
        compActionMixin,
        baseCompMixin: baseCompMixin.baseComp,
        inlineContentMixin,
        fixedPositionContainerMixin,
        skinInfoMixin,
        scrollMixin,
        timersMixins,
        textCompMixin
    },
    utils: {
        skinsRenderer: skinRenderer,
        styleNodeUtils,
        collectFontsFromLoadedCompStyles,
        animationsQueueHandler,
        createChildComponentUtils,
        fixInvalidStyles,
        textComponentsUtils,
        pinnedLayerHelper,
        lightboxLayerHelper
    },
    HOC: {
        withBehaviors
    },
    SantaComponent
})