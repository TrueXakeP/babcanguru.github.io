'use strict'

const _ = require('lodash')
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')
const childrenRenderer = require('../components/ChildrenRenderer/ChildrenRenderer')

module.exports = {
    statics: {
        meshContainer: true
    },

    propTypes: {
        id: santaTypesDefinitions.Component.id,
        fixedChildrenIDs: santaTypesDefinitions.Component.fixedChildrenIDs,
        meshParams: santaTypesDefinitions.Component.meshParams,
        isMeshLayoutMechanism: santaTypesDefinitions.Layout.isMeshLayoutMechanism,
        isPreviewMode: santaTypesDefinitions.isPreviewMode,
        browser: santaTypesDefinitions.Browser.browser,
        reportBI: santaTypesDefinitions.reportBI,
        isMobileView: santaTypesDefinitions.isMobileView,
        isResponsive: santaTypesDefinitions.RendererModel.isResponsive
    },

    ignoreDimensions() {
        return this.props.isMeshLayoutMechanism
    },

    getChildrenRenderer({
        overrides,
        contentArea,
        contentSkinPartId,
        children
    } = {}) {
        const {
            id,
            meshParams,
            isPreviewMode,
            isMobileView,
            children: propsChildren,
            isMeshLayoutMechanism,
            fixedChildrenIDs,
            browser,
            reportBI,
            isResponsive
        } = this.props
        const isMeshResults = !_.has(meshParams, 'id')
        const props = {
            isMeshLayoutMechanism,
            isPreviewMode,
            isMobileView,
            browser,
            reportBI,
            contentArea,
            fixedChildrenIDs,
            id,
            adjustingId: _.get(meshParams, 'adjustingComp', null),
            container: isMeshResults ? null : _.assign(_.omit(meshParams, 'adjustingComp'), overrides),
            children: children || propsChildren || [],
            contentSkinPartId,
            isResponsive,
            meshResults: isMeshResults ? _.assign({}, meshParams, _.pick(overrides, ['components'])) : null
        }

        return childrenRenderer(props)
    }
}