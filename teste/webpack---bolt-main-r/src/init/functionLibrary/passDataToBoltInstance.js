module.exports = {
    setAnimationsManagerOnBoltInstance: (boltInstance, animationManager, warmupAnimationsStarted, stopWarmupAnimations) => {
        stopWarmupAnimations()
        boltInstance.setAnimationManager(animationManager)
    },

    setPendingRuntimeOnBoltInstance: (boltInstance, runtime, tpaWidgetNativeInitData) => {
        boltInstance.setPendingRuntime(runtime)
        boltInstance.setTPAWidgetNativeCompPropsInitData(tpaWidgetNativeInitData)
    }
}