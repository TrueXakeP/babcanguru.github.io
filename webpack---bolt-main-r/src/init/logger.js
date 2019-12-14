const {
    getFedOpsServerLogger,
    getFedOpsClientLogger
} = require('./loggerFactory')

function getNumberOfPages(rendererModel) {
    return rendererModel.pageList.pages.length
}

function isSiteFromADI(clientSpecMap) {
    for (const key in clientSpecMap) {
        if (clientSpecMap.hasOwnProperty(key)) {
            if (clientSpecMap[key].type === 'onboarding' && clientSpecMap.inUse === true) {
                return true
            }
        }
    }

    return false
    // const onBoardingSpec = _.find(clientSpecMap, {type: 'onboarding'});
    // return _.get(onBoardingSpec, 'inUse', false) === true;
}

function getTAGS(rendererModel, revision, biContext) {
    return {
        numberOfPages: getNumberOfPages(rendererModel),
        revision,
        geo: rendererModel.geo,
        metaSiteId: rendererModel.metaSiteId,
        siteId: rendererModel.siteInfo.siteId,
        isFromAdi: isSiteFromADI(rendererModel.clientSpecMap),
        isInRollout: biContext.is_rollout || biContext.isRollout ? 1 : 0,
        dataCenter: biContext.dc
    }
}

function getBiStore(rendererModel, sessionInfo = {}, biContext) {
    return {
        msid: rendererModel.metaSiteId,
        is_rollout: biContext.is_rollout || biContext.isRollout ? 1 : 0,
        is_headless: biContext.isBot,
        data_center: biContext.dc,
        is_cached: biContext.isCached,
        ...sessionInfo
    }
}

const addTagsFromObject = (scope, obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            scope.setTag(key, obj[key])
        }
    }
}

const wrapFunc = (logger, loggerFunc, consoleFunc, useArgsInConsoleFunc = false) => {
    const origFunc = logger[loggerFunc]
    logger[loggerFunc] = (...args) => {
        if (useArgsInConsoleFunc) {
            consoleFunc(...args)
        } else {
            consoleFunc()
        }

        if (logger[loggerFunc]) {
            origFunc(...args)
        }
    }
}

const wraplogger = logger => {
    wrapFunc(logger, 'error', console.error)
    wrapFunc(logger, 'appLoadingPhaseStart', console.log)
    wrapFunc(logger, 'appLoadingPhaseFinish', console.log)
    wrapFunc(logger, 'enrichError', ( /*e, {tags, extra, fingerprint} = {}*/ ) => {})
    wrapFunc(logger, 'captureError', console.error, true)
    wrapFunc(logger, 'setGlobalsForErrors', ( /*{tags, extras} = {}*/ ) => {})
    wrapFunc(logger, 'breadcrumb', ( /*messageContent, additionalData = {}*/ ) => {})
    wrapFunc(logger, 'interactionStarted', console.log)
    wrapFunc(logger, 'interactionEnded', console.log)
}

const createConsoleLogger = isDebug => ({
    error: console.error,
    appLoadingPhaseStart: console.log,
    appLoaded: console.log,
    appLoadingPhaseFinish: console.log,
    enrichError: ( /*e, {tags, extra, fingerprint} = {}*/ ) => {},
    captureError: (...args) => {
        console.error(...args)
    },
    setGlobalsForErrors: ( /*{tags, extras} = {}*/ ) => {},
    breadcrumb: ( /*messageContent, additionalData = {}*/ ) => {},
    interactionStarted: console.log,
    interactionEnded: console.log,
    log: isDebug ? console.log : () => {}
})

const shouldFilter = (url, message) => url.includes('isqa=true') ||
    url.includes('suppressbi=true') ||
    message.includes('play() failed because the user didn\'t interact with the document first') ||
    message.includes('The play() request was interrupted by a call to pause()')

const createLogger = (client, {
    rendererModel,
    isPreview,
    publicModel,
    requestModel,
    rawUrl,
    boltBase,
    isInSSR,
    loggerModel,
    wixBiSession,
    documentServicesModel,
    isDebug
}) => {
    const configMatches = rawUrl.match(/config=([^&]*)/)
    const config = configMatches && configMatches.length ? configMatches[1] : 'fullFunctionality'

    const release = boltBase.split('/').pop()
    const biContext = wixBiSession || loggerModel || {}
    if (!publicModel && !documentServicesModel || !client.configureScope) {
        return createConsoleLogger(isDebug) //TODO: alert bi this use case?
    }

    const id = publicModel ? publicModel.externalBaseUrl : documentServicesModel.publicUrl
    const revision = publicModel ? publicModel.siteRevision : documentServicesModel.revision
    const sessionInfo = publicModel ? {
        siteMemberId: publicModel.sessionInfo.siteMemberId,
        visitorId: publicModel.sessionInfo.visitorId
    } : {
        origin: biContext.origin,
        is_rollout: biContext.is_rollout,
        msid: rendererModel.metaSiteId,
        visitorId: documentServicesModel.editorSessionId,
        userEmail: documentServicesModel.userInfo.email,
        isPublished: documentServicesModel.isPublished,
        host: 'documentServices',
        config
    }

    client.configureScope(scope => {
        scope.addEventProcessor((event, hint) => {
            const {
                url
            } = event.request
            const {
                message,
                loggerParams
            } = hint.originalException

            if (shouldFilter(url, message)) {
                return null
            }
            event.release = release

            if (loggerParams) {
                if (event.extra && event.extra.TypeError) {
                    delete event.extra.TypeError.loggerParams
                }

                const {
                    tags,
                    extra,
                    fingerprint
                } = loggerParams
                if (tags) {
                    event.tags = event.tags || {}
                    Object.assign(event.tags, tags)
                }
                if (extra) {
                    event.extra = event.extra || {}
                    Object.assign(event.extra, extra)
                }
                if (fingerprint) {
                    event.fingerprint = fingerprint
                }
            }

            return event
        })

        scope.setUser({
            id
        })
        addTagsFromObject(scope, getTAGS(rendererModel, revision, biContext))
        if (publicModel) {
            addTagsFromObject(scope, publicModel.deviceInfo)
        } else {
            addTagsFromObject(scope, sessionInfo)
        }
        addTagsFromObject(scope, {
            url: rawUrl,
            environment: boltBase.includes('localhost') ? 'Development' : 'Production',
            userAgent: requestModel.userAgent,
            ssr: isInSSR
        })
    })

    const getSentry = forceLoad => {
        if (isInSSR) {
            return client
        }

        if (forceLoad) {
            window.Sentry.forceLoad()
        }
        return window.Sentry
    }

    const biStore = getBiStore(rendererModel, sessionInfo, biContext)
    const fedopsLogger = isInSSR ? getFedOpsServerLogger(biStore) : getFedOpsClientLogger(biStore)

    const logger = {
        enrichError: (e, {
            tags,
            extra,
            fingerprint
        } = {}) => {
            e.loggerParams = {
                tags,
                extra,
                fingerprint: ['{{ default }}', ...fingerprint]
            }
        },
        captureError: (e, {
            tags,
            extras,
            level = 'error',
            groupErrorsBy = 'tags'
        } = {}) => getSentry(true).withScope(scope => {
            const fingerprints = []
            for (const key in tags) {
                if (tags.hasOwnProperty(key)) {
                    scope.setTag(key, tags[key])
                    if (groupErrorsBy === 'tags') {
                        fingerprints.push(key)
                    } else if (groupErrorsBy === 'values') {
                        fingerprints.push(tags[key])
                    }
                }
            }

            for (const key in extras) {
                if (extras.hasOwnProperty(key)) {
                    scope.setExtra(key, extras[key])
                }
            }

            scope.setLevel(level)
            if (fingerprints.length) {
                scope.setFingerprint(['{{ default }}', ...fingerprints])
            }
            getSentry().captureException(e)
            fedopsLogger.interactionStarted('error') //this is a workaround to get error rate until we will have support for postgresSQL in fedonomy
        }),
        setGlobalsForErrors: ({
            tags,
            extra
        } = {}) => getSentry().configureScope(scope => {
            scope.addEventProcessor((event, hint) => {
                const {
                    url
                } = event.request
                const {
                    message
                } = hint.originalException

                if (shouldFilter(url, message)) {
                    return null
                }
                if (tags) {
                    event.tags = event.tags || {}
                    Object.assign(event.tags, tags)
                }
                if (extra) {
                    event.extra = event.extra || {}
                    Object.assign(event.extra, extra)
                }
                return event
            })
        }),
        breadcrumb: (messageContent, additionalData = {}) => getSentry().addBreadcrumb({
            message: messageContent,
            data: additionalData
        }),
        interactionStarted: i => fedopsLogger.interactionStarted(i),
        interactionEnded: i => fedopsLogger.interactionEnded(i),
        appLoadingPhaseStart: phase => fedopsLogger.appLoadingPhaseStart(phase),
        appLoadingPhaseFinish: phase => fedopsLogger.appLoadingPhaseFinish(phase),
        appLoaded: () => fedopsLogger.appLoaded(),
        log: isDebug ? console.log : () => {}
    }

    if (isPreview && isDebug) {
        wraplogger(logger)
    }

    return logger
}

module.exports = createLogger