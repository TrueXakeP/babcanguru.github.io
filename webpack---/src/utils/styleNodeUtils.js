'use strict'
const _ = require('lodash')
const createReactElement = require('./createReactElement')


const generateStyleNode = (id, content, styleRoot) => {
    if (styleRoot) {
        content = _.map(content.trim().split('\n'), function(line) {
            const lineParts = line.split('{')
            const selectorParts = lineParts[0].split(',')
            lineParts[0] = _.map(selectorParts, function(part) {
                return `${styleRoot} ${part}`
            })
            return lineParts.join('{')
        }).join('\n')
    }
    return createReactElement('style', {
        type: 'text/css',
        'data-styleid': id,
        key: id,
        dangerouslySetInnerHTML: {
            __html: escapeHtmlForStyleNode(content)
        }
    })
}

function escapeHtmlForStyleNode(html) {
    return html && html.replace ? html.replace(/</g, '&lt;') : ''
}

const styleNodeUtils = {
    generateStyleNode
}

module.exports = styleNodeUtils