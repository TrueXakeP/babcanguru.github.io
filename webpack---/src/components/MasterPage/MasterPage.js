'use strict'

const _ = require('lodash')
const React = require('react')
const createReactClass = require('create-react-class')
const inlineContentMixin = require('../../mixins/inlineContentMixin')
const createReactElement = require('../../utils/createReactElement')
const pinnedLayerHelper = require('../../utils/pinnedLayerHelper')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const {
    GROUP_TYPES,
    getMasterPageChildrenGroups
} = require('./masterPageOrderHelper')
const structuralChildrenEnhancerMap = require('./structuralChildrenEnhancerMap')

const MASTER_PAGE_PROPS_NOT_IN_DOM = ['siteWidth', 'fixedChildrenIDs', 'isPreviewMode', 'meshParams', 'browser', 'reportBI',
    'isMeshLayoutMechanism', 'isMobileView', 'compBehaviors', 'componentViewMode', 'defaultContentArea', 'isInSSR', 'childrenLayout', 'isCurrentPageLandingPage', 'wixTopAdsHeight', 'isResponsive'
]

const getStyleForLegacyGaps = (isMobileView, isCurrentPageLandingPage, compData) => {
    if (isMobileView || isCurrentPageLandingPage) {
        return null
    }
    let legacyGapsStyle = ''
    if (compData) {
        const layoutSettings = compData.layoutSettings || {}
        if (layoutSettings.headerToPagesGap) {
            legacyGapsStyle += `#PAGES_CONTAINER {margin-top:${layoutSettings.headerToPagesGap}px;} `
        }
        if (layoutSettings.pagesToFooterGap) {
            legacyGapsStyle += `#PAGES_CONTAINER {margin-bottom:${layoutSettings.pagesToFooterGap}px;} `
        }
    }
    return !_.isEmpty(legacyGapsStyle) && React.createElement('style', {
        key: 'masterpage-legacy-gaps',
        dangerouslySetInnerHTML: {
            __html: legacyGapsStyle
        }
    })
}

const getChildrenMeshParams = (meshParms, children) => _.filter(meshParms, compMeshParams => _.includes(_.map(children, 'props.id'), compMeshParams.id))

const masterPage = {
    displayName: 'WixMasterPage',
    mixins: [inlineContentMixin],
    statics: {
        compType: 'mobile.core.components.MasterPage'
    },
    propTypes: {
        compData: santaTypesDefinitions.Component.compData,
        style: santaTypesDefinitions.Component.style,
        childrenLayout: santaTypesDefinitions.Component.childrenLayout,
        compBehaviors: santaTypesDefinitions.Component.compBehaviors,
        componentViewMode: santaTypesDefinitions.RenderFlags.componentViewMode.isRequired, // hack to get page behaviors to re-register when switching to preview
        defaultContentArea: santaTypesDefinitions.Container.defaultContentArea.isRequired,
        isInSSR: santaTypesDefinitions.isInSSR.isRequired,
        isMeshLayoutMechanism: santaTypesDefinitions.Layout.isMeshLayoutMechanism,
        isMobileView: santaTypesDefinitions.isMobileView,
        siteWidth: santaTypesDefinitions.siteWidth,
        isCurrentPageLandingPage: santaTypesDefinitions.isCurrentPageLandingPage,
        meshParams: santaTypesDefinitions.Component.meshParams,
        wixTopAdsHeight: santaTypesDefinitions.WixAds.wixTopAdsHeight
    },

    makeStructuralChildren(partialStructuralChildren) {
        const {
            isInSSR,
            isCurrentPageLandingPage,
            siteWidth
        } = this.props

        return _(partialStructuralChildren)
            .flatMap(p => {
                const {
                    id: compId
                } = p.props
                if (structuralChildrenEnhancerMap[compId]) {
                    return structuralChildrenEnhancerMap[compId](p, this.getChildStructureLayout(compId), {
                        compId,
                        isInSSR,
                        isCurrentPageLandingPage,
                        siteWidth
                    })
                }
                return p
            })
            .compact()
            .value()
    },

    getChildStructureLayout(childId) {
        return this.props.childrenLayout[childId] || {}
    },

    createSoapContainer(soapContainerId, soapChildrenArray = []) {
        const getMeshParamsForIds = compIds => {
            const idsMap = compIds.map(id => ({
                [id]: true
            })).reduce(_.assign)
            return this.props.meshParams.components
                .filter(({
                    id
                }) => idsMap[id])
                .map(comp => _.assign({}, comp, {
                    top: comp.top - this.getHeaderBottom()
                }))
        }

        const getIds = (childrenArr = []) => childrenArr.map(child => child.props.id)
        const getMeshParamsForSoapContainer = _.flow(getIds, getMeshParamsForIds)

        return soapChildrenArray.length === 0 ?
            null :
            createReactElement(
                'div', {
                    key: soapContainerId,
                    id: soapContainerId
                },
                this.getChildrenRenderer({
                    contentArea: this.props.defaultContentArea,
                    overrides: {
                        id: soapContainerId,
                        components: getMeshParamsForSoapContainer(soapChildrenArray),
                        fitToContentHeight: true
                    }
                })
            )
    },

    getHeaderBottom() {
        const headerLayout = this.getChildStructureLayout('SITE_HEADER')
        const headerTop = headerLayout.fixedPosition ? 0 : headerLayout.y
        return headerLayout.height + headerTop
    },

    renderMesh() {
        const {
            children,
            isMobileView,
            isCurrentPageLandingPage,
            compData,
            browser,
            wixTopAdsHeight
        } = this.props

        const orderedChildrenIdsFromStructure = React.Children.toArray(children).map(child => child.props.id)
        const masterPageChildrenGroups = getMasterPageChildrenGroups(orderedChildrenIdsFromStructure, this.props.childrenLayout, isMobileView)

        const childById = _.keyBy(children, child => child.props.id)
        const masterPageChildren = _.flatMap(masterPageChildrenGroups, childrenGroup => {
            const childrenToRender = !_.isEmpty(childrenGroup.components) ? _.map(childrenGroup.components, compId => childById[compId]) : []
            switch (childrenGroup.type) {
                case GROUP_TYPES.STRUCTURAL:
                    return this.makeStructuralChildren(childrenToRender)
                case GROUP_TYPES.SOAP:
                    return this.createSoapContainer(childrenGroup.id, childrenToRender)
                case GROUP_TYPES.PINNED:
                    return pinnedLayerHelper.createPinnedLayer({
                        id: childrenGroup.id,
                        children: childrenToRender,
                        childrenMeshParams: getChildrenMeshParams(this.props.meshParams.components, childrenToRender),
                        browser,
                        wixTopAdsHeight
                    })
                case GROUP_TYPES.OTHER:
                    {
                        return childrenToRender
                    }
                default:
                    return []
            }
        })

        return createReactElement(
            'div', {
                id: 'masterPage',
                className: 'mesh-layout',
                'data-mesh-layout': 'grid'
            },
            masterPageChildren.concat(getStyleForLegacyGaps(isMobileView, isCurrentPageLandingPage, compData))
        )
    },

    render() {
        return this.props.isMeshLayoutMechanism ?
            this.renderMesh() :
            createReactElement('div', _.omit(this.props || {}, MASTER_PAGE_PROPS_NOT_IN_DOM),
                this.getChildrenRenderer({
                    contentArea: this.props.defaultContentArea
                }))
    }
}

module.exports = createReactClass(masterPage)