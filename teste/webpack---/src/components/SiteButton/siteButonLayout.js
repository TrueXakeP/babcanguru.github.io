'use strict'

const _ = require('lodash')

const nodePrivateData = new WeakMap()

const $ = node => ({
    data: name => node.dataset[name],
    attr: name => node.getAttribute(name)
})

const buttonLayout = compNode => {
    const id = compNode.getAttribute('id')
    const labelNode = compNode.querySelector(`#${id}label`)
    const $node = $(compNode)
    const structureWidth = $node.data('width')
    const structureHeight = $node.data('height')

    const {
        prevWidth,
        prevMinWidth,
        prevText
    } = nodePrivateData.get(compNode) || {}
    const getVerticalPadding = computedStyles => parseInt(computedStyles.paddingTop, 10) + parseInt(computedStyles.paddingBottom, 10)
    const getHorizontalMargin = computedStyles => parseInt(computedStyles.marginRight, 10) + parseInt(computedStyles.marginLeft, 10)
    const hasMinHeight = computedStyle => computedStyle.minHeight && Boolean(parseInt(computedStyle.minHeight, 10))
    const didTextContentChange = nodeText => nodeText !== prevText
    const hasMinWidthBeenReduced = compMinWidth => compMinWidth < prevMinWidth
    const wasPrevWidthMinWidth = () => prevWidth === prevMinWidth

    const measuredLabelHeight = labelNode.offsetHeight
    const measuredLabelWidth = labelNode.offsetWidth
    const buttonText = labelNode.innerHTML
    const shouldUseFlex = $node.data('shouldUseFlex')
    const compComputedStyle = window.getComputedStyle(compNode)
    const labelComputedStyle = window.getComputedStyle(labelNode)
    const measuredCompMinHeight = hasMinHeight(compComputedStyle) ? parseInt(compComputedStyle.minHeight, 10) : measuredLabelHeight
    const measuredCompMinWidth = shouldUseFlex ? measuredLabelWidth : measuredLabelWidth + getHorizontalMargin(labelComputedStyle)
    const shouldPreventWidthMeasurement = $node.data('shouldPreventWidthMeasurement')
    const compStructureWidth = structureWidth
    const compStructureHeight = structureHeight
    const measuredCompHeight = Math.max(compStructureHeight, measuredCompMinHeight)
    let measuredCompWidth = compStructureWidth

    if (!shouldPreventWidthMeasurement) {
        measuredCompWidth = didTextContentChange(buttonText, $node) && hasMinWidthBeenReduced(measuredCompMinWidth, $node) && wasPrevWidthMinWidth($node) && measuredLabelWidth > 0 ?
            measuredCompMinWidth : Math.max(measuredCompWidth, measuredCompMinWidth)
    }

    const customMeasurements = {
        align: $node.attr('data-align'),
        margin: parseInt($node.attr('data-margin'), 10),
        text: buttonText,
        label: {
            verticalPadding: getVerticalPadding(labelComputedStyle)
        }
    }

    // if the label and its margin are wider then the component, reduce the margin so they'll fit in the component
    const doesLabelAndMarginOverflow = measuredLabelWidth + customMeasurements.margin > measuredCompWidth

    if (customMeasurements.align !== 'center') {
        const marginProp = shouldUseFlex ? 'margin' : `margin-${customMeasurements.align}`

        customMeasurements.label[marginProp] = doesLabelAndMarginOverflow ? measuredCompWidth - measuredLabelWidth : customMeasurements.margin
    }

    const styleOverrides = {
        height: measuredCompHeight,
        minHeight: measuredCompMinHeight
    }

    if (!shouldPreventWidthMeasurement) {
        styleOverrides.width = measuredCompWidth
    }

    const getLabelNodeCss = () => {
        let labelCss

        if (shouldUseFlex) {
            labelCss = {}
            const alignment = customMeasurements.align
            if (alignment !== 'center' && customMeasurements.label.margin) {
                labelCss[`margin-${alignment}`] = customMeasurements.label.margin
            }

            return labelCss
        }

        labelCss = {
            'line-height': `${measuredCompHeight - customMeasurements.label.verticalPadding}px`
        }

        return _.reduce(['margin-left', 'margin-right'], (labelNodeCss, margin) => {
            if (!_.isUndefined(customMeasurements.label[margin])) {
                labelNodeCss[margin] = customMeasurements.label[margin]
            }
            return labelNodeCss
        }, labelCss)
    }

    nodePrivateData.set(compNode, {
        prevText: customMeasurements.text,
        prevMinWidth: measuredCompMinWidth,
        prevWidth: measuredCompWidth
    })

    return [{
        node: compNode,
        type: 'css',
        changes: styleOverrides
    }, {
        node: labelNode,
        type: 'css',
        changes: getLabelNodeCss()
    }]
}

buttonLayout.compType = 'wysiwyg.viewer.components.SiteButton'

module.exports = buttonLayout