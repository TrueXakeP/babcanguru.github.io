'use strict'
const _ = require('lodash')
const React = require('react')
const invalidAttributes = require('./invalidAttributes')
const invalidAttributesSet = Object.create(null)
const validTagsSet = Object.create(null)
let validTags = [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'big',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'menu',
    'menuitem',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
    'circle',
    'clipPath',
    'defs',
    'ellipse',
    'g',
    'image',
    'line',
    'linearGradient',
    'mask',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'stop',
    'svg',
    'text',
    'tspan'
]

const obsoleteElements = [
    'basefont',
    'font',
    'bgsound',
    'command',
    'nextid'
]

const wixCustomElements = [
    'wix-image',
    'wix-bg-image',
    'wix-bg-media',
    'wix-video',
    'wix-dropdown-menu'
]

validTags = _.concat(validTags, obsoleteElements, wixCustomElements)
_.forEach(validTags, attr => {
    validTagsSet[attr] = true
})

_.forEach(invalidAttributes, attr => {
    invalidAttributesSet[attr] = true
})

module.exports = (...args) => { //eslint-disable-line react/display-name
    const [element, props] = args

    if (_.isString(element)) {
        if (!validTagsSet[element]) {
            throw new Error(`The tag "${element}" is not a valid html tag, please check 'santaComponents.utils.createReactElement()'`)
        }

        if (props) {
            args[1] = _.pickBy(props, (value, key) => !invalidAttributesSet[key])
        }
    }

    return React.createElement(...args)
}