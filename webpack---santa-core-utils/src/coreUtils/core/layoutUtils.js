'use strict'

const _ = require('lodash')
const siteConstants = require('./siteConstants')
const style = require('./style')
const boundingLayout = require('./boundingLayout')
const dockUtils = require('./dockUtils')

function isVerticallyDocked(layout) {
    return (
        layout &&
        layout.docked &&
        (layout.docked.vCenter || layout.docked.bottom || layout.docked.top)
    )
}

function isHorizontallyDocked(layout) {
    return (
        layout &&
        layout.docked &&
        (layout.docked.hCenter || layout.docked.left || layout.docked.right)
    )
}

function calcAspectRatio(width, height) {
    return parseFloat((height / width).toFixed(5))
}

function isAspectRatioOn(layout) {
    return !_.isUndefined(layout.aspectRatio)
}

function isDockedToDirection(layout, direction) {
    return Boolean(layout && layout.docked && layout.docked[direction])
}

function getDockToDirection(layout, direction) {
    return layout && layout.docked && layout.docked[direction]
}

function getVerticallyCenteredDockData(layout) {
    return getDockToDirection(layout, 'vCenter')
}

function getTopDockData(layout) {
    return getDockToDirection(layout, 'top')
}

function getBottomDockData(layout) {
    return getDockToDirection(layout, 'bottom')
}

function isVerticallyStretched(layout) {
    return Boolean(
        layout && layout.docked && (layout.docked.bottom && layout.docked.top)
    )
}

function isVerticallyCentered(layout) {
    return _.has(layout, ['docked', 'vCenter'])
}

function isVerticallyStretchedToScreen(layout) {
    return (
        _.has(layout, ['docked', 'bottom', 'vh']) &&
        _.has(layout, ['docked', 'top', 'vh'])
    )
}

function isHorizontallyStretchedToScreen(layout) {
    return (
        _.has(layout, ['docked', 'left', 'vw']) &&
        _.has(layout, ['docked', 'right', 'vw'])
    )
}

function isDockToScreen(layout) {
    return (
        isVerticallyStretchedToScreen(layout) ||
        isHorizontallyStretchedToScreen(layout)
    )
}

function isHorizontallyStretched(layout) {
    return (
        layout && layout.docked && (layout.docked.left && layout.docked.right)
    )
}

function enforceRange(value, min, max) {
    return value && Math.max(min, Math.min(max, value))
}

function getEmptyStyleObject() {
    return {
        top: '',
        bottom: '',
        left: '',
        right: '',
        width: '',
        height: '',
        position: ''
    }
}

function getDefaultStyle(layout) {
    const styleObject = getEmptyStyleObject()
    if (!layout) {
        return styleObject
    }

    if (!isVerticallyStretched(layout)) {
        styleObject.height = enforceRange(
            layout.height,
            siteConstants.COMP_SIZE.MIN_HEIGHT,
            siteConstants.COMP_SIZE.MAX_HEIGHT
        )
    }

    if (!isHorizontallyStretched(layout)) {
        styleObject.width = enforceRange(
            layout.width,
            siteConstants.COMP_SIZE.MIN_WIDTH,
            siteConstants.COMP_SIZE.MAX_WIDTH
        )
    }

    if (layout.fixedPosition) {
        styleObject.position = 'fixed'
    }

    if (layout.rotationInDegrees) {
        const prefixedTransform = style.getPrefixedTransform()
        styleObject[prefixedTransform] = `rotate(${
            layout.rotationInDegrees
        }deg)`
    }

    return styleObject
}

function getDockedStyle(docking, width) {
    const unitMap = {
        pct: '%',
        px: 'px',
        vw: 'vw'
    }
    const marginMap = {
        left: 'marginLeft',
        hCenter: 'marginLeft',
        right: 'marginRight'
    }
    const toUnits = (v, k) => {
        const asStrings = _(v)
            .map((val, key) => val && `${val}${unitMap[key]}`)
            .concat(k === 'hCenter' && ['50%', `${-width / 2}px`])
            .reject(a => !a)
            .value()
        switch (_.size(asStrings)) {
            case 0:
                return 0
            case 1:
                return _.head(asStrings)
            default:
                return `calc(${_.join(asStrings, ' + ')})`
        }
    }

    const margins = _(docking)
        .map(
            (val, key) =>
            marginMap[key] ? {
                [marginMap[key]]: toUnits(val, key),
                [key === 'hCenter' ? 'left' : key]: 0
            } : {
                [key]: toUnits(val, key)
            }
        )
        .reduce(_.assign)
    const widthComputation =
        docking.left &&
        docking.right &&
        _([docking.left, docking.right])
        .flatMap(_.toPairs)
        .reduce(
            (combined, value) =>
            _.assign({}, combined, {
                [value[0]]: _.defaultTo(combined[value[0]], 0) - value[1]
            }), {
                pct: 100
            }
        )

    return _.assign(
        margins,
        widthComputation && {
            width: toUnits(widthComputation)
        }
    )
}

function getAbsoluteStyle(layout, getScreenLayout, styleObject) {
    styleObject.position =
        styleObject.position || _.get(layout, 'position', 'absolute')
    if (!layout) {
        return styleObject
    }

    if (!isHorizontallyDocked(layout)) {
        styleObject.left = layout.x
    }

    if (!isVerticallyDocked(layout)) {
        styleObject.top = layout.y
    }

    if (!layout.docked) {
        return styleObject
    }

    const screenLayout = getScreenLayout()
    const verticalDockingLayout = _.defaults({
            docked: _.pick(layout.docked, ['top', 'bottom', 'vCenter'])
        },
        layout
    )
    dockUtils.applyDockedStyleWithMargins(
        verticalDockingLayout,
        styleObject,
        screenLayout.pageMargins,
        screenLayout.screenWidth,
        screenLayout.siteWidth,
        screenLayout.siteX,
        screenLayout.screenHeight
    )
    _.assign(
        styleObject,
        getDockedStyle(
            _.pick(layout.docked, ['left', 'right', 'hCenter']),
            layout.width
        )
    )

    return styleObject
}

function getStyle(layout, getScreenLayout, layoutMechanism) {
    const defaultStyle = getDefaultStyle(layout)
    const isFixed = _.get(layout, 'fixedPosition', false) === true
    const isPinned = isFixed && !!_.get(layout, 'docked', false)
    if (layoutMechanism === siteConstants.LAYOUT_MECHANISMS.MESH && isPinned) {
        return _.omit(defaultStyle, 'position')
    }
    if (layoutMechanism === siteConstants.LAYOUT_MECHANISMS.ANCHORS || isFixed) {
        return getAbsoluteStyle(layout, getScreenLayout, defaultStyle)
    }

    return defaultStyle
}

function getBoundingLayoutForComponent(measureMap, nodesMap, component) {
    const compNode = nodesMap[component.id]

    return boundingLayout.getBoundingLayout({
        x: compNode.offsetLeft,
        y: compNode.offsetTop,
        width: numberOr(measureMap.width[component.id], compNode.offsetWidth),
        height: numberOr(
            measureMap.height[component.id],
            compNode.offsetHeight
        ),
        rotationInDegrees: component.layout.rotationInDegrees
    })
}

function getComponentsBottomY(
    measureMap,
    nodesMap,
    components,
    shouldRunRecursively,
    parentTop
) {
    return _(components)
        .reject({
            layout: {
                fixedPosition: true
            }
        })
        .filter(function(component) {
            return !!nodesMap[component.id]
        })
        .reduce(function(maxBottom, component) {
            const layout = getBoundingLayoutForComponent(
                measureMap,
                nodesMap,
                component
            )
            const compTop = parentTop + layout.y
            const compBottom = compTop + layout.height
            const childrenBottom = shouldRunRecursively ?
                getComponentsBottomY(
                    measureMap,
                    nodesMap,
                    component.components,
                    shouldRunRecursively,
                    compTop
                ) :
                compBottom

            return Math.max(maxBottom, compBottom, childrenBottom)
        }, 0)
}

function getPageComponents(isMobileView, serializedComp) {
    return isMobileView ?
        serializedComp.structure.mobileComponents :
        serializedComp.structure.components
}

function getPageBottomChildEnd(
    measureMap,
    nodesMap,
    isMobileView,
    serializedComp
) {
    return getComponentsBottomY(
        measureMap,
        nodesMap,
        getPageComponents(isMobileView, serializedComp),
        false,
        0
    )
}

function getLayoutMechanism(siteData, isExperimentOpen) {
    const forcedLayoutMechanism = siteData.getRequestedLayoutMechanism()
    if (forcedLayoutMechanism) {
        return forcedLayoutMechanism
    }
    if (!isExperimentOpen('sv_meshLayout') || !siteData.browserFlags().cssGridSupported) {
        return siteConstants.LAYOUT_MECHANISMS.ANCHORS
    }
    const layoutSettings = siteData.getMasterPageLayoutSettings()
    if (_.has(layoutSettings, 'mechanism')) {
        return layoutSettings.mechanism
    }
    return siteData.getSiteMeshReadyFallbackFlag() ?
        siteConstants.LAYOUT_MECHANISMS.MESH :
        siteConstants.LAYOUT_MECHANISMS.ANCHORS
}

function numberOr(n, elseValue) {
    return _.isNumber(n) ? n : elseValue
}

function getRootWidth(measureMap, rootId, siteWidth) {
    return numberOr(measureMap.width[`ROOT_${rootId}`], siteWidth)
}

function getRootLeft(measureMap, rootId, siteX) {
    return numberOr(measureMap.left[`ROOT_${rootId}`] || 0, -siteX)
}

function stretchInCenteredContainer(containerWidth, compWidth) {
    return {
        left: Math.min(0, Math.floor((containerWidth - compWidth) / 2)),
        width: Math.max(containerWidth, compWidth)
    }
}

module.exports = {
    isDockToScreen,
    isVerticallyDocked,
    isDockedToDirection,
    getBottomDockData,
    getDockToDirection,
    getTopDockData,
    getVerticallyCenteredDockData,
    isVerticallyStretched,
    isVerticallyCentered,
    isVerticallyStretchedToScreen,
    isHorizontallyDocked,
    isHorizontallyStretched,
    isAspectRatioOn,
    calcAspectRatio,
    getStyle,
    getRootLeft,
    getRootWidth,
    getPageBottomChildEnd,
    getLayoutMechanism,
    stretchInCenteredContainer
}