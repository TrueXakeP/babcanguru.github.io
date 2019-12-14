'use strict'

const _ = require('lodash')
const htmlParser = require('./htmlParser')

/**
 * @param {object} attributes
 * @returns {string}
 */
function getAttributesString(attributes) {
    return _.reduce(attributes, (result, attrObj) => `${result} ${attrObj.name}="${attrObj.escaped}" `, '')
}

function transformHTMLString(html, handler) {
    let htmlResult = ''
    let currentTag = ''

    htmlParser(html, {
        start(tag, attributes, selfClosing) {
            let result = {
                tag,
                attributes,
                selfClosing
            }
            currentTag = selfClosing ? '' : tag
            if (handler.start) {
                result = handler.start(tag, attributes, selfClosing)
            }
            if (result) {
                htmlResult += `<${result.tag}${getAttributesString(result.attributes)}${result.selfClosing ? '/>' : '>'}`
            }
        },
        end(tag) {
            if (handler.end) {
                tag = handler.end(tag)
            }
            currentTag = ''
            if (tag) {
                htmlResult += `</${tag}>`
            }
        },
        chars(text) {
            if (handler.chars) {
                text = handler.chars(text, currentTag)
            }
            htmlResult += text
        },
        comment(text) {
            if (handler.comment) {
                text = handler.comment(text)
            }
            if (text) {
                htmlResult += `<!--${text}-->`
            }
        }
    })

    return htmlResult
}

module.exports = {
    /**
     * @param {string} html
     * @param {object} handler
     * @returns {*}
     */
    transformHTMLString
}