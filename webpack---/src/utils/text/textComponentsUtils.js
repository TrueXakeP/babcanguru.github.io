'use strict'

const _ = require('lodash')
const textTransforms = require('./textTransforms')
const coreUtils = require('santa-core-utils')

const anchorTagsGenerator = coreUtils.anchorTagsGenerator
const filterHtmlString = coreUtils.xssUtils.filterHtmlString


function convertDataQueryLinksIntoHtmlAnchors(text, linkList, renderLink) {
    if (!linkList) {
        return text
    }

    if (!renderLink) {
        return text.replace(/<a ([^>]*)dataquery="([^"]+)"([^>]*)>/g, function(full, preAttributes, dataQuery, postAttributes) {
            return filterHtmlString(`<a ${preAttributes}${_.map(linkList[dataQuery], (v, k) => `${k}="${v}"`).join(' ')}${postAttributes}>`)
        })
    }

    const links = _.transform(linkList, function(acc, linkData) {
        acc[`#${linkData.id}`] = linkData
    }, {})

    return text.replace(/<a ([^>]*)dataquery="([^"]+)"([^>]*)>/g, function(full, preAttributes, dataQuery, postAttributes) {
        const anchorData = renderLink(links[dataQuery])
        return filterHtmlString(`<a ${preAttributes}${_.map(anchorData, (v, k) => `${k}="${v}"`).join(' ')}${postAttributes}>`)
    })
}

function mobileTextTransformIfNeeded(text, options) {
    if (!options.isMobileView) {
        return text
    }

    text = textTransforms.applyMobileAdjustments(text, options)
    return text
}

function applyTextStyleMigrationAdjustments(htmlText, fontGetter) {
    return textTransforms.applyTextStyleMigrationAdjustments(htmlText, fontGetter)
}

function createImpliedLinks({
    isMobileView,
    htmlContent,
    useEarlyLinkCheck
}) {
    const includedPatterns = anchorTagsGenerator.getIncludedPatterns(null, isMobileView)
    return anchorTagsGenerator.generateAnchorsInHtml(htmlContent, includedPatterns, {
        useEarlyLinkCheck
    })
}

module.exports = {
    convertDataQueryLinksIntoHtmlAnchors,
    mobileTextTransformIfNeeded,
    createImpliedLinks,
    applyTextStyleMigrationAdjustments
}