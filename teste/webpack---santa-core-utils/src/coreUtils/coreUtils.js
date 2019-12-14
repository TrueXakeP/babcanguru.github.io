'use strict'
const warmupUtils = require('./warmupUtils')

const anchorTagsGenerator = require('./core/anchorTagsGenerator')
const animationFrame = require('./core/animationFrame')
const appManifest = require('./core/appManifest/appManifestUtils')
const appPartMediaInnerViewNameUtils = require('./core/appPartMediaInnerViewNameUtils')
const browserUtil = require('./core/browserUtil')
const classNames = require('./core/classNames')
const createFontUtils = require('./fonts/fontUtils')
const cssUtils = require('./core/cssUtils')
const dateTimeUtils = require('./core/dateTimeUtils')
const dynamicPagesUtils = require('./core/dynamicPagesUtils')
const eventsManager = require('./core/eventsManager')
const functionUtils = require('./core/functionUtils')
const htmlParser = require('./core/htmlParser')
const htmlTransformer = require('./core/htmlTransformer')
const keyboardUtils = require('./core/keyboardUtils')
const log = require('./core/log')
const {
    logWixCodeConsoleMessage,
    logWixCodeConsoleError,
    serializeMessage,
    logLevels
} = require('./core/logWixCodeConsoleMessage')
const math = require('./core/math')
const mobileUtils = require('./core/mobileUtils')
const nonPageItemZoom = require('./core/nonPageItemZoom')
const pageUtils = require('./core/pageUtils')
const reactComponentUtils = require('./core/reactComponentUtils')
const renderDoneMixin = require('./core/renderDoneMixin')
const requestsUtil = require('./core/requestsUtil')
const Screenfull = require('./core/screenfullFork')
const scrollUtils = require('./core/scrollUtils')
const SimpleDrag = require('./core/simpleDrag')
const store = require('./core/store2')
const storeNew = require('./core/store2_new')
const svgFilters = require('./core/svgFilters/svgFilters')
const svgMask = require('./core/svgMask/svgMask')
const textPatternRecognizer = require('./core/textPatternRecognizer')
const textSecurityFixer = require('./core/textSecurityFixer')
const throttleUtils = require('./core/throttleUtils')
const timersMixins = require('./core/timersMixins')
const timeUtils = require('./core/timeUtils')
const tween = require('./core/tween')
const validationUtils = require('./core/validationUtils')
const vectorImageConversionUtils = require('./core/vectorImageConversionUtils')
const verticalMenuCalculations = require('./core/verticalMenuCalculations')
const viewportUtils = require('./core/viewportUtils')
const xssUtils = require('./core/xssUtils')
const svgUtils = require('./core/svgUtils')
const svgIdToUrl = svgUtils.svgIdToUrl //require('./core/svgIdToUrl')
const accessibility = require('./core/accessibility')
const wSpy = require('./core/wSpyBrowserConfig')
const googleMapUtils = require('./core/googleMapUtils')
const constants = require('./core/constants')

/**
 * @exports coreUtils
 */

module.exports = Object.assign({},
    warmupUtils, {
        accessibility,
        anchorTagsGenerator,
        animationFrame,
        appManifest,
        appPartMediaInnerViewNameUtils,
        browserUtil,
        classNames,
        constants,
        createFontUtils,
        cssUtils,
        dateTimeUtils,
        dynamicPagesUtils,
        eventsManager,
        functionUtils,
        htmlParser,
        htmlTransformer,
        keyboardUtils,
        log,
        logWixCodeConsoleError,
        logWixCodeConsoleMessage,
        wixCodeConsoleLogLevels: logLevels,
        math,
        mobileUtils,
        nonPageItemZoom,
        pageUtils,
        reactComponentUtils,
        renderDoneMixin,
        requestsUtil,
        Screenfull,
        scrollUtils,
        SimpleDrag,
        Store: store,
        StoreNew: storeNew,
        svgFilters,
        svgMask,
        textPatternRecognizer,
        textSecurityFixer,
        throttleUtils,
        timersMixins,
        timeUtils,
        tween,
        validationUtils,
        vectorImageConversionUtils,
        verticalMenuCalculations,
        viewportUtils,
        wSpy,
        googleMapUtils,
        xssUtils,
        svgUtils,
        svgIdToUrl,
        serializeMessage
    })