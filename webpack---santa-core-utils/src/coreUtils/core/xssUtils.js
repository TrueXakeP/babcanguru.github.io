'use strict'

const _ = require('lodash')
const xss = require('xss')
const htmlParser = require('./htmlParser')

const ADDITIONAL_ALLOWED_ATTRIBUTES = ['style', 'class', 'dir', 'wix-comp', 'role']

const IFRAME_TAG_WHITE_LIST = {
    iframe: ['frameborder', 'height', 'width', 'src', 'marginheight', 'marginwidth', 'name', 'scrolling', 'longdesc'].concat(ADDITIONAL_ALLOWED_ATTRIBUTES)
}

const HEAD_TAG_WHITE_LIST = {
    meta: ['content', 'property', 'scheme', 'name', 'charset', 'id', 'http-equiv', 'accesskey', 'dir', 'lang', 'title'].concat(ADDITIONAL_ALLOWED_ATTRIBUTES),
    link: ['rel', 'href'].concat(ADDITIONAL_ALLOWED_ATTRIBUTES)
}

const DEFAULT_WHITELIST = generateDefaultWhiteList()

Object.freeze(ADDITIONAL_ALLOWED_ATTRIBUTES)
Object.freeze(IFRAME_TAG_WHITE_LIST)
Object.freeze(HEAD_TAG_WHITE_LIST)
Object.freeze(DEFAULT_WHITELIST)

function generateDefaultWhiteList() {
    const retVal = _.assign({}, xss.whiteList)

    const additionalSecureTags = {
        strike: [],
        hatul: [],
        wline: []
    }

    _.assign(retVal, additionalSecureTags)

    retVal.a.push('data-anchor')
    retVal.a.push('dataquery')
    retVal.a.push('data-content')
    retVal.a.push('data-no-physical-url')
    retVal.a.push('data-type')
    retVal.a.push('id')
    retVal.a.push('rel')

    _.forOwn(retVal, function enableStyleAndClass(tag) {
        tag.push.apply(tag, ADDITIONAL_ALLOWED_ATTRIBUTES)
    })

    return retVal
}

function configureCssFilter(xssObj) {
    const cssPropsWhiteList = [
        'color',
        'background-color',
        'font-size',
        'font-family',
        'font-style',
        'text-decoration',
        'line-height',
        'text-shadow',
        'direction',
        'position',
        'z-index',
        'top',
        'left'
    ]

    _.forEach(cssPropsWhiteList, function enableCssProp(cssProp) {
        xssObj.cssFilter.options.whiteList[cssProp] = true
    })
}

configureCssFilter(xss)
Object.freeze(xss)

function isValidLinkAttributeValue(tag, attributeName, value) {
    if (tag === 'a' && attributeName === 'href') {
        if (/^tel:[^A-Za-z]+$/i.test(value)) {
            return true
        }
        if (/^ftp:\/\/[^\s]*$/.test(value)) {
            return true
        }
    }
    return false
}

function getSafeAttrValue(tag, name, value, cssFilter) {
    if (isValidLinkAttributeValue(tag, name, value)) {
        return value
    }
    return xss.safeAttrValue(tag, name, value, cssFilter)
}

function getHtmlAttribute(html, name) {
    let first = true
    let attr = []

    htmlParser(html, {
        start(tagName, attrs) {
            if (first) {
                attr = attrs
                first = false
            }
        }
    })
    return _.get(_.find(attr, {
        name
    }), 'value')
}

function filterHtmlString(componentHtml, options) {
    let scriptTagOpened = false
    options = options || {}
    const whiteList = _.assign({}, DEFAULT_WHITELIST)

    if (options.allowIframes) {
        _.assign(whiteList, IFRAME_TAG_WHITE_LIST)
    }

    if (options.allowHeadTags) {
        _.assign(whiteList, HEAD_TAG_WHITE_LIST)
    }

    function onIgnoreTag(tag, html, tagOptions) {
        const type = getHtmlAttribute(html, 'type')
        if (options.allowHeadTags && !tagOptions.isClosing && tag === 'script' && _.isEqual(type, 'application/ld+json')) {
            scriptTagOpened = true
            return '<script type="application/ld+json">'
        } else if (tagOptions.isClosing && scriptTagOpened) {
            scriptTagOpened = false
            return html
        }
        return ''
    }

    let safeHtmlString = xss(componentHtml, {
        whiteList,
        stripIgnoreTagBody: !options.allowHeadTags,
        safeAttrValue: function onAttrValue(tag, name, value, cssFilter) {
            const safeAttrValue = getSafeAttrValue(tag, name, value, cssFilter)
            return safeAttrValue ? safeAttrValue : ''
        },
        onIgnoreTag: options.allowHeadTags ? onIgnoreTag : undefined
    })

    if (options.allowOneSelfClosingMetaTag) {
        //this regex gets the first tag inside the string since we allow only a single self closing tag - ask maory
        safeHtmlString = safeHtmlString.replace(/(<meta[^<]*?)\s?\/?\s?>.*/, '$1 />')
    }

    return safeHtmlString
}

module.exports = {
    filterHtmlString
}