'use strict'

const _ = require('lodash')
const cssUtils = require('./cssUtils')

/**
 * @typedef {object} Style
 * @property {number} [height]
 * @property {number} [width]
 * @property {number} [left]
 * @property {number} [right]
 * @property {string} [margin]
 */

/**
 * @typedef {object} Margins
 * @property {number} [top]
 * @property {number} [bottom]
 */

/**
 * @typedef {object} DirectionUnit
 * @property {number} [vh]
 * @property {number} [px]
 * @property {number} [pst]
 * @property {number} [vw]
 */

/**
 * @typedef {object} Docked
 * @property {DirectionUnit} [top]
 * @property {DirectionUnit} [bottom]
 * @property {DirectionUnit} [left]
 * @property {DirectionUnit} [right]
 */

/**
 * @typedef {object} Layout
 * @property {Docked} [docked]
 * @property {number} [height]
 * @property {number} [width]
 * @property {number} [y]
 */

function doubleAllValues(dockedObj) {
    return _.mapValues(dockedObj, v => v * 2)
}

/**
 * @param {{px:number?}} dockedValueObj
 * @param {number} pagePadding
 */
function addPageMargin(dockedValueObj, pagePadding) {
    if (_.isNumber(dockedValueObj.px)) {
        dockedValueObj.px += pagePadding
    } else {
        dockedValueObj.px = pagePadding
    }
}

function isHorizontalDockToScreen(layout) {
    const dockedData = layout && layout.docked
    const isDockToScreenFromLeft = dockedData && dockedData.left && _.isFinite(dockedData.left.vw)
    const isDockToScreenFromRight = dockedData && dockedData.right && _.isFinite(dockedData.right.vw)

    return Boolean(isDockToScreenFromLeft && isDockToScreenFromRight)
}

function isFullPageComponent(layout) {
    const dockedData = layout && layout.docked
    const isDockToScreenFromLeft = _.get(dockedData, 'left.px') === 0
    const isDockToScreenFromRight = _.get(dockedData, 'right.px') === 0
    const isDockToScreenFromTop = _.get(dockedData, 'top.px') === 0
    const isDockToScreenFromBottom = _.get(dockedData, 'bottom.px') === 0

    return Boolean(isDockToScreenFromLeft && isDockToScreenFromRight && isDockToScreenFromTop && isDockToScreenFromBottom)
}

function isVerticallyDockToScreen(layout) {
    return _.has(layout, ['docked', 'top', 'vh']) && _.has(layout, ['docked', 'bottom', 'vh'])
}

function getScreenWidthCss(dockLeft, dockRight, screenWidth) {
    const widthUnitsData = {
        vw: 100 - dockLeft.vw - dockRight.vw
    }

    const offsetInPx = 0 - (dockLeft.px || 0) - (dockRight.px || 0)
    if (offsetInPx !== 0) {
        widthUnitsData.px = offsetInPx
    }

    return cssUtils.convertUnitsDataToCssStringValue(widthUnitsData, screenWidth)
}

function getScreenHeightCss(dockTop, dockBottom, screenHeight) {
    const heightUnitsData = {
        vh: 100 - dockTop.vh - dockBottom.vh
    }

    const offsetInPx = 0 - (dockTop.px || 0) - (dockBottom.px || 0)
    if (offsetInPx !== 0) {
        heightUnitsData.px = offsetInPx
    }

    return cssUtils.convertUnitsDataToCssStringValue(heightUnitsData, screenHeight)
}

function updateStyleObjectForHorizontalDockToScreen(dockedData, styleObject, screenWidth, siteX) {
    const leftDockData = _.clone(dockedData.left)
    leftDockData.px = (leftDockData.px || 0) + siteX
    styleObject.left = cssUtils.convertUnitsDataToCssStringValue(leftDockData, screenWidth)
    styleObject.width = getScreenWidthCss(dockedData.left, dockedData.right, screenWidth)
}

function updateStyleObjectForVerticalDockToScreen(dockedData, styleObject, screenHeight, structureY) {
    styleObject.top = cssUtils.convertUnitsDataToCssStringValue({
        px: structureY
    }, screenHeight)
    styleObject.height = getScreenHeightCss(dockedData.top, dockedData.bottom, screenHeight)
}

/**
 * @param {Layout} layout
 * @param {Style} style
 * @param {number} screenWidth
 * @param {number} siteX
 */
function updateStyleAccordingToHorizontalDockedLayout(layout, style, screenWidth, siteX) {
    if (layout.docked.hCenter) {
        style.left = cssUtils.convertUnitsDataToCssStringValue(doubleAllValues(layout.docked.hCenter), screenWidth) //double values because in css, the margin is split to both sides when it has auto and left value
        style.right = 0
        style.margin = 'auto'
        return
    }

    if (isHorizontalDockToScreen(layout)) {
        updateStyleObjectForHorizontalDockToScreen(layout.docked, style, screenWidth, siteX)
        return
    }

    if (layout.docked.left) {
        style.left = cssUtils.convertUnitsDataToCssStringValue(layout.docked.left, screenWidth)
    }

    if (layout.docked.right) {
        style.right = cssUtils.convertUnitsDataToCssStringValue(layout.docked.right, screenWidth)
    }
}

function updateStyleVerticalPosition(layout, style, screenHeight, direction, pageMargins) {
    const dockedDirectionObj = _.clone(layout.docked[direction])
    if (layout.fixedPosition) {
        addPageMargin(dockedDirectionObj, pageMargins[direction] || 0)
    }
    style[direction] = cssUtils.convertUnitsDataToCssStringValue(dockedDirectionObj, screenHeight)
}

function updateStyleAccordingToVerticalDockedLayout(layout, style, pageMargins, screenWidth, screenHeight) {
    if (layout.docked.vCenter) {
        style.top = cssUtils.convertUnitsDataToCssStringValue(doubleAllValues(layout.docked.vCenter), screenWidth) //double values because in css, the margin is split to both sides when it has auto and left value
        style.bottom = 0
        style.marginTop = 'auto'
        style.marginBottom = 'auto'
        return
    }

    if (isVerticallyDockToScreen(layout)) {
        updateStyleObjectForVerticalDockToScreen(layout.docked, style, screenHeight, layout.y)
        return
    }

    if (isVerticallyStretched(layout)) {
        style.height = ''
    }

    if (layout.docked.top) {
        updateStyleVerticalPosition(layout, style, screenHeight, 'top', pageMargins)
    }

    if (layout.docked.bottom) {
        updateStyleVerticalPosition(layout, style, screenHeight, 'bottom', pageMargins)
    }
}

/**
 * @param {Layout} layout
 * @param {Style} style
 * @param {Margins} pageMargins
 * @param {number} screenWidth
 * @param {number} siteWidth
 * @param {number} siteX
 * @param {number?} screenHeight
 * @returns {Style}
 */
function updateStyleAccordingToDockedLayout(layout, style, pageMargins, screenWidth, siteWidth, siteX, screenHeight) {
    screenWidth = Math.max(screenWidth, siteWidth)
    updateStyleAccordingToHorizontalDockedLayout(layout, style, screenWidth, siteX)
    updateStyleAccordingToVerticalDockedLayout(layout, style, pageMargins, screenWidth, screenHeight)
    return style
}

function isHorizontallyStretched(layout) {
    const dockedData = layout && layout.docked
    return !!(dockedData && dockedData.left && dockedData.right)
}

function isVerticallyStretched(layout) {
    const dockedData = layout && layout.docked
    return !!(dockedData && dockedData.top && dockedData.bottom)
}

function isStretched(layout) {
    return isHorizontallyStretched(layout) || isVerticallyStretched(layout)
}

/**
 * @param {Layout} layout
 * @param {number} pageBottomMargin
 * @param {number} screenWidth
 * @param {number} siteWidth
 * @param {number} siteX
 * @returns {Style}
 */
function getDockedStyle(layout, pageBottomMargin, screenWidth, siteWidth, siteX) {
    return applyDockedStyle(layout, {}, pageBottomMargin, screenWidth, siteWidth, siteX)
}

/**
 *
 * @param {Layout} layout
 * @param {Style} style
 * @param {number} pageBottomMargin
 * @param {number} [screenWidth]
 * @param {number} siteWidth
 * @param {number} [siteX] only required for screen-width docked comps.. should probably refactor
 * @param {number} [screenHeight]
 * @returns {Style}
 */
function applyDockedStyle(layout, style, pageBottomMargin, screenWidth, siteWidth, siteX, screenHeight) {
    if (!layout.docked) {
        throw new Error('Layout must have docked structure')
    }
    return updateStyleAccordingToDockedLayout(layout, style, {
        bottom: pageBottomMargin
    }, screenWidth, siteWidth, siteX, screenHeight)
}

/**
 * @param {Layout} layout
 * @param {Margins} pageMargins
 * @param {number} screenWidth
 * @param {number} siteWidth
 * @param {number} siteX
 * @returns {Style}
 */
function getDockedStyleWithMargins(layout, pageMargins, screenWidth, siteWidth, siteX) {
    return applyDockedStyle(layout, {}, pageMargins, screenWidth, siteWidth, siteX)
}


/**
 *
 * @param {Layout} layout
 * @param {Style} style
 * @param {Margins} pageMargins
 * @param {number} [screenWidth]
 * @param {number} siteWidth
 * @param {number} [siteX] only required for screen-width docked comps.. should probably refactor
 * @param {number} [screenHeight]
 * @returns {Style}
 */
function applyDockedStyleWithMargins(layout, style, pageMargins, screenWidth, siteWidth, siteX, screenHeight) {
    if (!layout.docked) {
        throw new Error('Layout must have docked structure')
    }
    return updateStyleAccordingToDockedLayout(layout, style, pageMargins, screenWidth, siteWidth, siteX, screenHeight)
}

module.exports = {
    addPageMargin,
    isHorizontalDockToScreen,
    isVerticallyDockToScreen,
    isHorizontallyStretched,
    isVerticallyStretched,
    isFullPageComponent,
    isStretched,
    getDockedStyle,
    applyDockedStyle,
    getDockedStyleWithMargins,
    applyDockedStyleWithMargins
}