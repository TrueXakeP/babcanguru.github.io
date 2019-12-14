'use strict'

const _ = require('lodash')
const htmlTransformer = require('./htmlTransformer')

const IMAGE_WHITE_LIST_ATTRIBUTES = ['src', 'style', 'wix-comp']
const FORBIDDEN_TAGS = ['script', 'iframe', 'embed', 'object', 'meta']
const SENSITIVE_ATTRIBUTES = ['href', 'src', 'style']
const FORBIDDEN_TAGS_AND_ATTRIBUTES = ['script', 'iframe', 'embed', 'object', 'meta', 'expression', 'id', 'comp', 'dataquery', 'propertyquery', 'styleid', 'skin',
    'skinpart', 'y', 'x', 'scale', 'angle', 'idprefix', 'state', 'container', 'listposition', 'hasproxy', 'vcfield', 'vcview', 'vctype', 'pos', 'onabort',
    'onactivate', 'onafterprint', 'onafterupdate', 'onbeforeactivate', 'onbeforecopy', 'onbeforecut', 'onbeforedeactivate', 'onbeforeeditfocus',
    'onbeforepaste', 'onbeforeprint', 'onbeforeunload', 'onbeforeupdate', 'onbegin', 'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick',
    'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavailable', 'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate',
    'ondrag', 'ondragend', 'ondragleave', 'ondragenter', 'ondragover', 'ondragdrop', 'ondragstart', 'ondrop', 'onend', 'onerror',
    'onerrorupdate', 'onfilterchange', 'onfinish', 'onfocus', 'onfocusIn', 'onfocusout', 'onhashchange', 'onhelp', 'oninput', 'onkeydown',
    'onkeypress', 'onkeyup', 'onlayoutcomplete', 'onload', 'onlosecapture', 'onmediacomplete', 'onmediaerror', 'onmessage', 'onmousedown',
    'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onmove', 'onmoveend',
    'onmovestart', 'onoffline', 'ononline', 'onoutofsync', 'onpaste', 'onpause', 'onpopstate', 'onprogress', 'onpropertychange',
    'onreadystatechange', 'onredo', 'onrepeat', 'onreset', 'onresize', 'onresizeend', 'onresizestart', 'onresume', 'onreverse', 'onrowsenter',
    'onrowexit', 'onrowdelete', 'onrowinserted', 'onscroll', 'onseek', 'onselect', 'onselectionchange', 'onselectstart', 'onstart', 'onstop',
    'onstorage', 'onsyncrestored', 'onsubmit', 'ontimeerror', 'ontrackchange', 'onundo', 'onunload', 'onurlflip', 'seeksegmenttime'
]

function shouldTagBeRemoved(tag) {
    return _.some(FORBIDDEN_TAGS, v => tag.toLowerCase() === v)
}

function getAttributesNames(attributes) {
    return _.map(attributes, a => a.name.toLowerCase())
}

function getForbiddenImageAttributesNames(attributes) {
    const attributesNames = getAttributesNames(attributes)
    return _.difference(attributesNames, IMAGE_WHITE_LIST_ATTRIBUTES)
}

function getForbiddenBaseAttributesNames(tag) {
    if (tag.toLowerCase() === 'a') {
        return _.without(FORBIDDEN_TAGS_AND_ATTRIBUTES, 'dataquery')
    }
    return FORBIDDEN_TAGS_AND_ATTRIBUTES
}

function isImageNode(tag) {
    return tag.toLowerCase() === 'img'
}

function removeForbiddenValuesFromSensitiveAttributes(attributes) {
    return _.reject(attributes, attribute =>
        _.includes(SENSITIVE_ATTRIBUTES, attribute.name.toLowerCase()) && !!/script|expression/.test(attribute.escaped.toLowerCase()))
}

function removeForbiddenAttributes(tag, attributes) {
    const attrs2remove = isImageNode(tag) ? getForbiddenImageAttributesNames(attributes) : getForbiddenBaseAttributesNames(tag)
    return _.reject(attributes, attribute => _.includes(attrs2remove, attribute.name.toLowerCase()))
}

function normalizeStartTag(tag, attributes, selfClosing) {
    if (shouldTagBeRemoved(tag)) {
        return null
    }
    attributes = removeForbiddenAttributes(tag, attributes)
    attributes = removeForbiddenValuesFromSensitiveAttributes(attributes)
    return {
        tag,
        attributes,
        selfClosing
    }
}

/**
 * @param {string} tag
 * @return {null|string}
 */
function normalizeEndTag(tag) {
    return shouldTagBeRemoved(tag) ? null : tag
}

function removeComment() {
    return ''
}

/**
 * @param {string} text
 * @param {string} startTag
 * @return {string}
 */
function handleChars(text, startTag) {
    return _.includes(FORBIDDEN_TAGS, startTag.toLowerCase()) ? '' : text
}

function fixSecurityIssuesInText(textData) {
    const handler = {
        start: normalizeStartTag,
        end: normalizeEndTag,
        comment: removeComment,
        chars: handleChars
    }
    textData.text = htmlTransformer.transformHTMLString(textData.text, handler)
    return textData
}

module.exports = {
    /**
     * @param {object} textData
     * @returns {*}
     */
    fixSecurityIssuesInText
}