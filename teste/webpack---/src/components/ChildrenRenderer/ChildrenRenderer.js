'use strict'

const _ = require('lodash')
const React = require('react')
const santaMesh = require('../SantaMesh/SantaMesh')
const styleRenderer = require('../StyleRenderer/StyleRenderer')
const {
    contentAreaUtil
} = require('santa-core-utils')

const hasContentArea = (contentArea, isMobileView) => contentArea && !isMobileView

const shouldGetMarkerElements = (contentArea, isMobileView, isPreviewMode) =>
    hasContentArea(contentArea, isMobileView) && isPreviewMode

const getContentAreaStyles = (containerId, children, contentArea, fixedChildrenIDs) => {
    const contentAreaStyle = contentAreaUtil.getContentAreaStyle(contentArea.width, contentArea.alignment)
    const fixedChildrenMap = _.transform(fixedChildrenIDs, (result, fixedChildId) => {
        result[fixedChildId] = true
    }, {})

    const stylesMap = React.Children.toArray(children)
        .filter(({
            props: {
                id
            }
        }) => !fixedChildrenMap[id])
        .map(({
            props: {
                id
            }
        }) => ({
            [id]: _.clone(contentAreaStyle)
        }))
        .reduce(_.assign, {})

    const styles = _.isEmpty(stylesMap) ? [] : [styleRenderer({
        id: `${containerId}-content-area-styles`,
        stylesMap
    })]

    return styles
}

const getAnchorsChildren = ({
    id,
    children,
    contentArea,
    isMobileView,
    fixedChildrenIDs
}) => {
    const styles = hasContentArea(contentArea, isMobileView) ? getContentAreaStyles(id, children, contentArea, fixedChildrenIDs) : []
    return [...styles, ...children]
}

const getMeshChildren = ({
        id,
        container,
        adjustingId,
        isMobileView,
        contentArea,
        browser,
        reportBI,
        fixedChildrenIDs,
        children,
        contentSkinPartId,
        meshResults
    }) =>
    santaMesh(_.assign({
        compId: _.get(container, ['id']) || id,
        adjustingId,
        container,
        browser,
        reportBI,
        fixedChildrenIDs,
        children,
        contentSkinPartId,
        meshResults
    }, hasContentArea(contentArea, isMobileView) && {
        contentArea
    }))

const childrenRenderer = props => {
    if (props.isResponsive) {
        return props.children
    }
    // We can filter out the fixed children in the fetcher, which is not so good and not so bad..
    const {
        id,
        contentArea,
        isPreviewMode,
        isMobileView,
        isMeshLayoutMechanism
    } = props
    const markerElement = shouldGetMarkerElements(contentArea, isMobileView, isPreviewMode) ? [React.createElement.apply(null, contentAreaUtil.getContentAreaMarkingElement(contentArea, id))] : []
    const childrenToRender = isMeshLayoutMechanism ? getMeshChildren(props) : getAnchorsChildren(props)
    return [...markerElement, ...childrenToRender]
}

module.exports = childrenRenderer