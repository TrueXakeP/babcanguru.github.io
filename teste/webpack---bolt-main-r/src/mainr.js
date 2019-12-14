/* globals Sentry, define */
import 'core-js/fn/object/entries'
import 'core-js/fn/object/values'
import 'intersection-observer'
import requirejs from 'requirejs'
import {
    getRjsConfig
} from './rjs-config'
import {
    _define,
    _import
} from './rjs-utils'
import * as sharedRegistry from './init/sharedRegistry'
import {
    initBeatEvents
} from './bi/initBeatEvents'
import {
    BEATS
} from './bi/constants'
import experimentFactory from 'santa-main-r/lib/lib/common/experimentFactory'
import getQueryUtils from 'santa-main-r/lib/lib/common/getQueryUtils.js'
import addExperimentsFromQuery from 'santa-main-r/lib/lib/common/addExperimentsFromQuery'
import overrideClientSpecMapScriptsFromQuery from 'santa-main-r/lib/lib/common/overrideClientSpecMapScriptsFromQuery'
import createLogger from './init/logger'
import createWorkerFactory from './init/platform/createWorker'
import createWorkerWrapperIframe from './init/platform/createWorkerWrapperIframe'
import {
    getPagesPlatformApplications
} from './init/utils/pagesPlatformApplicationsUtils'
import iframesHandler from 'bolt-server/src/warmup/iframesHandler'
import {
    loadBootstrapPackages,
    generateResourceHints,
    generateExtraResourceHints
} from './mainr-optimizations'

window.santaBase = `${window.boltBase}/node_modules/wix-santa`
const {
    rendererModel,
    publicModel,
    location,
    navigator,
    performance = {},
    isStreaming,
    serviceTopology,
    wixBiSession = {},
    boltBase,
    santaBase,
    documentServicesModel
} = window
window.wixBiSession = wixBiSession

const queryUtil = getQueryUtils(window)
window.queryUtil = queryUtil
const {
    getParameterByName,
    isParameterTrue
} = queryUtil

rendererModel.runningExperiments = addExperimentsFromQuery(rendererModel.runningExperiments, queryUtil, 'viewer')
rendererModel.pagesPlatformApplications = getPagesPlatformApplications(rendererModel)

const isPreview = typeof publicModel === 'undefined'
let cookie = '' // eslint-disable-line santa/no-module-state
let modelsFromHost = null // eslint-disable-line santa/no-module-state
try {
    cookie = document.cookie
} catch (ex) {
    console.log('Unable to get cookie from document. ', ex)
}
const requestModel = {
    userAgent: navigator.userAgent,
    cookie,
    deviceType: !isPreview && publicModel.deviceInfo ? publicModel.deviceInfo.deviceType : 'desktop'
}

const componentScriptsOverrideParam = getParameterByName('widgetsUrlOverride')
const viewerScriptOverrideParam = getParameterByName('viewerPlatformOverrides')
const controllerScriptsOverrideParam = getParameterByName('controllersUrlOverride')
const overridePlatformBaseUrlsParam = getParameterByName('overridePlatformBaseUrls')

overrideClientSpecMapScriptsFromQuery({
    clientSpecMap: rendererModel.clientSpecMap,
    viewerScriptOverrideParam,
    controllerScriptsOverrideParam,
    componentScriptsOverrideParam,
    overridePlatformBaseUrlsParam,
    scriptsLocation: serviceTopology.staticServerUrl
})

const rawUrl = location.href
const isInSSR = false

const isLocal = getParameterByName('BoltSource').search(/^https?:\/\/localhost($|:|\/)/) === 0
const isDebug = Boolean(getParameterByName('debug')) ||
    isParameterTrue('ssrDebug') ||
    isParameterTrue('carmiDebug') ||
    isLocal

const qaParam = getParameterByName('isqa')
const isQA = !!qaParam && qaParam !== 'false'
const sentry = typeof Sentry !== 'undefined' ? Sentry : {}
const logger = createLogger(sentry, {
    rendererModel,
    isPreview,
    publicModel,
    requestModel,
    rawUrl,
    boltBase,
    isInSSR,
    wixBiSession,
    documentServicesModel,
    isDebug
})
logger.appLoadingPhaseStart('mainr_loading')
const experimentInst = experimentFactory.build(window)

const noop = () => {}

window.performance = performance
window.performance.mark = performance.mark || noop
window.performance.now = performance.now || (() => Date.now())

const santaPackagesToDebug = (getParameterByName('debug') || '').split(',').filter(Boolean)

const ds = isParameterTrue('isEdited') || isParameterTrue('ds')
const rjsConfig = getRjsConfig(boltBase, santaBase, serviceTopology, {
    debug: isDebug,
    santaPackagesToDebug,
    ds,
    local: isLocal
}, experimentInst, logger)
requirejs.onError = error => {
    const {
        requireModules,
        requireType
    } = error
    logger.captureError(error, {
        tags: {
            requireModules,
            requireType
        }
    })
}

requirejs.config(rjsConfig)

define('mobx', [], () => ({
    runInAction: noop,
    action: noop,
    isObservableArray: noop
}))
define('mobx-react', [], () => ({
    observer: noop
}))

if (ds) {
    import ( /*webpackChunkName: "custom-elements"*/ './init/customElements')
}

async function initDocumentServicesDocument() {
    window.React = await _import('react')
    window.ReactDOM = await _import('react-dom')
    window.coreUtilsLib = await _import('santa-core-utils')

    const loadAllModules = Promise.all([
        import ( /*webpackChunkName: "bolt-ds-adapter"*/ 'bolt-ds-adapter'),
        import ( /*webpackChunkName: "bolt-ds-viewer-manager"*/ 'bolt-ds-viewer-manager'),
        _import('santa-data-fixer')
    ])
    const [boltDsAdapter, dsViewerManager, dataFixer] = await loadAllModules

    _define('bolt-ds-adapter-amd', [], () => boltDsAdapter)
    _define('bolt-ds-viewer-manager-amd', [], () => dsViewerManager)
    const {
        initDocumentServicesDocument: initDocument
    } = boltDsAdapter
    return initDocument(dataFixer, logger)
}

async function createDocumentServices(hostWithDM, boltInstance) {
    const loadAllModules = Promise.all([
        import ( /*webpackChunkName: "bolt-ds-adapter"*/ 'bolt-ds-adapter'),
        _import('document-services-implementation'),
        _import('coreUtils'),
        _import('document-services-schemas')
    ])
    const [boltDsAdapter, implementation, coreUtils, schemas] = await loadAllModules
    const {
        createDocumentServices: create
    } = boltDsAdapter
    const viewerManager = boltInstance.viewerManager
    return create({
        hostWithDM,
        viewerManager,
        implementation,
        schemas,
        coreUtils,
        logger
    })
}

window.define('experiment', [], () => experimentInst)
const bootstrapPackages = loadBootstrapPackages(experimentInst, requirejs)
generateResourceHints(window, boltBase, rendererModel, serviceTopology, requirejs)

requirejs(['lodash'], _ => {
    bootstrapPackages.lodash = _

    async function fetchFunction(url, options, dataType) {
        const res = await fetch(url, options || undefined)
        if (res.ok || options && options.allowErrors) {
            return res[dataType || 'json']()
        }
        throw res
    }

    let dsHost = null
    const initPromise = !ds ?
        import ( /*webpackChunkName: "init"*/ './init') :
        Promise.all([
            import ( /*webpackChunkName: "init"*/ './init'), initDocumentServicesDocument()
        ])
        .then(([initPromiseValue, {
            hostWithDM,
            fetchPage,
            modelsToApplyFromHost
        }]) => {
            modelsFromHost = modelsToApplyFromHost
            dsHost = hostWithDM
            return { ...initPromiseValue,
                fetchPageFromDs: fetchPage
            }
        })

    const boltAnimationsPromise =
        import ( /*webpackChunkName: "animations"*/ 'bolt-animations/src/warmupAnimations')
    const isBot = rendererModel.seo

    sharedRegistry.init()

    const reportBeatEvent = initBeatEvents(experimentInst, isBot)
    const {
        beatNumber,
        eventName
    } = BEATS.MAIN_R_LOADED
    reportBeatEvent(beatNumber, eventName)
    logger.appLoadingPhaseFinish('mainr_loading')
    generateExtraResourceHints(window, requirejs, experimentInst)

    initPromise.then(({
        init,
        createFunctionLibrary,
        fetchPageFromDs
    }) => {
        const ssrModel = {
            isStreaming,
            isInSSR
        }

        let inHostBatch = false
        let boltInstanceFlush = null

        const hostInstanceBatchingStrategy = function() { // eslint-disable-line func-style
            setImmediate(() => {
                inHostBatch = true
                this.$endBatch()
                inHostBatch = false
                if (boltInstanceFlush) {
                    const savedInstanceFlush = boltInstanceFlush
                    boltInstanceFlush = null
                    savedInstanceFlush()
                }
            })
        }

        const boltInstanceBatchingStrategy = function() { // eslint-disable-line func-style
            if (inHostBatch) {
                boltInstanceFlush = this.$endBatch
            } else {
                this.$endBatch()
            }
        }
        const functionLibrary = createFunctionLibrary({
            fetchFunction,
            requireFunction: requirejs,
            workerFunction: createWorkerFactory(isDebug, isInSSR, boltBase),
            workerWrapperIframe: createWorkerWrapperIframe(isDebug, isInSSR, boltBase),
            biReporter: null,
            boltAnimationsPromise,
            logger
        })

        if (fetchPageFromDs) {
            functionLibrary.fetchPageFromDs = fetchPageFromDs
        }
        return init({
            logger,
            sentry,
            ssrModel,
            hostInstanceBatchingStrategy,
            boltInstanceBatchingStrategy,
            functionLibrary,
            rendererModel: _.get(modelsFromHost, 'rendererModel') || rendererModel,
            rawSeoTags: undefined,
            documentServicesModel: _.get(modelsFromHost, 'documentServicesModel') || documentServicesModel,
            publicModel,
            isPreview,
            serviceTopology,
            requestModel,
            rawUrl,
            wixBiSession,
            reportBeatEvent,
            registerToIframesLoadEvent: iframesHandler.registerForEvents,
            renderFlags: window.renderFlags || {},
            isBot,
            isDebug,
            isQA,
            santaBase,
            boltBase,
            bootstrapPackages
        })
    }).then(({
        doneStagePromise
    }) => doneStagePromise).then(async result => {
        const isSsrSuccessfulAndSeo = result.hydrate && window.rendererModel.seo
        if (isSsrSuccessfulAndSeo) {
            return Promise.reject() //eslint-disable-line promise/no-return-wrap
        }
        const {
            hostInstance,
            boltInstance,
            boltMain,
            hydrate,
            serverMarkup,
            indicator
        } = result
        const rootElement = document.getElementById('SITE_CONTAINER')
        await boltMain.renderClientSide(boltInstance, rootElement, hydrate, serverMarkup, indicator, logger)
        hostInstance.setRenderPhase(hydrate ? 'hydrate' : 'render')
        return boltInstance
    }).then(async boltInstance => { //eslint-disable-line consistent-return
        iframesHandler.flushEvents()
        boltInstance.setReadyToFlushWindowMessages(true)
        if (ds) {
            return createDocumentServices(dsHost, boltInstance)
        }
    }).then(() => {
        logger.appLoaded()
    }).catch(e => {
        console.error(e)
        logger.captureError(e, {
            tags: {
                siteLoaded: false
            }
        })
    })
})