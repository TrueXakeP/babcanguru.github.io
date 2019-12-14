const _ = require('lodash')
const {
    mapLanguageCodeToName
} = require('santa-multilingual/dist/languages')
const {
    WorkerStates
} = require('./platformInitConstants')
const {
    getContextId
} = require('santa-renderer/src/utils/contextIdUtils')
const {
    sendBootstrapBIEvent
} = require('../../bi/platformBI')

const buildScriptsSources = (serviceTopology, options = {}) => {
    const namespacesSdkSource = `${serviceTopology.scriptsLocationMap['wixcode-namespaces']}/${
        options.isDebug ? 'wixcode-namespaces.js' : 'wixcode-namespaces.min.js'}`
    const externalComponentsSource = `${serviceTopology.scriptsLocationMap['wix-ui-santa']}/wixcode/${
        options.isDebug ? 'wixcode-components.js' : 'wixcode-components.min.js'}`
    const wixCodeNamespacesAndElementorySupportSource = `${serviceTopology.scriptsLocationMap['wix-code-platform']}/wixCodeNamespacesAndElementorySupport.min.js`
    return {
        namespacesSdkSource,
        externalComponentsSource,
        wixCodeNamespacesAndElementorySupportSource
    }
}

const getBiSessionData = ({
    wixBiSession,
    rendererModel,
    currentUrl
}) => {
    const {
        viewerSessionId,
        visitorId,
        siteMemberId,
        random,
        coin,
        pn,
        requestId,
        initialTimestamp,
        initialRequestTimestamp,
        ssrRequestTimestamp,
        isCached
    } = wixBiSession
    const {
        metaSiteId,
        userId
    } = rendererModel
    const {
        isqa,
        suppressbi,
        sampleratio
    } = _.get(currentUrl, 'query', {})
    const isQueryParamOn = param => param && param !== 'false'
    const muteBi = isQueryParamOn(isqa) || isQueryParamOn(suppressbi)

    return {
        metaSiteId,
        viewerSessionId,
        visitorId,
        siteMemberId,
        requestId,
        ownerId: userId,
        pageLoadStart: initialTimestamp,
        networkPageLoadStart: initialRequestTimestamp,
        ssrRequestTimestamp,
        pageNumber: pn,
        random,
        coin,
        muteBi: Boolean(muteBi),
        sampleRatioState: sampleratio,
        isCached
    }
}

const getBootstrapMessage = payload => {
    const {
        serviceTopology,
        rendererModel,
        applications,
        wixBiSession,
        wixCodeBase,
        openExperiments,
        csrfToken,
        sdkParameters,
        isDebug,
        storage,
        currentUrl
    } = payload

    const {
        namespacesSdkSource,
        externalComponentsSource,
        wixCodeNamespacesAndElementorySupportSource
    } = buildScriptsSources(serviceTopology, {
        isDebug
    })

    const bootstrapArguments = {
        sdkParameters: {
            ...sdkParameters,
            storage: storage.serialize()
        },
        debug: false, //!!(window && window.__WIX_CODE_DEBUG__),
        santaVersion: '1.6599.7', // TODO: get the real santa version
        wixCodeBase,
        namespacesSdkSource,
        externalComponentsSource,
        applications: JSON.stringify(applications), //: '[{"type":"Application","id":"dataBinding","displayName":"Application","url":"https://static.parastorage.com/services/dbsm-viewer-app/1.336.0/app.js"}]',
        wixCodeNamespacesAndElementorySupportSource,
        openExperiments,
        isDebug,
        csrfToken,
        biSessionData: getBiSessionData({
            wixBiSession,
            rendererModel,
            currentUrl
        })
    }
    return bootstrapArguments
}

const getContextIdFromNavInfo = ({
        pageId: mainRootId,
        innerRoute,
        tpaInnerRoute,
        platformGoToEditorCounter,
        queryParams: {
            lang = ''
        } = {}
    }) =>
    getContextId({
        mainRootId,
        innerRoute,
        tpaInnerRoute,
        lang,
        platformGoToEditorCounter
    })

const toQueryParams = obj => {
    const keys = Object.keys(obj)
    return keys.map(key => `${key}=${obj[key]}`).join('&')
}

const script_import_message = (worker, url, script) => {
    script = script.slice(0)
    worker.postMessage({
        type: 'script_import_message',
        url,
        script
    }, [script]) // this is not a mistake
}

const sendWorkerMessage = (worker, message, contextId, stateName, workerStateMap, setWorkerState) => {
    if (workerStateMap[contextId] && workerStateMap[contextId][stateName]) {
        return false //message already sent
    }
    worker.postMessage(message)
    setWorkerState(contextId, stateName, true)
    return true
}
const sendBootstrapMessage = (worker, message, contextId, stateName, workerStateMap, setWorkerState, wixBiSession, primaryPageId) => {
    const didSendMessage = sendWorkerMessage(worker, message, contextId, stateName, workerStateMap, setWorkerState)
    if (didSendMessage) {
        sendBootstrapBIEvent(wixBiSession, message, primaryPageId)
    }
}

const fetchScriptAndSendPostMessage = (worker, fetch, url, sendMessageFunc) => {
    fetch(url, null, 'arrayBuffer', script => sendMessageFunc(worker, url, script))
}

const stopWorkers = (workersToStop, setWorker, setWorkerState) => {
    for (const contextId in workersToStop) {
        if (workersToStop.hasOwnProperty(contextId)) {
            //this message actually asks the worker to self terminate
            workersToStop[contextId].postMessage({
                contextId,
                type: 'stop'
            })
            //TODO: we should probably add a terminated state
            setWorker(contextId, undefined)
            setWorkerState(contextId, WorkerStates.BOOTSTRAP, undefined)
            setWorkerState(contextId, WorkerStates.USER_CODE, undefined)
            setWorkerState(contextId, WorkerStates.LOAD, undefined)
        }
    }
}
const stopIframes = (iframesToStop, setIframe, setWorkerState) => {
    for (const contextId in iframesToStop) {
        if (iframesToStop.hasOwnProperty(contextId)) {
            iframesToStop[contextId].terminate()
            setIframe(contextId, undefined)
            setWorkerState(contextId, WorkerStates.BOOTSTRAP, undefined)
            setWorkerState(contextId, WorkerStates.USER_CODE, undefined)
            setWorkerState(contextId, WorkerStates.LOAD, undefined)
        }
    }
}

const getDeviceType = mobileDeviceAnalyzer => {
    if (mobileDeviceAnalyzer) {
        if (mobileDeviceAnalyzer.isMobileDevice()) {
            return 'mobile'
        }
        if (mobileDeviceAnalyzer.isTabletDevice()) {
            return 'tablet'
        }
        return 'desktop'
    }
    return null
}

const getReferrer = () => typeof window === 'undefined' || !window.document ? '' : window.document.referrer
const getNavigatorLocale = () => typeof navigator !== 'undefined' ? navigator.language : null

const obtainWorker = (createWorker, setCurrentContextWorker, releaseStandByWorker, getStandByWorker) => {
    const standByWorker = getStandByWorker()
    if (standByWorker) {
        setCurrentContextWorker(standByWorker)
        releaseStandByWorker()
        return
    }
    createWorker(setCurrentContextWorker)
}

const getIframeUrlWithWixCode = (wixCodeInstanceId, cloudBaseDomain, boltVersion) => `//${wixCodeInstanceId}.dev.${cloudBaseDomain}/_partials/wix-bolt${boltVersion}/node_modules/viewer-platform-worker/workerIframeWrapper.html`

const getIframeUrlWithoutWixCode = (serverName, boltVersion) => `//editor.${serverName}/_partials/wix-bolt${boltVersion}/node_modules/viewer-platform-worker/workerIframeWrapper.html`

const getElementoryPreviewBaseUrl = (wixCodeInstanceId, cloudBaseDomain) => `//${wixCodeInstanceId}.dev.${cloudBaseDomain}`

//TODO: send BI - we want to migrate this shit
const sendBiOnDprecated = appDefId => appDefId

module.exports = {
    obtainWorker,
    getBootstrapMessage,
    buildScriptsSources,
    toQueryParams,
    script_import_message,
    sendWorkerMessage,
    sendBootstrapMessage,
    getDeviceType,
    getReferrer,
    getNavigatorLocale,
    mapLanguageCodeToName,
    fetchScriptAndSendPostMessage,
    stopWorkers,
    stopIframes,
    getIframeUrlWithWixCode,
    getIframeUrlWithoutWixCode,
    getContextIdFromNavInfo,
    sendBiOnDprecated,
    getBiSessionData,
    getElementoryPreviewBaseUrl
}