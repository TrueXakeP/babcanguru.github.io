'use strict'

// Base animations
/**
 * @typedef {{defaults: *[], mobile: *[]}} AnimationsDefinitions
 * @type {AnimationsDefinitions}
 */
const definitions = {
    defaults: [
        require('./base/sequence/baseSequence'),
        require('./base/baseNone'),
        require('./base/baseFade'),
        require('./base/basePosition'),
        require('./base/baseScale'),
        require('./base/baseSkew'),
        require('./base/baseRotate'),
        require('./base/baseRotate3D'),
        require('./base/baseClip'),
        require('./base/baseClipPath'),
        require('./base/baseDimensions'),
        require('./base/baseScroll'),
        require('./base/baseAttribute'),
        require('./base/baseObjectProperties'),
        require('./base/baseClear'),
        // General Animations
        require('./animation/atoms/fade'),
        require('./animation/atoms/position'),
        require('./animation/atoms/scale'),
        require('./animation/atoms/rotate'),
        require('./animation/atoms/sequence'),
        require('./animation/atoms/clearSequence'),
        // In Animations
        require('./animation/in/defaults/arcIn'),
        require('./animation/in/defaults/dropIn'),
        require('./animation/in/defaults/expandIn'),
        require('./animation/in/defaults/fadeIn'),
        require('./animation/in/defaults/flipIn'),
        require('./animation/in/defaults/floatIn'),
        require('./animation/in/defaults/flyIn'),
        require('./animation/in/defaults/foldIn'),
        require('./animation/in/defaults/reveal'),
        require('./animation/in/defaults/slideIn'),
        require('./animation/in/defaults/spinIn'),
        require('./animation/in/defaults/turnIn'),
        require('./animation/in/defaults/bounceIn'),
        require('./animation/in/defaults/glideIn'),
        // Out Animations
        require('./animation/out/arcOut'),
        require('./animation/out/popOut'),
        require('./animation/out/collapseOut'),
        require('./animation/out/fadeOut'),
        require('./animation/out/flipOut'),
        require('./animation/out/floatOut'),
        require('./animation/out/flyOut'),
        require('./animation/out/foldOut'),
        require('./animation/out/conceal'),
        require('./animation/out/slideOut'),
        require('./animation/out/spinOut'),
        require('./animation/out/turnOut'),
        require('./animation/out/bounceOut'),
        require('./animation/out/glideOut'),
        // Mode Transition Animations
        require('./animation/modes/ModesMotionNoScale'),
        require('./animation/modes/ModesMotionNoDimensions'),
        require('./animation/modes/ModesMotionScale'),
        // Background Scroll Effects
        require('./animation/backgroundScrollEffects/siteBackgroundParallax'),
        require('./animation/backgroundScrollEffects/backgroundReveal'),
        require('./animation/backgroundScrollEffects/backgroundParallax'),
        require('./animation/backgroundScrollEffects/backgroundZoom'),
        require('./animation/backgroundScrollEffects/backgroundFadeIn'),
        require('./animation/backgroundScrollEffects/backgroundBlurIn'),
        // Component specific animations
        require('./animation/componentAnimations/headerHideToTop'),
        require('./animation/componentAnimations/HeaderFadeOut'),
        // Transitions
        require('./transition/noTransition.js'),
        require('./transition/crossFade'),
        require('./transition/outIn'),
        require('./transition/slideHorizontal'),
        require('./transition/slideVertical'),
        require('./transition/shrink')
    ],
    mobile: [
        // In Animations
        require('./animation/in/mobile/arcIn'),
        require('./animation/in/mobile/dropIn'),
        require('./animation/in/mobile/expandIn'),
        require('./animation/in/mobile/fadeIn'),
        require('./animation/in/mobile/flipIn'),
        require('./animation/in/mobile/floatIn'),
        require('./animation/in/mobile/flyIn'),
        require('./animation/in/mobile/foldIn'),
        require('./animation/in/mobile/reveal'),
        require('./animation/in/mobile/slideIn'),
        require('./animation/in/mobile/spinIn'),
        require('./animation/in/mobile/turnIn'),
        require('./animation/in/mobile/bounceIn'),
        require('./animation/in/mobile/glideIn'),
        require('./animation/in/mobile/dropClipIn')
    ]
}

// Return array of all the animation classes
module.exports = definitions