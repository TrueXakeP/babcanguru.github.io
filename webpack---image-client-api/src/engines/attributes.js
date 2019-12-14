'use strict'
const constants = require('../helpers/imageServiceConstants')
const imageServiceUtils = require('../helpers/imageServiceUtils')
const backgroundAttributes = require('../engines/attributes/backgroundAttributes')
const imgAttributes = require('../engines/attributes/imgAttributes')
const SVGAttributes = require('../engines/attributes/SVGAttributes')
const imgPolyfillAttributes = require('../engines/attributes/imgPolyfillAttributes')

/**
 * get CSS or SVG attributes to be used in the browser
 * @param {object}                  transformsObj    transform parts object
 * @param {ImageTransformTarget}    target
 *
 * @returns object
 */
function getAttributes(transformsObj, target) {
    let attributesGetter

    if (target.htmlTag === constants.htmlTag.BG) {
        attributesGetter = backgroundAttributes
    } else if (target.htmlTag === constants.htmlTag.SVG) {
        attributesGetter = SVGAttributes
    } else if (imageServiceUtils.isObjectFitBrowserSupport()) {
        attributesGetter = imgAttributes
    } else {
        attributesGetter = imgPolyfillAttributes
    }

    return attributesGetter.get(transformsObj, target)
}

module.exports = {
    getAttributes
}