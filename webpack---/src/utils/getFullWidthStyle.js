'use strict'

const _ = require('lodash')

const getDock = (docked, dir, units = 'px') => _.get(docked, [dir, units], 0)

const isStretchedUsingDock = docked => _.hasIn(docked, ['left']) && _.hasIn(docked, ['right'])

const hasPxMargins = docked => getDock(docked, 'left', 'px') > 0 || getDock(docked, 'right', 'px') > 0

const hasVWMargins = docked => getDock(docked, 'left', 'vw') > 0 || getDock(docked, 'right', 'vw') > 0

const getDockedLeftMargin = docked => {
    if (hasPxMargins(docked)) {
        return `${getDock(docked, 'left')}px`
    }

    if (hasVWMargins(docked)) {
        return `${getDock(docked, 'left', 'vw')}vw`
    }

    return null
}

const getStretchedLeftMargin = docked => {
    if (!isStretchedUsingDock(docked)) {
        return '0'
    }

    const dockedLeftMargin = getDockedLeftMargin(docked)

    return dockedLeftMargin || '0'
}

const getDockedMarginsSum = docked => {
    if (hasPxMargins(docked)) {
        const pxMargins = getDock(docked, 'left') + getDock(docked, 'right')
        return `${pxMargins}px`
    }

    if (hasVWMargins(docked)) {
        const vwMargins = getDock(docked, 'left', 'vw') + getDock(docked, 'right', 'vw')
        return `${vwMargins}vw`
    }

    return null
}

const getStretchedWidth = docked => {
    if (!isStretchedUsingDock(docked)) {
        return '100%'
    }

    const dockedMarginsSum = getDockedMarginsSum(docked)

    return dockedMarginsSum ? `calc(100% - ${dockedMarginsSum})` : '100%'
}

function getFullWidthStyle(isMobileView, siteWidth, docked) {
    if (isMobileView) {
        return {
            left: '0',
            marginLeft: '0',
            width: `${siteWidth}px`
        }
    }

    return {
        left: '0',
        marginLeft: getStretchedLeftMargin(docked),
        width: getStretchedWidth(docked),
        minWidth: !docked ? `${siteWidth}px` : 'initial'
    }
}

module.exports = getFullWidthStyle