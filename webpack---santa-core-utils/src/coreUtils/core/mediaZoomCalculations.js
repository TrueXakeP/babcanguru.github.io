'use strict'

const DIALOG_BOX_MIN_WIDTH = 600
const MIN_PANEL_HEIGHT = 20

const DESKTOP_VIEW_DEFAULTS = {
    marginTop: 0,
    paddingTop: 0,
    dialogBoxHeight: 600,
    imageContainerWidth: 500,
    imageContainerHeight: 500
}

const DESKTOP_DEFAULT_PADDING = {
    vertical: 10,
    horizontal: 20
}

const NON_OPTIMIZED_DEFAULT_PADDING = {
    vertical: 15,
    horizontal: 15
}

const MOBILE_VIEW_DEFAULTS = {
    marginTop: 0,
    paddingTop: 0,
    dialogBoxHeight: 400,
    imageContainerWidth: 320,
    imageContainerHeight: 400
}

function getImageContainerDimensions(imageData, maxImageWidth, maxImageHeight, minImageContainerWidth) {
    const wScale = maxImageWidth / imageData.width
    const hScale = maxImageHeight / imageData.height
    const targetScale = Math.min(wScale, hScale)
    return {
        width: Math.max(Math.round(imageData.width * targetScale), minImageContainerWidth),
        height: Math.round(imageData.height * targetScale)
    }
}

function getDimensionsForImageAndBox(imageData, maxImageWidth, maxImageHeight, panelHeight, minBoxWidth, screenHeight, screenWidth, dialogBoxPadding) {
    panelHeight = panelHeight || 0
    dialogBoxPadding = dialogBoxPadding || {}

    const imageContainer = getImageContainerDimensions(imageData, maxImageWidth, maxImageHeight, minBoxWidth)

    const dialogBoxWidth = imageContainer.width + (dialogBoxPadding.horizontal || 0)
    const dialogBoxHeight = imageContainer.height + panelHeight + (dialogBoxPadding.vertical || 0)
    const marginLeft = Math.ceil(Math.max((screenWidth - dialogBoxWidth) / 2, 0))
    const distanceFromTop = Math.ceil(Math.max((screenHeight - dialogBoxHeight) / 2, 0))


    return {
        marginLeft,
        marginTop: distanceFromTop,
        paddingTop: distanceFromTop,
        dialogBoxHeight,
        dialogBoxWidth,
        imageContainerWidth: imageContainer.width,
        imageContainerHeight: imageContainer.height
    }
}

const mediaZoomCalculations = {

    /**
     * Calculates the correct measurements for media zoom component for desktop view and non optimized view
     * (mobile device in not mobile view or tablet device)
     *
     * @param compData
     * @param siteDataInformation
     * @param screenMeasures
     * @param spacers
     * @param panelHeight
     * @param dialogBoxPadding
     * @returns {{marginTop: (number),{paddingTop: (number), dialogBoxHeight: (number), imageContainerWidth: (number), imageContainerHeight: (number)}}
     */
    getDesktopViewDimensions(compData, siteDataInformation, screenMeasures, spacers, panelHeight, dialogBoxPadding) {
        let maxImageWidth, maxImageHeight, screenWidth, screenHeight
        dialogBoxPadding = dialogBoxPadding || DESKTOP_DEFAULT_PADDING
        panelHeight = panelHeight || MIN_PANEL_HEIGHT
        let dimensions = DESKTOP_VIEW_DEFAULTS
        if (screenMeasures && compData.width && compData.height) {
            screenWidth = screenMeasures.width
            screenHeight = screenMeasures.height

            maxImageWidth = screenWidth - spacers.width - dialogBoxPadding.horizontal
            maxImageHeight = screenHeight - spacers.height / 2 - panelHeight - dialogBoxPadding.vertical

            if (!siteDataInformation.isMobileDevice && !siteDataInformation.isTabletDevice) {
                maxImageWidth = Math.min(compData.width, maxImageWidth)
                maxImageHeight = Math.min(compData.height, maxImageHeight)
            }

            dimensions = getDimensionsForImageAndBox(compData, maxImageWidth, maxImageHeight, panelHeight,
                DIALOG_BOX_MIN_WIDTH, screenHeight, screenWidth, dialogBoxPadding)
        }

        return dimensions
    },

    // widthSpacer and heightSpacer are defined in mediaZoom and are 0 for non desktop devices
    getNonOptimizedViewDimensions(imageData, siteDataInformation, screenMeasures, spacers, panelHeight, dialogBoxPadding) {
        if (!screenMeasures) {
            return DESKTOP_VIEW_DEFAULTS
        }

        dialogBoxPadding = dialogBoxPadding && (dialogBoxPadding.vertical || dialogBoxPadding.horizontal) ? dialogBoxPadding : NON_OPTIMIZED_DEFAULT_PADDING
        panelHeight = panelHeight || 0

        const screenWidth = screenMeasures.width
        const screenHeight = screenMeasures.height

        const maxImageWidth = Math.min(imageData.width, screenWidth - 2 * dialogBoxPadding.horizontal)
        const maxImageHeight = Math.min(imageData.height, screenHeight - 2 * dialogBoxPadding.vertical)

        const imageContainer = getImageContainerDimensions(imageData, maxImageWidth, maxImageHeight, DIALOG_BOX_MIN_WIDTH)

        const dialogBoxWidth = screenWidth - 2 * dialogBoxPadding.horizontal
        const dialogBoxHeight = imageContainer.height + panelHeight

        const marginLeft = dialogBoxPadding.horizontal
        const distanceFromTop = Math.ceil(Math.max((screenHeight - dialogBoxHeight) / 2, dialogBoxPadding.vertical))

        return {
            marginLeft,
            marginTop: distanceFromTop,
            paddingTop: distanceFromTop,
            dialogBoxHeight,
            dialogBoxWidth,
            imageContainerWidth: imageContainer.width,
            imageContainerHeight: imageContainer.height
        }
    },

    getMobileViewDimensions(compData, siteWidth, measureMap) {
        let maxWidth, maxHeight, screenWidth, screenHeight, siteStructureWidth

        let dimensions = MOBILE_VIEW_DEFAULTS
        if (measureMap) {
            screenWidth = measureMap.width.screen
            screenHeight = measureMap.innerHeight.screen
            siteStructureWidth = siteWidth.getSiteWidth ? siteWidth.getSiteWidth() : siteWidth // TODO Or Granit 16/08/2018: get rid of trinary

            maxWidth = Math.min(compData.width, Math.max(screenWidth, siteStructureWidth))
            maxHeight = Math.min(compData.height, screenHeight)

            dimensions = getDimensionsForImageAndBox(compData, maxWidth, maxHeight, 0, 0, screenHeight, screenWidth)
        }

        return dimensions
    }
}

module.exports = mediaZoomCalculations