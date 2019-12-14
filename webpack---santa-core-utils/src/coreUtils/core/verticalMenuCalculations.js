'use strict'

const _ = require('lodash')

function getFixedHeight(originalHeight, separator, separatorNotIncluded, borderNotIncluded, menuItemsCount) {
    return originalHeight + (borderNotIncluded ? 1 : menuItemsCount) * separator + (separatorNotIncluded ? 2 : 0)
}

function getLineHeight(itemHeight, separator, border, skinExports) {
    const borderNotIncludedInLineHeight = skinExports && skinExports.borderNotIncludedInLineHeight
    const separatorNotIncludedInLineHeight = skinExports && skinExports.separatorNotIncludedInLineHeight

    const calcBorder = borderNotIncludedInLineHeight ? border * 2 : 0
    const calcSeparator = separatorNotIncludedInLineHeight ? separator : 0
    const lineHeight = itemHeight - calcBorder - calcSeparator

    return lineHeight + 2
}

function getItemHeight(compHeight, separatorHeight, length, skinExports) {
    const borderNotIncludedInLineHeight = skinExports && skinExports.borderNotIncludedInLineHeight
    const separatorNotIncludedInLineHeight = skinExports && skinExports.separatorNotIncludedInLineHeight

    return Math.floor((compHeight - separatorHeight * (borderNotIncludedInLineHeight ? 0 : length - 1) - (separatorNotIncludedInLineHeight ? 2 : 0)) / length)
}

function getVisibleItemsCount(siteMenu) {
    return _.filter(siteMenu, 'isVisible').length
}

module.exports = {
    getFixedHeight,
    getLineHeight,
    getItemHeight,
    getVisibleItemsCount
}