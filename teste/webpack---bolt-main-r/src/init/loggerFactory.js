const {
    PublishMethods,
    factory
} = require('@wix/web-bi-logger/dist/src/logger')
const {
    create,
    phasesConfig
} = require('@wix/fedops-logger')

const DEFAULT_ENDPOINT = 'bolt-viewer'
const DS_DEFAULT_ENDPOINT = 'bolt-ds'
const BI_ENDPOINT = 'bolt-performance'
const DS_BI_ENDPOINT = 'ds-performance'

const events = {
    bolt: {
        14: 21,
        11: 23,
        13: 22,
        15: 24,
        16: 25,
        17: 26,
        18: 27
    },
    ds: {
        14: 31,
        11: 33,
        13: 32,
        15: 34,
        16: 35,
        17: 36,
        18: 37
    }
}

const isDS = () => window && window.documentServicesModel

const paramsConverter = parmas => {
    const ds = isDS()
    const map = ds ? events.ds : events.bolt
    if (parmas.evid in map) {
        parmas.evid = map[parmas.evid]
    }
    return {
        type: 'reportBI',
        ...parmas
    }
}

const serverLoggerFactory = (biStore, shouldBeMutedForFedOps = () => false) => factory({
        publishMethod: PublishMethods.PostMessage
    }).setMuted(shouldBeMutedForFedOps())
    .withUoUContext({
        msid: biStore.msid,
        visitorId: biStore.visitorId,
        siteMemberId: () => biStore.siteMemberId
    })
    .updateDefaults({
        is_rollout: biStore.is_rollout,
        is_cached: biStore.is_cached,
        dc: biStore.data_center,
        ish: biStore.is_headless
    })
    .withTransformer({
        [PublishMethods.PostMessage]: paramsConverter
    })

const clientLoggerFactory = (biStore, shouldBeMutedForFedOps = () => false) => factory({
        publishMethod: PublishMethods.Auto,
        useBatch: true
    })
    .setMuted(shouldBeMutedForFedOps())
    .withUoUContext({
        msid: biStore.msid,
        visitorId: biStore.visitorId,
        siteMemberId: () => biStore.siteMemberId
    })
    .updateDefaults({
        is_rollout: biStore.is_rollout,
        ...(isDS() ? {
            origin: biStore.origin
        } : { //eslint-disable-line no-extra-parens
            is_cached: biStore.is_cached,
            dc: biStore.data_center,
            ish: biStore.is_headless
        })
    })
    .withTransformer(paramsConverter)

const getFedOpsServerLogger = (biStore, muteFunc) => create(DEFAULT_ENDPOINT, {
    endpoint: BI_ENDPOINT,
    isServerSide: true,
    biLoggerFactory: serverLoggerFactory(biStore, muteFunc),
    phasesConfig: phasesConfig.SEND_ON_FINISH,
    metasiteId: biStore.msid
})

const getFedOpsClientLogger = (biStore, muteFunc) => create(isDS() ? DS_DEFAULT_ENDPOINT : DEFAULT_ENDPOINT, {
    endpoint: isDS() ? DS_BI_ENDPOINT : BI_ENDPOINT,
    isServerSide: false,
    biLoggerFactory: clientLoggerFactory(biStore, muteFunc),
    phasesConfig: phasesConfig.SEND_ON_FINISH,
    metasiteId: biStore.msid
})

module.exports = {
    getFedOpsClientLogger,
    getFedOpsServerLogger
}