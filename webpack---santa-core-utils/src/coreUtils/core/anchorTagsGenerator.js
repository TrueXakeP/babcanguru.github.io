'use strict'

const CLASS_NAME = 'auto-generated-link'

const _ = require('lodash')
const {
    Pattern,
    testForAll,
    findAll
} = require('./textPatternRecognizer')
const {
    fragment
} = require('../warmupUtils')

function generateAnchorsInHtml(htmlText, includedPatterns, {
    useEarlyLinkCheck
} = {}) {
    if (!_.some(includedPatterns)) {
        return htmlText
    }

    if (useEarlyLinkCheck && !testForAll(htmlText, includedPatterns)) {
        return htmlText
    }

    const {
        textNodes,
        container
    } = parseHtmlTextNodes(htmlText)
    const changed = _.reduce(textNodes, (acc, textNode) => patternReplacer(textNode, includedPatterns) || acc, false)
    return changed ? container.innerHTML : htmlText
}

function parseHtmlTextNodes(htmlText) {
    const docfrag = fragment.document.createDocumentFragment()
    const container = docfrag.appendChild(fragment.document.createElement('div'))
    container.innerHTML = htmlText
    const textNodes = findTextNodes(container)
    return {
        container,
        textNodes
    }
}

function findTextNodes(node) {
    function _findTextNodes(n, results) {
        switch (n.nodeType) {
            case fragment.Node.TEXT_NODE:
                results.push(n)
                break
            case fragment.Node.ELEMENT_NODE:
                if (n.tagName.toLowerCase() === 'a') {
                    break
                }
                // Fallthrough
            default:
                for (n = n.firstChild; n; n = n.nextSibling) {
                    _findTextNodes(n, results)
                }
        }
        return results
    }

    return _findTextNodes(node, [])
}

function patternReplacer(node, includedPatterns) {
    let text = node.data
    const items = findAll(text, includedPatterns)
    if (items.length === 0) {
        return false
    }

    const newNodes = []
    _(items)
        .orderBy(['index'], ['desc'])
        .forEach(item => {
            newNodes.push(fragment.document.createTextNode(text.slice(item.index + item.key.length)))
            newNodes.push(anchorBuilder(item))
            text = text.slice(0, item.index)
        })
    newNodes.push(fragment.document.createTextNode(text))

    const {
        parentNode
    } = node
    _.forEach(newNodes.reverse(), n => {
        parentNode.insertBefore(n, node)
    })
    parentNode.removeChild(node)
    return true
}

function anchorBuilder(item) {
    const aTag = fragment.document.createElement('a')
    aTag.textContent = item.key
    aTag.classList.add(CLASS_NAME)

    const anchorData = buildAnchorData(item)
    _.forEach(anchorData, (value, key) => {
        aTag.setAttribute(key, value)
    })

    const objectTag = fragment.document.createElement('object')
    objectTag.appendChild(aTag)
    objectTag.setAttribute('height', '0')
    return objectTag
}

function buildAnchorData(item) {
    const anchorData = {
        'data-auto-recognition': 'true',
        'data-content': item.key
    }

    switch (item.pattern) {
        case Pattern.PHONE:
            return _.assign(anchorData, {
                href: `tel:${item.value}`,
                'data-type': 'phone'
            })

        case Pattern.MAIL:
            return _.assign(anchorData, {
                href: `mailto:${item.value}`,
                'data-type': 'mail'
            })

        case Pattern.URL:
            return _.assign(anchorData, {
                href: item.value,
                target: '_blank',
                'data-type': 'external'
            })

        default:
            throw new Error(`Unknown Pattern: ${item.pattern}`)
    }
}

function findDataForAnchors(htmlText, includedPatterns, {
    useEarlyLinkCheck
} = {}) {
    if (!_.some(includedPatterns)) {
        return []
    }

    if (useEarlyLinkCheck && !testForAll(htmlText, includedPatterns)) {
        return []
    }

    const parseResult = parseHtmlTextNodes(htmlText)
    const data = _(parseResult.textNodes)
        .map('data')
        .flatMap(_.partial(findAll, _, includedPatterns))
        .map(buildAnchorData)
        .head()

    return [data] // Not to break API
}

function getIncludedPatterns(experiment, isMobileView) {
    return {
        [Pattern.PHONE]: isMobileView,
        [Pattern.MAIL]: true,
        [Pattern.URL]: true
    }
}

module.exports = {
    generateAnchorsInHtml,
    findDataForAnchors,
    getIncludedPatterns
}