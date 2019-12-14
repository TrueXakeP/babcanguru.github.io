'use strict'
const WEBPDetection = require('./webPDetection')
const utils = require('./utils')
const constants = require('./imageServiceConstants')
const globalFeatureSupportObject = require('./imageServiceFeatureSupportObject')

/**
 * Populate the global feature support object with browser specific values
 */
function populateGlobalFeatureSupport(userAgent = '') {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        WEBPDetection.checkSupportByUserAgent(navigator.userAgent)
        WEBPDetection.checkSupportByFeatureDetection()
        globalFeatureSupportObject.setFeature('isObjectFitBrowser', isPropertySupported('objectFit'))
        // objectfit support
    } else {
        WEBPDetection.checkSupportByUserAgent(userAgent)
    }
}

/**
 * check if the browser supports ObjectFit css attribute
 *
 * @returns {boolean}
 */
function isObjectFitBrowserSupport() {
    return globalFeatureSupportObject.getFeature('isObjectFitBrowser')
}

/**
 * returns if a css property is supported
 * @param property
 *
 * @returns {boolean}
 */
function isPropertySupported(property) {
    return property in window.document.documentElement.style
}

/**
 * checks if image type is supported
 * @param {string}     uri      image source uri
 *
 * @returns {boolean}
 */
function isImageTypeSupported(uri) {
    const supportedImageExtensions = [
        constants.fileType.PNG,
        constants.fileType.JPEG,
        constants.fileType.JPG,
        constants.fileType.WIX_ICO_MP,
        constants.fileType.WIX_MP
    ]
    return utils.includes(supportedImageExtensions, getFileExtension(uri))
}

/**
 * check request integrity
 * @param {string}                  fittingType         imageService.fittingTypes
 * @param {ImageTransformSource}    src
 * @param {ImageTransformTarget}    target
 *
 * @returns {boolean}
 */
function isValidRequest(fittingType, src, target) {
    return target && (src && !isUrlEmptyOrNone(src.id)) && utils.includes(constants.fittingTypes, fittingType)
}

/**
 * check if image transform is supported for source image
 * @param {string}     uri
 *
 * @returns {boolean}
 */
function isImageTransformApplicable(uri) {
    return isImageTypeSupported(uri) && !isExternalUrl(uri)
}

/**
 * returns true if image is of JPG type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
function isJPG(uri) {
    return utils.includes(['jpg', 'jpeg'], getFileExtension(uri))
}

/**
 * returns true if image is of PNG type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
function isPNG(uri) {
    return utils.includes(['png'], getFileExtension(uri))
}

/**
 * returns true if image is of webP type
 * @param {string}  uri
 *
 * @returns {boolean}
 */
function isWEBP(uri) {
    return utils.includes(['webp'], getFileExtension(uri))
}

/**
 * returns true if the url starts with http, https, // or data
 * @param {string}  url
 *
 * @returns {boolean}
 */
function isExternalUrl(url) {
    return (/(^https?)|(^data)|(^\/\/)/).test(url)
}

/**
 * returns true if the url empty or none string
 * @param {string}  url
 *
 * @returns {boolean}
 */
function isUrlEmptyOrNone(url) {
    return !url || !url.trim() || url.toLowerCase() === 'none'
}

/**
 * returns search bot true or false as indicated in options
 * @param {ImageTransformOptions}   options
 *
 * @returns {boolean}
 */
function isSEOBot(options) {
    return options && options.isSEOBot || false
}

/**
 * returns source image file name (no extension)
 * @param {string}     uri      image source uri
 * @param {string}     [name]   optional image source name
 *
 * @returns {string}
 */
function getFileName(uri, name) {
    const beforeLeadingSlashRegexp = /\/(.*?)$/
    const fileExtensionRegexp = /\.([^.]*)$/

    // if name is a non empty string, remove only supported extension if exists and url encode the string
    if (typeof name === 'string' && name.length) {
        //https://jira.wixpress.com/browse/WEED-12667
        //const illegalChars = ['/', '\\', '#', '^', '?', '{', '}', '<', '>', '|', '`', '“', ':', '"'].map(encodeURIComponent)
        const illegalChars = ['/', '\\', '?', '<', '>', '|', '“', ':', '"'].map(encodeURIComponent)
        const urlSafeIllegalChars = ['\\.', '\\*']
        const illegalCharsRegex = new RegExp(`(${illegalChars.concat(urlSafeIllegalChars).join('|')})`, 'g')
        const illegalCharsReplacement = '_'

        let fileName = name

        const extension = name.match(fileExtensionRegexp)

        if (extension && utils.includes(constants.supportedExtensions, extension[1])) {
            fileName = name.replace(fileExtensionRegexp, '')
        }
        return encodeURIComponent(fileName).replace(illegalCharsRegex, illegalCharsReplacement)
    }

    // else, trim any preceding media structure from the uri string (like "media/" etc.) and remove extension
    const trimmed = uri.match(beforeLeadingSlashRegexp)
    const fileName = trimmed ? trimmed[1] : uri
    return fileName.replace(fileExtensionRegexp, '')
}

/**
 * returns source image file name (no extension)
 * @param {string}     uri      image source uri
 *
 * @returns {string}
 */
function getFileType(uri) {
    if (isJPG(uri)) {
        return constants.fileType.JPG
    } else if (isPNG(uri)) {
        return constants.fileType.PNG
    } else if (isWEBP(uri)) {
        return constants.fileType.WEBP
    }
    return constants.fileType.UNRECOGNIZED
}

/**
 * returns source image file extension
 * @param {string}     uri      image source uri
 *
 * @returns {string}
 */
function getFileExtension(uri) {
    const splitURI = /[.]([^.]+)$/.exec(uri)
    return (splitURI && /[.]([^.]+)$/.exec(uri)[1] || '').toLowerCase()
}

/**
 * returns scale factor needed if FIT fitting
 * @param {number}  sWidth
 * @param {number}  sHeight
 * @param {number}  dWidth
 * @param {number}  dHeight
 *
 * @returns {number}
 */
function getFitScaleFactor(sWidth, sHeight, dWidth, dHeight) {
    return Math.min(dWidth / sWidth, dHeight / sHeight)
}

/**
 * returns scale factor needed if FILL fitting
 * @param {number}  sWidth
 * @param {number}  sHeight
 * @param {number}  dWidth
 * @param {number}  dHeight
 *
 * @returns {number}
 */
function getFillScaleFactor(sWidth, sHeight, dWidth, dHeight) {
    return Math.max(dWidth / sWidth, dHeight / sHeight)
}

/**
 * returns scale factor source target
 * @param {number}  sWidth
 * @param {number}  sHeight
 * @param {number}  dWidth
 * @param {number}  dHeight
 * @param {string}  transformType
 *
 * @returns {number}
 */
function getScaleFactor(sWidth, sHeight, dWidth, dHeight, transformType) {
    let scaleFactor
    if (transformType === constants.transformTypes.FILL) {
        scaleFactor = getFillScaleFactor(sWidth, sHeight, dWidth, dHeight)
    } else if (transformType === constants.transformTypes.FIT) {
        scaleFactor = getFitScaleFactor(sWidth, sHeight, dWidth, dHeight)
    } else {
        scaleFactor = 1
    }
    return scaleFactor
}


/**
 * get calculated scale factor , width and height while considering wixmp image transform dimension limits
 * @param sWidth
 * @param sHeight
 * @param dWidth
 * @param dHeight
 * @param transformType
 * @returns {{scaleFactor: *, width: *, height: *}}
 */
function getSafeTransformData(sWidth, sHeight, dWidth, dHeight, transformType) {
    let scaleFactor
    let width
    let height


    // calculate safe image transformed area
    scaleFactor = getScaleFactor(sWidth, sHeight, dWidth, dHeight, transformType)
    if (transformType === constants.transformTypes.FILL) {
        width = dWidth
        height = dHeight
    } else if (transformType === constants.transformTypes.FIT) {
        width = sWidth * scaleFactor
        height = sHeight * scaleFactor
    }

    // adjust target width & height & scaleFactor
    if (width * height > constants.SAFE_TRANSFORMED_AREA) {
        const dimensionScaleFactor = Math.sqrt(constants.SAFE_TRANSFORMED_AREA / (width * height))
        width *= dimensionScaleFactor
        height *= dimensionScaleFactor
        //get the new scale factor
        scaleFactor = getScaleFactor(sWidth, sHeight, width, height, transformType)
    }

    return {
        scaleFactor,
        width,
        height
    }
}

/**
 * returns the destination rectangle
 * @param {number}                  sWidth
 * @param {number}                  sHeight
 * @param {ImageTransformTarget}    target
 * @param {string}                  transformType
 * @param {string}                  upscaleMethod
 *
 * @returns {object}                {width, height, scaleFactor, upscaleMethodValue, forceUSM, cssUpscaleNeeded}
 */
function getTransformData(sWidth, sHeight, target, DPR, transformType, upscaleMethod) {
    //use target dimension is src not provided
    sWidth = sWidth || target.width
    sHeight = sHeight || target.height

    // adjust image transform values considering server side transform limitations and performance
    const {
        scaleFactor,
        width,
        height
    } = getSafeTransformData(sWidth, sHeight, target.width * DPR, target.height * DPR, transformType)

    // adjust image transform values to optimizing upsacle quality and payload
    return getOptimizedTransformData(sWidth, sHeight, width, height, upscaleMethod, scaleFactor, transformType)
}

/**
 * returns overlapping rectangle where sRect
 * id aligned (according to alignment) within dRect
 * @param {object}      sRect         rect 1
 * @param {object}      dRect         rect 2
 * @param {string}      alignment
 *
 * @returns {{x:number,y:number,width:number, height:number}}
 */
function getAlignedRect(sRect, dRect, alignment) {
    let x
    let y

    // calculate cropping x,y
    switch (alignment) {
        case constants.alignTypes.CENTER:
            x = Math.max(0, (sRect.width - dRect.width) / 2)
            y = Math.max(0, (sRect.height - dRect.height) / 2)
            break
        case constants.alignTypes.TOP:
            x = Math.max(0, (sRect.width - dRect.width) / 2)
            y = 0
            break
        case constants.alignTypes.TOP_LEFT:
            x = 0
            y = 0
            break
        case constants.alignTypes.TOP_RIGHT:
            x = Math.max(0, sRect.width - dRect.width)
            y = 0
            break
        case constants.alignTypes.BOTTOM:
            x = Math.max(0, (sRect.width - dRect.width) / 2)
            y = Math.max(0, sRect.height - dRect.height)
            break
        case constants.alignTypes.BOTTOM_LEFT:
            x = 0
            y = Math.max(0, sRect.height - dRect.height)
            break
        case constants.alignTypes.BOTTOM_RIGHT:
            x = Math.max(0, sRect.width - dRect.width)
            y = Math.max(0, sRect.height - dRect.height)
            break
        case constants.alignTypes.LEFT:
            x = 0
            y = Math.max(0, (sRect.height - dRect.height) / 2)
            break
        case constants.alignTypes.RIGHT:
            x = Math.max(0, sRect.width - dRect.width)
            y = Math.max(0, (sRect.height - dRect.height) / 2)
            break
    }

    // rect
    return {
        x: sRect.x ? sRect.x + x : x,
        y: sRect.y ? sRect.y + y : y,
        width: Math.min(sRect.width, dRect.width),
        height: Math.min(sRect.height, dRect.height)
    }
}

/**
 * returns overlapping rectangle between sRect and dRect
 * @param {object}      sRect         rect 1
 * @param {object}      dRect         rect 2
 *
 * @returns {{x:number,y:number,width:number, height:number} || null}
 */
function getOverlappingRect(sRect, dRect) {
    const width = Math.max(0, Math.min(sRect.width, dRect.x + dRect.width) - Math.max(0, dRect.x))
    const height = Math.max(0, Math.min(sRect.height, dRect.y + dRect.height) - Math.max(0, dRect.y))


    const isValidRect = width && height && (sRect.width !== width || sRect.height !== height)

    // return overlapping sRect/dRect rectangle(x, y, width, height)
    return isValidRect ? {
        x: Math.max(0, dRect.x),
        y: Math.max(0, dRect.y),
        width,
        height
    } : null
}

/**
 * returns pixel aspect ratio value
 * @param {ImageTransformTarget}    target
 *
 * @returns {number}
 */
function getDevicePixelRatio(target) {
    return Math.min(target.pixelAspectRatio || 1, constants.MAX_DEVICE_PIXEL_RATIO)
}

/**
 * returns target alignment value
 * @param {ImageTransformTarget}    target
 *
 * @returns {string}
 */
function getAlignment(target) {
    return constants.alignTypesMap[target.alignment] || constants.alignTypesMap[constants.alignTypes.CENTER]
}

/**
 * returns the focal point value, if no focal point passed use alignment
 * @param {{x: number, y: number}|undefined} focalPoint
 */
function getFocalPoint(focalPoint) {
    let fp = null

    if (typeof focalPoint.x === 'number' && !isNaN(focalPoint.x) && typeof focalPoint.y === 'number' && !isNaN(focalPoint.y)) {
        fp = {
            x: roundToFixed(Math.max(0, Math.min(100, focalPoint.x)) / 100, 2),
            y: roundToFixed(Math.max(0, Math.min(100, focalPoint.y)) / 100, 2)
        }
    }

    return fp
}

/**
 * returns preferred image quality value
 * @param {number}    imageWidth
 * @param {number}    imageHeight
 *
 * @returns {number}
 */
function getPreferredImageQuality(imageWidth, imageHeight) {
    return constants.imageScaleDefaults[getImageQualityKey(imageWidth, imageHeight)].quality
}

/**
 * returns the scale descriptor of CLASSIC upscale method
 * @param sWidth
 * @param sHeight
 * @returns {{optimizedScaleFactor: number, upscaleMethodValue: number, forceUSM: boolean}}
 */
function getClassicScaleData(sWidth, sHeight) {
    const imageKey = getImageQualityKey(sWidth, sHeight)
    return {
        optimizedScaleFactor: constants.imageScaleDefaults[imageKey].maxUpscale,
        upscaleMethodValue: constants.upscaleMethodsValues.classic,
        forceUSM: false
    }
}

/**
 * returns the scale descriptor of AUTO upscale method
 * @param sWidth
 * @param sHeight
 * @returns {{optimizedScaleFactor: number, upscaleMethodValue: number, forceUSM: boolean}}
 */
function getAutoScaleData(sWidth, sHeight) {
    const imageKey = getImageQualityKey(sWidth, sHeight)
    return {
        optimizedScaleFactor: constants.imageScaleDefaults[imageKey].maxUpscale,
        upscaleMethodValue: constants.upscaleMethodsValues.classic,
        forceUSM: false
    }
}

/**
 * returns the scale descriptor of SUPER upscale method
 * @param sWidth
 * @param sHeight
 * @param scaleFactor
 * @returns {{optimizedScaleFactor: number, upscaleMethodValue: number, forceUSM: boolean}}
 */
function getSuperScaleData(sWidth, sHeight, scaleFactor) {
    return {
        optimizedScaleFactor: utils.last(constants.SUPER_UPSCALE_MODELS),
        upscaleMethodValue: constants.upscaleMethodsValues.super,
        forceUSM: !(constants.SUPER_UPSCALE_MODELS.includes(scaleFactor) || scaleFactor > utils.last(constants.SUPER_UPSCALE_MODELS))
    }
}

/**
 * returns upscale descriptor object
 * @param {number}    sWidth
 * @param {number}    sHeight
 * @param {string}    upscaleMethod
 * @param {number}    scaleFactor
 *
 * @returns  {{maxScale: number, upscaleMethodValue: number, forceUSM: boolean}}
 */
function getOptimizedScaleData(sWidth, sHeight, scaleFactor, upscaleMethod) {
    const scaleDataFunc = {
        classic: getClassicScaleData,
        auto: getAutoScaleData,
        super: getSuperScaleData
    }
    return scaleDataFunc[upscaleMethod](sWidth, sHeight, scaleFactor)
}

/**
 * returns optimized upscale data, considering requested upscale method , optimize upscale for best quality and banswidth
 * @param {number}    sWidth
 * @param {number}    sHeight
 * @param {number}    tWidth
 * @param {number}    tHeight
 * @param {string}    upscaleMethod
 * @param {number}    scaleFactor
 * @param {string}    transformType
 *
 * @returns  {{width: number, height: number, sacleFactor: number, upscaleMethodValue: number, forceUSM: boolean, cssUpscaleNeeded: boolean}}
 */
function getOptimizedTransformData(sWidth, sHeight, tWidth, tHeight, upscaleMethod, scaleFactor, transformType) {
    const {
        optimizedScaleFactor,
        upscaleMethodValue,
        forceUSM
    } = getOptimizedScaleData(sWidth, sHeight, scaleFactor, upscaleMethod)

    if (scaleFactor <= optimizedScaleFactor) {
        // target upscale within limits or downscale
        return {
            width: tWidth,
            height: tHeight,
            scaleFactor,
            upscaleMethodValue,
            forceUSM,
            cssUpscaleNeeded: false
        }
    }
    // limited upscale
    let width
    let height
    switch (transformType) {
        case constants.transformTypes.FILL:
            width = tWidth * (optimizedScaleFactor / scaleFactor)
            height = tHeight * (optimizedScaleFactor / scaleFactor)
            break
        case constants.transformTypes.FIT:
            width = sWidth * optimizedScaleFactor
            height = sHeight * optimizedScaleFactor
            break
        default:
            break
    }
    // adjust transform values
    return {
        width,
        height,
        scaleFactor: optimizedScaleFactor,
        upscaleMethodValue,
        forceUSM,
        cssUpscaleNeeded: true
    }
}


/**
 * returns image quality key
 * @param {number}    imageWidth
 * @param {number}    imageHeight
 *
 * @returns {string}
 */
function getImageQualityKey(imageWidth, imageHeight) {
    const size = imageWidth * imageHeight

    if (size > constants.imageScaleDefaults[constants.imageQuality.HIGH].size) {
        return constants.imageQuality.HIGH
    } else if (size > constants.imageScaleDefaults[constants.imageQuality.MEDIUM].size) {
        return constants.imageQuality.MEDIUM
    } else if (size > constants.imageScaleDefaults[constants.imageQuality.LOW].size) {
        return constants.imageQuality.LOW
    }
    return constants.imageQuality.TINY
}

/**
 * return the actual rounded dimension of a scaled rectangle
 * @param sWidth
 * @param sHeight
 * @param tWidth
 * @param tHeight
 * @param transformType
 * @returns {{width: number, height: number}}
 */
function getDimension(sWidth, sHeight, tWidth, tHeight, transformType) {
    const scaleFactor = getScaleFactor(sWidth, sHeight, tWidth, tHeight, transformType)
    return {
        width: Math.round(sWidth * scaleFactor),
        height: Math.round(sHeight * scaleFactor)
    }
}

/**
 * rounds number n digit precision and converts to string
 * @param {number}      value
 * @param {number}      precision
 *
 * @returns {string}
 */
function roundToFixed(value, precision) {
    const truncatePrecision = Math.pow(10, precision || 0)
    return (value * truncatePrecision / truncatePrecision).toFixed(parseInt(precision, 10))
}

/**
 * get normalize scale method
 * @param options
 * @returns {*}
 */
function getUpscaleString(options) {
    if (!options || !options.upscaleMethod || typeof options.upscaleMethod !== 'string') {
        return constants.upscaleMethods.AUTO
    }
    return constants.upscaleMethods[options.upscaleMethod.toUpperCase()] || constants.upscaleMethods.AUTO
}


module.exports = {
    populateGlobalFeatureSupport,
    isWEBPBrowserSupport: WEBPDetection.isWEBPBrowserSupport,
    isObjectFitBrowserSupport,
    isImageTransformApplicable,
    isValidRequest,
    isImageTypeSupported,
    isExternalUrl,
    isWEBP,
    isSEOBot,
    getFileType,
    getFileExtension,
    getFileName,
    getAlignedRect,
    getOverlappingRect,
    getScaleFactor,
    getTransformData,
    getDevicePixelRatio,
    getAlignment,
    getPreferredImageQuality,
    getDimension,
    getFocalPoint,
    getUpscaleString,
    roundToFixed
}