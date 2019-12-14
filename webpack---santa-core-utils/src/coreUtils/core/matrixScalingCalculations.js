'use strict'

const matrixScalingCalculations = {
    getSizeAfterScaling(itemData) {
        const mode = itemData.imageMode || 'clipImage'
        const height = itemData.itemHeight - itemData.bottomGap
        const widthDiff = itemData.widthDiff
        const heightDiff = itemData.heightDiff
        const galleryScalersMap = {
            clipImage: this.getClipImage,
            flexibleHeight: this.getFlexibleHeight,
            flexibleWidth: this.getFlexibleWidth,
            flexibleWidthFixed: this.getFlexibleWidth
        }
        return galleryScalersMap[mode].call(this, itemData.itemWidth, height, widthDiff, heightDiff, itemData.displayerData, mode)
    },

    getClipImage(width, height, widthDiff, heightDiff) {
        return {
            displayerSize: {
                width,
                height
            },
            imageWrapperSize: this.getWrapperSize(width - widthDiff, height - heightDiff)
        }
    },

    getFlexibleHeight(width, height, widthDiff, heightDiff, displayerData) {
        const newWidth = width - widthDiff
        const newHeight = Math.floor(newWidth / this.getAspectRatio(displayerData))
        return {
            displayerSize: {
                width,
                height: newHeight
            },
            imageWrapperSize: this.getWrapperSize(newWidth, newHeight - heightDiff)
        }
    },
    getFlexibleWidth(width, height, widthDiff, heightDiff, displayerData, mode) {
        const isFlexibleWidth = mode === 'flexibleWidth'
        let horizontalPadding = 0
        let verticalPadding = 0
        let newHeight = height - heightDiff
        let newWidth = newHeight * this.getAspectRatio(displayerData)

        if (!isFlexibleWidth && newWidth > width - widthDiff) {
            if (newWidth > width - widthDiff) {
                const coef = (width - widthDiff) / newWidth
                newWidth = width - widthDiff
                newHeight = coef * newHeight
            }
        }
        if (!isFlexibleWidth) {
            horizontalPadding = Math.floor((width - newWidth - widthDiff) / 2.0)
            verticalPadding = Math.floor((height - newHeight - heightDiff) / 2.0)
        }

        return {
            displayerSize: {
                width: isFlexibleWidth ? newWidth : width,
                height
            },
            imageWrapperSize: this.getWrapperSize(newWidth, newHeight, horizontalPadding, verticalPadding)
        }
    },
    getAspectRatio(displayerData) {
        return displayerData.width / displayerData.height
    },
    getWrapperSize(newWidth, newHeight, horizontalPadding, verticalPadding) {
        const height = newHeight < 0 ? 0 : newHeight
        const width = newWidth < 0 ? 0 : newWidth
        return {
            imageWrapperHeight: height,
            imageWrapperWidth: width,
            imageWrapperMarginLeft: horizontalPadding || 0,
            imageWrapperMarginRight: horizontalPadding || 0,
            imageWrapperMarginTop: verticalPadding || 0,
            imageWrapperMarginBottom: verticalPadding || 0
        }
    }
}
module.exports = matrixScalingCalculations