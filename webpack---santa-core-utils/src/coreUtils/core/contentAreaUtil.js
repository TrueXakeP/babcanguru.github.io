'use strict'

const _ = require('lodash')
const CONTENT_AREA_MARKER_NAME_IN_DOM = 'content-area-marker'

const getContentAreaStartPosition = (contentAreaWidth, contentAreaPositionFactor) =>
    `calc((100% - ${contentAreaWidth}px) * ${contentAreaPositionFactor})`

const contentAreaUtil = {
    getContentAreaMarkingElement(contentArea, compId) {
        const {
            width,
            alignment
        } = contentArea

        return ['div', {
            style: {
                visibility: 'hidden',
                position: 'absolute',
                width,
                marginLeft: getContentAreaStartPosition(width, alignment)
            },
            key: CONTENT_AREA_MARKER_NAME_IN_DOM,
            [`data-${CONTENT_AREA_MARKER_NAME_IN_DOM}`]: compId,
            'data-aid': `${CONTENT_AREA_MARKER_NAME_IN_DOM}-${compId}`
        }]
    },

    getContentAreaMarkerChildOnNode(compDomNode) {
        const compId = compDomNode.id
        return compDomNode.querySelector(`[data-${CONTENT_AREA_MARKER_NAME_IN_DOM}=${compId}]`)
    },

    getContentAreaMarkerForElement(domNode) {
        const {
            parentElement
        } = domNode || {}
        if (!parentElement) {
            return null
        }

        if (parentElement.dataset.meshInternal) {
            return contentAreaUtil.getContentAreaMarkerForElement(parentElement)
        }

        return _.find(parentElement.querySelectorAll(`[data-${CONTENT_AREA_MARKER_NAME_IN_DOM}]`), {
            parentElement
        })
    },

    getContentAreaStyle(contentAreaWidth, alignment) {
        return {
            marginLeft: getContentAreaStartPosition(contentAreaWidth, alignment)
        }
    }
}

module.exports = contentAreaUtil