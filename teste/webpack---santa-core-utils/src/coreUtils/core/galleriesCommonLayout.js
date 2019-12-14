'use strict'
const _ = require('lodash')
const stringUtils = require('./stringUtils')

function getContainerSize(imageWrapperSize, displayerNode) {
    const $ = require('zepto')
    const $node = $(displayerNode)
    let containerWidth = imageWrapperSize.imageWrapperWidth - parseInt($node.attr('data-image-wrapper-right'), 10) - parseInt($node.attr('data-image-wrapper-left'), 10)
    let containerHeight = imageWrapperSize.imageWrapperHeight - parseInt($node.attr('data-image-wrapper-bottom'), 10) - parseInt($node.attr('data-image-wrapper-top'), 10)
    if (stringUtils.isTrue($node.attr('data-margin-to-container'))) {
        containerWidth += imageWrapperSize.imageWrapperMarginLeft + imageWrapperSize.imageWrapperMarginRight
        containerHeight += imageWrapperSize.imageWrapperMarginTop + imageWrapperSize.imageWrapperMarginBottom
    }
    return {
        width: containerWidth,
        height: containerHeight
    }
}

function updateImageWrapperSizes(patchers, imageWrapperId, sizeAfterScaling) {
    patchers.css(imageWrapperId, {
        'height': sizeAfterScaling.imageWrapperSize.imageWrapperHeight,
        'width': sizeAfterScaling.imageWrapperSize.imageWrapperWidth,
        'marginLeft': sizeAfterScaling.imageWrapperSize.imageWrapperMarginLeft,
        'marginRight': sizeAfterScaling.imageWrapperSize.imageWrapperMarginRight,
        'marginTop': sizeAfterScaling.imageWrapperSize.imageWrapperMarginTop,
        'marginBottom': sizeAfterScaling.imageWrapperSize.imageWrapperMarginBottom
    })
}

function updateSkinPropsForFlexibleHeightGallery(gallerySkinProps) {
    const attributesForLayout = {
        'data-should-add-min-height': true
    }
    _.assign(gallerySkinProps[''], attributesForLayout)
}

function measureFlexibleHeightGallery(id, measureMap, nodesMap) {
    const $ = require('zepto')
    measureMap.height[id] = nodesMap[id].offsetHeight
    const shouldAddMinHeight = $(nodesMap[id]).data('should-add-min-height')
    if (shouldAddMinHeight) {
        measureMap.minHeight[id] = measureMap.height[id]
    } else {
        delete measureMap.minHeight[id]
    }
}

module.exports = {
    getContainerSize,
    updateImageWrapperSizes,
    updateSkinPropsForFlexibleHeightGallery,
    measureFlexibleHeightGallery
}