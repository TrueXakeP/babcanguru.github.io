const _ = require('lodash')
const loading = require('../gen/init/loading')
const {
    getLanguageCode
} = require('./init/multilingual')
const supportedLanguages = require('../gen/supportedLanguages')
const {
    createFunctionLibrary
} = require('./init/initFunctionLibrary')
const storageFactory = require('./init/utils/storageFactory')
const {
    getRuntimeStoreDefaultValue,
    getRuntimeEventsStoreDefaultValue
} = require('./init/utils/runtimeStoreUtils')

const {
    updateHistory
} = require('./init/functionLibrary/navigationLib')
const {
    initSeoWrapper
} = require('./aspects/seo/seoComponentsWrapperFactory')
const noop = () => {}

const getMasterPage = components => ({
    [components.MasterPage.compType]: components.MasterPage
})

const getBoltComponentsMap = boltComponents => Object.values(boltComponents)
    .filter(comp => comp.compType)
    .reduce((acc, compClass) => ({
        [compClass.compType]: compClass,
        ...acc
    }), {})

const getCompClasses = (compClasses, {
    components
}, boltComponents) => {
    const compTypesToClasses = compClasses || getMasterPage(components) //santa-components are registered through selectiveDownload, but we need masterPage early
    const overrides = {
        [components.ThemeRendererWithFonts.compType]: components.ThemeRendererWithFonts,
        ...getBoltComponentsMap(boltComponents)
    }
    return { ...compTypesToClasses,
        ...overrides,
        div: 'div'
    }
}

function createInitialTranslations(translations) {
    return supportedLanguages.reduce((acc, languageCode) => {
        const languageTranslation = translations[languageCode]
        const emptyMap = {
            data: {
                document_data: {}
            }
        }
        return { ...acc,
            [languageCode]: languageTranslation || emptyMap
        }
    }, {})
}

function isStorageSupported() {
    try {
        window.localStorage.setItem('', '')
        window.localStorage.removeItem('')
        return true
    } catch (exception) {
        return false
    }
}

// TODO group all these inputs into meaningful sub models
/*eslint fp/no-mutation:0*/
const init = ({
    logger,
    sentry,
    hostInstanceBatchingStrategy,
    boltInstanceBatchingStrategy,
    functionLibrary,
    renderingPlugins,
    ssrModel,
    rendererModel,
    publicModel,
    documentServicesModel,
    serviceTopology,
    requestModel,
    rawSeoTags,
    tpaSeoInfoServiceUrl,
    analyticsTrackers,
    rawUrl,
    wixBiSession,
    isPreview,
    reportBeatEvent,
    registerToIframesLoadEvent,
    isBot,
    isDebug,
    isQA,
    santaBase,
    boltBase,
    compClasses,
    bootstrapPackages,
    renderFlags
}) => {
    const {
        fetch,
        flattenStructure,
        addPageStructureAndData,
        requireFn,
        requireSync,
        reportActionStart,
        reportActionEnd,
        requireTPANativeCode,
        getQueryParamValue,
        parseQueryParams,
        stringifyQuery,
        isHttps,
        removeApps,
        prefersReducedMotion
    } = functionLibrary
    const {
        isStreaming,
        isInSSR,
        boltInstanceFunctionLibrary = {},
        exceptionHandlingApi
    } = ssrModel
    //I hate this
    const disableApp = getQueryParamValue(rawUrl, 'disableApp')
    const disableDataBinding = disableApp && disableApp.toLowerCase().includes('databinding')
    rendererModel.clientSpecMap = removeApps(rendererModel.clientSpecMap, disableApp)

    // I hate this 2
    const forceResponsive = getQueryParamValue(rawUrl, 'forceResponsive')
    if (forceResponsive === 'true') {
        _.set(rendererModel, ['siteMetaData', 'isResponsive'], true)
    }

    const forceMobileView = getQueryParamValue(rawUrl, 'showMobileView') === 'true'

    const mainRModel = {
        isPreview,
        additionalStructures: {},
        pagesToLoad: [],
        pagesJsonFileName: {},
        pageRawContent: {},
        packages: bootstrapPackages || {},
        loadedComponents: {},
        sitemapQueries: {},
        boltInstance: null,
        rendererModel,
        publicModel,
        documentServicesModel,
        serviceTopology,
        requestModel,
        navigationModel: {
            rawUrl,
            prevParsedUrl: null,
            navigationInfos: {},
            pendingDynamicPageInfo: null,
            boltInstanceNavigateCallback: null,
            boltInstanceRetryNavigateCallback: null,
            navigationErrorCallbacks: []
        },
        pagesLoadingModel: {
            additionalPagesToLoad: {},
            sitePagesVersion: 0
        },
        ssrModel: {
            warmupPackages: {},
            isStreaming,
            ssrSucceeded: false,
            doneWarmup: false,
            serverMarkup: '',
            isInSSR,
            warmupData: null
        },
        platformModel: {
            compsToExcludeFromRMI: ['SITE_PAGES', 'PAGES_CONTAINER', 'masterPage'],
            disableDataBinding,
            platformContextCounter: 1,
            wixCode: {
                cacheKiller: {}
            }
        },
        appInstanceMap: {},
        workerBuffers: {},
        animationManager: null,
        warmupAnimationsStarted: false,
        isBot,
        isDebug,
        isQA,
        santaBase,
        boltBase,
        workers: {},
        inEditMode: rendererModel.previewMode,
        pagesDataItemsMap: {},
        workersState: {},
        standbyWorker: null,
        iframeWorkerWrapper: {},
        storage: storageFactory.get(isStorageSupported()),
        wixBiSession,
        forceMobileView
    }

    return new Promise(resolve => {
        const createHostInstanceReportId = reportActionStart('createHostInstance')

        const stageResolvers = {}
        // eslint-disable-next-line promise/param-names
        const doneStagePromise = new Promise((doneStageResolved, doneStageRejected) => {
            stageResolvers.doneStageResolved = doneStageResolved
            stageResolvers.doneStageRejected = doneStageRejected
        })

        const hostInstance = loading(
            mainRModel, {
                createBoltInstance: payload => {
                    const {
                        isExperimentOpen,
                        boltMain,
                        santaComponents,
                        boltComponents,
                        initialPages,
                        isMobileView,
                        mobileDeviceAnalyzer,
                        hostApi,
                        navigationInfos,
                        currentUrl,
                        viewerModel,
                        platformModel,
                        storage,
                        callback
                    } = payload

                    const pages = _.sortBy(initialPages, v => v.structure.masterPage ? 1 : 0) //see test BOLT-830
                    const initialPageData = _.reduce(pages, _.merge, {
                        structure: {},
                        data: {},
                        translations: {},
                        meshData: {}
                    })

                    const translations = createInitialTranslations(initialPageData.translations)
                    const {
                        structure,
                        data,
                        meshData
                    } = initialPageData

                    // remove this line when merge sv_multilingualSubDomains
                    const currentLanguage = isExperimentOpen('sv_multilingualSubDomains') ?
                        _.get(rendererModel, 'sitePropertiesInfo.multilingualInfo.languageCode') :
                        getLanguageCode(getQueryParamValue(rawUrl, 'lang'), rendererModel.sitePropertiesInfo)

                    const boltInitialModel = {
                        sentry,
                        storage,
                        currentLanguage,
                        documentServicesModel,
                        initialClientSpecMap: rendererModel.clientSpecMap,
                        navigationInfos,
                        currentUrl,
                        structure,
                        data,
                        loadedFonts: {},
                        translations,
                        meshData,
                        serviceTopology,
                        rendererModel,
                        publicModel,
                        rawSeoTags,
                        tpaSeoInfoServiceUrl,
                        analyticsTrackers,
                        viewerModel,
                        compClasses: getCompClasses(compClasses, santaComponents, boltComponents),
                        activeModes: {},
                        templatesRefs: {},
                        runtime: getRuntimeStoreDefaultValue(),
                        runtimeEvents: getRuntimeEventsStoreDefaultValue(),
                        isMobileView,
                        mobileDeviceAnalyzer,
                        wixBiSession,
                        reportBeatEvent,
                        renderFlags,
                        isQA,
                        ssrModel: {
                            isInSSR,
                            isClientAfterSSR: isStreaming,
                            isFirstRenderAfterSSR: false
                        },
                        rootStyleIds: ['CSS_CONTAINER'],
                        rootCompIds: ['BOLT_SITE'],
                        getWindowObject: isInSSR ? noop : () => window,
                        requestModel,
                        santaBase,
                        boltBase,
                        platformModel,
                        viewModeSwitchCount: {
                            count: 0
                        }
                    }

                    const createBoltInstanceReportId = reportActionStart('createBoltInstance')
                    logger.log('creating bolt instance', performance.now())

                    const boltInstance = boltMain.default.createBoltInstance(
                        boltInitialModel,
                        boltInstanceBatchingStrategy,
                        renderingPlugins,
                        hostApi,
                        logger, {
                            fetch,
                            flattenStructure,
                            prefersReducedMotion,
                            addPageStructureAndData,
                            isHttps,
                            stringifyQuery,
                            requireFn,
                            requireSync,
                            reportActionStart,
                            reportActionEnd,
                            captureError: logger.captureError,
                            interactionStarted: logger.interactionStarted,
                            interactionEnded: logger.interactionEnded,
                            requireTPANativeCode,
                            parseQueryParams,
                            ...boltInstanceFunctionLibrary,
                            ...rendererModel.seo ? {
                                wrapWithHostHOC: initSeoWrapper(boltComponents)
                            } : {}
                        },
                        exceptionHandlingApi
                    )

                    logger.log('created bolt instance', performance.now())
                    reportActionEnd(createBoltInstanceReportId)

                    if (!isInSSR) {
                        window.boltInstance = boltInstance
                        if (navigationInfos.primaryPage.replaceHistory) {
                            updateHistory(navigationInfos, currentUrl.full, currentUrl.protocol)
                        }
                        if (window.location.hash.startsWith('#!') && window.location.hash !== '#!') {
                            logger.captureError(new Error('received hashbang url'), {
                                extras: {
                                    href: window.location.href,
                                    referrer: document.referrer
                                }
                            })
                        }

                        if (sentry.onLoad) {
                            sentry.onLoad(() => {
                                boltInstance.setSentry(window.Sentry)
                            })
                        }
                    }

                    callback(boltInstance)
                    resolve({
                        boltInstance,
                        boltMain: boltMain.default,
                        doneStagePromise
                    })
                },
                done: (boltMain, boltInstance, ssrSucceeded, serverMarkup, warmupUtils, workers) => {
                    if (isInSSR) {
                        Object.values(workers).forEach(worker => worker.terminate())
                    }

                    stageResolvers.doneStageResolved({
                        hostInstance,
                        boltInstance,
                        boltMain: boltMain.default,
                        serverMarkup,
                        hydrate: ssrSucceeded,
                        indicator: warmupUtils.indicator
                    })
                },
                onSsrRouteRedirect: redirectPayload => resolve({
                    redirectPayload
                }),
                reportBeatEvent,
                registerToIframesLoadEvent,
                ...functionLibrary
            },
            hostInstanceBatchingStrategy
        )
        reportActionEnd(createHostInstanceReportId)

        if (!isInSSR) {
            window.hostInstance = hostInstance
            functionLibrary.requireFn('zepto', $ => {
                $(() => {
                    const {
                        warmupData
                    } = window
                    if (isStreaming && warmupData) {
                        const {
                            // userWarmup,
                            currentUrl,
                            rootNavigationInfo
                        } = window.warmupData
                        hostInstance.setParsedUrl(currentUrl)
                        if (rootNavigationInfo) {
                            hostInstance.setNavigationInfos(Object.assign({
                                primaryPage: rootNavigationInfo
                            }, hostInstance.navigationInfos))
                        }
                        // hostInstance.setUserWarmup(userWarmup)
                        hostInstance.setWarmupData(warmupData)
                    } else {
                        hostInstance.setWarmupData({
                            runtime: 'EMPTY'
                        })
                    }
                })
            })
        }
    })
}

module.exports = {
    init,
    createFunctionLibrary
}