/*eslint fp/no-rest-parameters:0*/
const warmup = require('bolt-server/src/warmup/warmup')
const addPageStructureAndData = require('./functionLibrary/addPageStructureAndData')
const passDataToBolInstance = require('./functionLibrary/passDataToBoltInstance')
const carmiUtils = require('./functionLibrary/carmiUtils')
const dynamicPages = require('./functionLibrary/dynamicPages')
const parseCookie = require('./functionLibrary/parseCookie')
const createCodeLoadingLib = require('./functionLibrary/codeLoading')
const flattenStructure = require('./functionLibrary/flattenStructure')
const {
    prefersReducedMotion
} = require('./functionLibrary/accessability')
const {
    getSMbySiteExtensionInstanceForRgi
} = require('./functionLibrary/misc')
const packagesCallbacks = require('./functionLibrary/packagesCallbacks')
const urlUtils = require('./functionLibrary/urlUtils')
const dsUrlUtils = require('./dsFunctionLibrary/urlUtils')
const stringUtils = require('./functionLibrary/stringUtils')
const platformFunctionLibrary = require('./platform/platformFunctionLibrary1')
const defaultBiReporter = require('./functionLibrary/biReporter') // TODO remove once browser bi is implemented
const {
    MobileDeviceAnalyzer
} = require('santa-mobile-device-analyzer')
const santaLegacy = require('./functionLibrary/santaLegacy')
const navigationLib = require('./functionLibrary/navigationLib')
const pagesLoadingLib = require('./functionLibrary/pagesLoadingLib')
const clientSpecMapBase = require('./functionLibrary/clientSpecMapBase')
const setMobileView = require('./functionLibrary/setMobileView')
const experiments = require('./experiments/experiments')
const replaceBoltStructure = require('./functionLibrary/replaceBoltStructure')
const meshFunctionLib = require('./functionLibrary/mesh')

module.exports = {
    createFunctionLibrary: ({
        fetchFunction,
        requireFunction,
        biReporter,
        workerFunction,
        boltAnimationsPromise,
        logger,
        workerWrapperIframe
    }) => {
        biReporter = biReporter || defaultBiReporter
        boltAnimationsPromise = boltAnimationsPromise || new Promise(() => {})

        const identity = x => x
        const ssrHooks = {
            ssrUpdateCompClasses: identity,
            throwException: e => {
                throw e
            }
        }

        return {
            prefersReducedMotion,
            replace: (src, fragment, replacement) => src.replace(fragment, replacement),
            warmup: warmup(),
            runWarmupAnimations: (...args) => {
                boltAnimationsPromise.then(({
                    runWarmupAnimations
                }) => {
                    runWarmupAnimations(...args)
                })
            },
            stopWarmupAnimations: () => {
                boltAnimationsPromise.then(({
                    stopWarmupAnimations
                }) => {
                    stopWarmupAnimations()
                })
            },
            identity: v => v,
            removeHash: value => value && value.replace('#', ''),
            addPageStructureAndData,
            flattenStructure,
            replaceBoltStructure,
            getSMbySiteExtensionInstanceForRgi,
            ...passDataToBolInstance,
            ...carmiUtils,
            ...dynamicPages,
            ...packagesCallbacks,
            ...urlUtils,
            ...dsUrlUtils,
            ...stringUtils,
            ...createCodeLoadingLib({
                fetchFunction,
                requireFunction,
                biReporter,
                logger
            }),
            ...platformFunctionLibrary,
            ...navigationLib,
            ...pagesLoadingLib,
            ...clientSpecMapBase,
            createWorker: workerFunction,
            createWorkerWrapperIframe: workerWrapperIframe,
            parseCookie,
            setMobileView,
            getMobileDeviceAnalyzer(lodash, requestModel) {
                return new MobileDeviceAnalyzer(lodash, requestModel)
            },
            ...biReporter,
            ...santaLegacy({
                fetchFunction
            }),
            ...ssrHooks,
            ...experiments,
            interactionStarted: logger.interactionStarted,
            interactionEnded: logger.interactionEnded,
            appLoadingPhaseStart: logger.appLoadingPhaseStart,
            appLoadingPhaseFinish: logger.appLoadingPhaseFinish,
            captureError: logger.captureError,
            ...meshFunctionLib
        }
    }
}