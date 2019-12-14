'use strict'
const arrayUtils = require('./core/arrayUtils')
const biLoggerSanitizer = require('bi-logger-sanitizer')
const blogAppPartNames = require('./core/blogAppPartNames')
const boundingLayout = require('./core/boundingLayout')
const browserDetection = require('santa-browser-detection')
const constants = require('./core/constants')
const containerBackgroundUtils = require('./core/containerBackgroundUtils')
const contentAreaUtil = require('./core/contentAreaUtil')
const cookieUtils = require('./core/cookieUtils')
const dataUtils = require('./core/dataUtils')
const dockUtils = require('./core/dockUtils')
const domMeasurements = require('./core/domMeasurements')
const errorPages = require('./core/errorPages')
const fonts = require('./fonts/fonts')
const fragment = require('./core/fragment')
const flatStructureUtil = require('./core/flatStructureUtil')
const galleriesCommonLayout = require('./core/galleriesCommonLayout')
const guidUtils = require('./core/guidUtils')
const hashUtils = require('./core/hashUtils')
const imageUtils = require('santa-image-utils')
const matrixCalculations = require('./core/matrixCalculations')
const matrixScalingCalculations = require('./core/matrixScalingCalculations')
const mediaConsts = require('./core/mediaConsts')
const mediaZoomCalculations = require('./core/mediaZoomCalculations')
const mobileViewportFixer = require('./core/mobileViewportFixer')
const objectUtils = require('./core/objectUtils')
const siteConstants = require('./core/siteConstants')
const storage = require('./core/storage')
const stringUtils = require('./core/stringUtils')
const svgFeatureDetection = require('./core/svgFeatureDetection')
const style = require('./core/style')
const urlUtils = require('./core/urlUtils')
const displayedOnlyStructureUtil = require('./core/displayedOnlyStructureUtil')
const log = require('./core/log')
const {
    getImageClientLib
} = require('./core/imageClientApi')
const layoutUtils = require('./core/layoutUtils')
const parseValueByPropertyType = require('./core/parseValueByPropertyType')

/**
 * @exports warmupUtils
 */
module.exports = {
    arrayUtils,
    biLoggerSanitizer,
    blogAppPartNames,
    log,
    boundingLayout,
    browserDetection,
    constants,
    containerBackgroundUtils,
    contentAreaUtil,
    cookieUtils,
    dataUtils,
    dockUtils,
    domMeasurements,
    errorPages,
    fonts,
    fragment,
    flatStructureUtil,
    galleriesCommonLayout,
    guidUtils,
    hashUtils,
    imageUtils,
    layoutUtils,
    matrixCalculations,
    matrixScalingCalculations,
    mediaConsts,
    mediaZoomCalculations,
    mobileViewportFixer,
    objectUtils,
    siteConstants,
    storage,
    stringUtils,
    svgFeatureDetection,
    style,
    displayedOnlyStructureUtil,
    urlUtils,
    getImageClientLib,
    parseValueByPropertyType
}