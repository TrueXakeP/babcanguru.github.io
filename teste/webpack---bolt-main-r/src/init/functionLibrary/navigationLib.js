const _ = require('lodash')
const isCurrentLocation = url => url.replace(/https?:/, '') === window.location.href.replace(/https?:/, '')

const setManualScrollRestoration = isManual => {
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = isManual ? 'manual' : 'auto'
    }
}

const updateHistory = (navInfo, url, protocol) => {
    const primaryPage = navInfo.primaryPage
    const {
        skipHistory = false, replaceHistory = false
    } = primaryPage
    const latestScrollY = window.pageYOffset
    if (replaceHistory) {
        window.history.replaceState(null, primaryPage.title, url.replace(/https?:/, protocol))
    } else if (!skipHistory && !isCurrentLocation(url)) {
        window.history.replaceState({
            latestScrollY
        }, document.title, window.location.href)
        window.history.pushState(null, primaryPage.title, url.replace(/https?:/, protocol))
    }
}

const updateContext = (boltInstance, platformModel) => {
    const api = platformModel.wixCodeAppApi
    _.forOwn(api, (contextApi, contextId) => boltInstance.setAppApi(contextId, { ...{},
        ...contextApi
    }))

    boltInstance.setCurrentContexts(_.cloneDeep(platformModel.currentContexts))
    boltInstance.setContextsMap(_.cloneDeep(platformModel.contextsMap))
    boltInstance.setHasPlatform(_.cloneDeep(platformModel.hasPlatform))
}

module.exports = {
    initiateNavigation(setNavigationInfos, setPendingDynamicPageInfo, setBoltInstanceNavigateCallback, setBoltInstanceRetryNavigateCallback, setBoltInstanceNavigationErrorCallbacks, callback, retryCallback, navigationErrorCallbacks, navInfos) {
        if (!navInfos.primaryPage.pageId && navInfos.primaryPage.routerDefinition) {
            setPendingDynamicPageInfo(navInfos)
        } else {
            setNavigationInfos(navInfos)
        }
        setBoltInstanceNavigateCallback(callback)
        setBoltInstanceRetryNavigateCallback(retryCallback)
        setBoltInstanceNavigationErrorCallbacks(navigationErrorCallbacks)
    },
    listenToHistory: (warmupUtils, getResolvedSiteData, setNavigationInfos, isInSSR, shouldRestoreScroll) => {
        if (!isInSSR) {
            window.onpopstate = event => {
                const url = window.location.href
                const navigationInfo = warmupUtils.wixUrlParser.parseUrl(getResolvedSiteData(), url)
                navigationInfo.skipHistory = true
                if (shouldRestoreScroll) {
                    navigationInfo.shouldDisableScrollToTop = true
                    navigationInfo.restoreScrollTo = event.state && event.state.latestScrollY
                    if (navigationInfo.restoreScrollTo) {
                        setManualScrollRestoration(true)
                    }
                }
                setNavigationInfos({
                    primaryPage: navigationInfo
                })
            }
        }
    },
    updateHistory,
    setManualScrollRestoration,
    donePreparingNavigation: (
        boltInstance,
        navInfos,
        url,
        urlAsObj,
        boltInstanceNavigationCallback,
        setParsedUrl,
        stopWorkersFunction,
        platformModel,
        stopIframeWorkerFunction,
        isPreview
    ) => {
        if (!boltInstanceNavigationCallback) {
            return
        }
        //TODO: we need this becasue the dataRequirementState is changing to false and then back to true which triggers navigation again..
        const prevNavInfos = boltInstance.$model.navigationInfos
        if (_.isEqual(navInfos, prevNavInfos)) {
            return
        }
        if (isPreview) {
            stopIframeWorkerFunction()
        } else {
            stopWorkersFunction()
        }
        setParsedUrl(urlAsObj)

        //we assume here that we cannot navigate to both popup and page and the same time
        if (!navInfos.popupPage) {
            updateHistory(navInfos, url, window.location.protocol)
        }

        boltInstance.setCurrentUrl(_.cloneDeep(urlAsObj))
        //we set each platform part separately cause it seems there is a bug in carmi
        updateContext(boltInstance, platformModel)
        // boltInstance.setPlatformModel(clonePlatormModel(platformModel))
        boltInstanceNavigationCallback(_.cloneDeep(navInfos))
    },
    reloadIframeWorkerWrapper: (
        boltInstance,
        platformModel,
        stopIframeWorkerFunction
    ) => {
        const prevPlatformContextCounter = boltInstance.$model.platformDSCommunicationAspect.platformContextCounter
        const newPlatformContextCounter = platformModel.platformContextCounter
        if (prevPlatformContextCounter !== newPlatformContextCounter) {
            boltInstance.setPlatformEditorPreviewContextCounter(newPlatformContextCounter)
            stopIframeWorkerFunction()
            updateContext(boltInstance, platformModel)
        }
    }
}