const tweenEngine = require('santa-core-utils/dist/cjs/coreUtils/tweenEngine/tweenEngine')
const {
    init: initAnimations
} = require('./warmup/animation')
const {
    AnimationManager
} = require('./AnimationManager/AnimationManager')

const onDomReady = fn => {
    if (document.readyState === 'loading') {
        window.document.addEventListener('DOMContentLoaded', fn)
    } else {
        Promise.resolve().then(fn)
    }
}

let warmupAnimationAPI = null // eslint-disable-line santa/no-module-state

const runWarmupAnimations = ({
        'santa-animations': santaAnimations,
        TweenMax,
        TimelineMax
    }, viewMode, prefersReducedMotion, setAnimationManager, setAnimationsStarted) =>
    onDomReady(() => {
        const tweenEngineAndFactory = tweenEngine.create(TweenMax, TimelineMax)
        const animationManager = new AnimationManager({
            santaAnimations,
            tweenEngineAndFactory
        }, viewMode)
        const model = window.warmupData && !prefersReducedMotion ? window.warmupData.animationData || {} : {}
        const pageId = window.rootNavigationInfo ? window.rootNavigationInfo.pageId : ''
        const hasAnimationData = !!Object.keys(model).length

        warmupAnimationAPI = initAnimations({
            manager: animationManager,
            model,
            pageId
        })

        if (hasAnimationData) {
            warmupAnimationAPI.start()
            setAnimationsStarted(true)
        }

        setAnimationManager(animationManager)
    })

const stopWarmupAnimations = () => warmupAnimationAPI && warmupAnimationAPI.stop()

module.exports = {
    runWarmupAnimations,
    stopWarmupAnimations
}