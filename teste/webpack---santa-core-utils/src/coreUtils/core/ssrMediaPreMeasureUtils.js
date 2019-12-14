'use strict'

const _ = require('lodash')
const {
    fittingTypes,
    alignTypes,
    upscaleMethods
} = require('image-client-api/dist/imageClientApi')

const AlignTypeToPositionStr = {
    [alignTypes.TOP_LEFT]: '0% 0%',
    [alignTypes.TOP_RIGHT]: '100% 0%',
    [alignTypes.TOP]: '50% 0%',
    [alignTypes.BOTTOM_LEFT]: '0% 100%',
    [alignTypes.BOTTOM_RIGHT]: '100% 100%',
    [alignTypes.BOTTOM]: '50% 100%',
    [alignTypes.RIGHT]: '100% 50%',
    [alignTypes.LEFT]: '0% 50%',
    [alignTypes.CENTER]: '50% 50%'
}

/**
 * try to convert focal point value to 9 grid alignment value
 * @param focalPoint
 * @returns {string} alignType || ''
 */
function convertFocalPointToAlignType(focalPoint) {
    let key = ''
    Object.keys(AlignTypeToPositionStr).some(findKey => {
        if (AlignTypeToPositionStr[findKey] === `${focalPoint.x}% ${focalPoint.y}%`) {
            key = findKey
            return true
        }
        return false
    })
    return key
}

/**
 * getting a numeric value from string, avoid percentage
 * @param style
 * @returns {object}
 */
function convertStyleToDimensions(style) {
    const parseStaticDimensions = value => {
        if (_.isNumber(value)) {
            return value
        }
        if (!value || value.includes('%')) {
            return 0
        }
        return parseInt(value, 10) || 0
    }
    return {
        width: parseStaticDimensions(style.width) || parseStaticDimensions(style.minWidth),
        height: parseStaticDimensions(style.height) || parseStaticDimensions(style.minHeight),
        maxWidth: style.maxWidth
    }
}

/**
 *
 * @param {number} sW source width
 * @param {number} sH source height
 * @param {number} tW taret width
 * @param {number} tH target height
 * @param {number} fpX focal point x 0 - 100  percentage
 * @param {number} fpY focal point x 0 - 100  percentage
 * @returns {string} x% y%
 */
function convertFillFocalToPosition(sW, sH, fpX, fpY, tW, tH) {
    const fillScaleFactor = Math.max(tW / sW, tH / sH)
    const imgScaledW = sW * fillScaleFactor
    const imgScaledH = sH * fillScaleFactor

    const x = Math.max(0, Math.min(imgScaledW - tW, imgScaledW * (fpX / 100) - tW / 2))
    const y = Math.max(0, Math.min(imgScaledH - tH, imgScaledH * (fpY / 100) - tH / 2))

    const posX = x && Math.floor(x / (imgScaledW - tW) * 100)
    const posY = y && Math.floor(y / (imgScaledH - tH) * 100)

    return `${posX}% ${posY}%`
}

/**
 * returns an object with all needed properties to build url from structure dimensions.
 * @param style
 * @param imageData
 * @param componentFittingType
 * @param alignType
 * @param isMobile
 * @returns {{width: number, height: number, fittingType: *, imageCss: *, devicePixelRatio: number, upscaleMethod: string, filters: {blur: number}}}
 */
function getImageUrlPreMeasureParams(style, imageData, componentFittingType, alignType, isMobile, isInSeo) {

    const compParams = getPreMeasureHelper(style, imageData, componentFittingType, alignType, isInSeo)

    let scale = 1
    let targetWidth = 0
    let targetHeight = 0
    let fittingType = ''
    let blur = 3
    let imageCss = {}

    if (isMobile) {
        ({
            targetWidth,
            targetHeight,
            fittingType,
            imageCss,
            scale
        } = getMobilePreMeasuredParams(compParams))
    } else {
        ({
            targetWidth,
            targetHeight,
            fittingType,
            imageCss,
            scale,
            blur
        } = getDesktopPreMeasuredParams(compParams))
    }
    scale = isInSeo ? 1 : scale
    blur = isInSeo ? 0 : blur

    return {
        width: targetWidth * scale,
        height: targetHeight * scale,
        fittingType,
        imageCss,
        devicePixelRatio: 1,
        upscaleMethod: upscaleMethods.CLASSIC,
        filters: {
            blur
        }
    }
}


function getScaleAndBlurByWidth(styleWidth) {
    if (styleWidth > 900) {
        return {
            scale: 0.25,
            blur: 2
        }
    }
    if (styleWidth > 500) {
        return {
            scale: 0.3,
            blur: 2
        }
    }
    if (styleWidth > 200) {
        return {
            scale: 0.6,
            blur: 2
        }
    }
    return {
        scale: 1,
        blur: 3
    }
}

/**
 * helper to construct an object
 * @param dimensions
 * @param imageData
 * @param componentFittingType
 * @param alignType
 * @returns {{styleWidth: number, styleHeight: number, styleMaxWidth: number, focalPoint: {x: number, y: number}, componentFittingType: string, alignType: string, isFullyExceeds: boolean, convertFillFocalToPosition: function}}
 */
function getPreMeasureHelper(dimensions, imageData, componentFittingType, alignType, isInSeo) {
    const styleWidth = Math.round(dimensions.width)
    const optimizedWidthForSeo = 1366
    //use align type if the focal point value is one of the '9 grid' aligment values
    const alignTypeFromFocalPoint = imageData.focalPoint && convertFocalPointToAlignType(imageData.focalPoint)
    return _.assign({
        styleWidth,
        styleHeight: Math.round(dimensions.height),
        styleMaxWidth: isInSeo && dimensions.maxWidth ? optimizedWidthForSeo : dimensions.maxWidth || styleWidth,
        componentFittingType,
        alignType: alignTypeFromFocalPoint || alignType,
        isFullyExceeds: imageData.width > styleWidth && imageData.height > styleWidth
    }, imageData.focalPoint && !alignTypeFromFocalPoint ? {
        focalPoint: imageData.focalPoint,
        convertFillFocalToPosition: _.partial(convertFillFocalToPosition, imageData.width, imageData.height, imageData.focalPoint.x, imageData.focalPoint.y)
    } : null)
}

function getDesktopPreMeasuredParams(compParams) {
    const {
        scale,
        blur
    } = getScaleAndBlurByWidth(compParams.styleWidth)
    switch (compParams.componentFittingType) {
        case fittingTypes.LEGACY_FIT_WIDTH:
        case fittingTypes.LEGACY_FIT_HEIGHT:
        case fittingTypes.LEGACY_FULL:
        case fittingTypes.SCALE_TO_FIT:
            return {
                scale,
                blur,
                targetWidth: compParams.styleWidth,
                targetHeight: compParams.styleHeight,
                fittingType: fittingTypes.SCALE_TO_FIT,
                imageCss: {
                    objectPosition: AlignTypeToPositionStr[compParams.alignType]
                }
            }
        case fittingTypes.SCALE_TO_FILL:
            return compParams.focalPoint ? {
                scale,
                blur,
                targetHeight: compParams.styleHeight,
                fittingType: fittingTypes.SCALE_TO_FIT,
                targetWidth: compParams.styleMaxWidth,
                imageCss: {
                    objectPosition: compParams.convertFillFocalToPosition(compParams.styleWidth, compParams.styleHeight) //,
                    //objectFit: 'cover'
                }
            } : {
                scale,
                blur,
                targetHeight: compParams.styleHeight,
                fittingType: fittingTypes.SCALE_TO_FIT,
                targetWidth: compParams.styleMaxWidth,
                imageCss: {
                    objectPosition: AlignTypeToPositionStr[compParams.alignType] //,
                    //objectFit: 'cover'
                }
            }
        case fittingTypes.LEGACY_ORIGINAL_SIZE:
        case fittingTypes.ORIGINAL_SIZE:
            return {
                scale: 1,
                blur: 5,
                targetWidth: compParams.styleWidth,
                targetHeight: compParams.styleHeight,
                fittingType: compParams.componentFittingType,
                imageCss: {
                    objectPosition: AlignTypeToPositionStr[compParams.alignType],
                    objectFit: 'none',
                    top: 'auto',
                    left: 'auto',
                    right: 'auto',
                    bottom: 'auto'
                }
            }
        case fittingTypes.TILE_HORIZONTAL:
        case fittingTypes.TILE_VERTICAL:
        case fittingTypes.TILE:
            return compParams.isFullyExceeds ? {
                scale: 1,
                blur: 5,
                targetWidth: 1920,
                targetHeight: compParams.styleHeight,
                fittingType: compParams.componentFittingType
            } : {
                scale: 1,
                blur: 5,
                targetWidth: compParams.styleWidth,
                targetHeight: compParams.styleHeight,
                fittingType: compParams.componentFittingType
            }
        case fittingTypes.LEGACY_BG_NORMAL:
        case fittingTypes.FIT_AND_TILE:
        case fittingTypes.LEGACY_BG_FIT_AND_TILE:
        case fittingTypes.LEGACY_BG_FIT_AND_TILE_HORIZONTAL:
        case fittingTypes.LEGACY_BG_FIT_AND_TILE_VERTICAL:
        default:
            return {
                scale: 1,
                blur,
                targetWidth: compParams.styleWidth,
                targetHeight: compParams.styleHeight,
                fittingType: compParams.componentFittingType
            }
    }
}

function getMobilePreMeasuredParams(compParams) {
    switch (compParams.componentFittingType) {
        case fittingTypes.SCALE_TO_FILL:
            return {
                scale: 0.35,
                targetWidth: compParams.styleWidth,
                targetHeight: compParams.styleHeight,
                fittingType: compParams.componentFittingType
            }
        case fittingTypes.ORIGINAL_SIZE:
            return {
                scale: 1,
                targetWidth: compParams.styleWidth,
                targetHeight: compParams.styleHeight,
                fittingType: compParams.componentFittingType,
                imageCss: {
                    objectPosition: AlignTypeToPositionStr[compParams.alignType],
                    objectFit: 'none',
                    top: 'auto',
                    left: 'auto',
                    right: 'auto',
                    bottom: 'auto'
                }
            }
        case fittingTypes.SCALE_TO_FIT:
        case fittingTypes.LEGACY_FIT_WIDTH:
        case fittingTypes.LEGACY_FIT_HEIGHT:
        case fittingTypes.LEGACY_FULL:
            return {
                scale: 0.35,
                targetWidth: compParams.styleWidth,
                targetHeight: compParams.styleHeight,
                fittingType: compParams.componentFittingType
            }
        case fittingTypes.LEGACY_BG_NORMAL:
        case fittingTypes.FIT_AND_TILE:
        case fittingTypes.LEGACY_BG_FIT_AND_TILE:
        case fittingTypes.LEGACY_BG_FIT_AND_TILE_HORIZONTAL:
        case fittingTypes.LEGACY_BG_FIT_AND_TILE_VERTICAL:
        default:
            return {
                scale: 1,
                targetWidth: compParams.styleWidth,
                targetHeight: compParams.styleHeight,
                fittingType: compParams.componentFittingType
            }
    }
}

module.exports = {
    getImageUrlPreMeasureParams,
    convertStyleToDimensions
}