'use strict'

const React = require('react')
const _ = require('lodash')
const MeshReact = require('santa-mesh/cjs/src/MeshReact')
const MeshRenderer = require('santa-mesh/cjs/src/MeshRenderer')
const biEvents = require('./biEvents')
const createReactElement = require('../../utils/createReactElement')
const styleRenderer = require('../StyleRenderer/StyleRenderer')
const utils = require('santa-core-utils')

const getGridVariant = browser => browser.ie ? 'ms' : 'standard'
const getChildId = (comp, isMeshResults) => isMeshResults ? utils.displayedOnlyStructureUtil.getRepeaterTemplateId(comp.props.id) : comp.props.id // TODO: remove isMeshResults when bv_meshDataServer is merged
const getMeshStyles = (id, contentSkinPartId) => stylesMap => styleRenderer({
    id: `${id}-mesh-styles`,
    stylesMap: _.merge(
        stylesMap, {
            [`${id}${contentSkinPartId}`]: {
                position: 'relative'
            },
            [`${id}centeredContent`]: {
                position: 'relative'
            },
            // To make sure overlaps and soap container does not block clicks on components underneath
            [`${id}${contentSkinPartId}-gridWrapper`]: {
                'pointer-events': 'none'
            },
            [`${id}${contentSkinPartId}-gridContainer > *`]: {
                'pointer-events': 'auto'
            },
            [`${id}${contentSkinPartId}-gridContainer > [id$="-rotated-wrapper"]`]: {
                'pointer-events': 'none'
            },
            [`${id}${contentSkinPartId}-gridContainer > [id$="-rotated-wrapper"] > *`]: {
                'pointer-events': 'auto'
            }
        }
    )
})

const reportWarning = reportBI => () => {
    reportBI(biEvents.MORE_THAN_1000_ROWS)
}

const SantaMesh = ({
    compId,
    container,
    contentArea,
    adjustingId,
    browser,
    reportBI,
    fixedChildrenIDs,
    children,
    contentSkinPartId = 'inlineContent',
    meshResults
}) => {
    const fixedChildrenMap = fixedChildrenIDs.map(id => ({
        [id]: true
    })).reduce(_.assign, {})
    const meshChildrenIdMap = (meshResults ? meshResults : container).components.map(({
        id
    }) => ({
        [id]: true
    })).reduce(_.assign, {})
    const filteredChildrenArray = React.Children.toArray(children).filter(_.flow(id => getChildId(id, meshResults), id => !!meshChildrenIdMap[id]))
    const isReactChildFixed = comp => !!fixedChildrenMap[getChildId(comp, meshResults)]
    const [fixedChildren, notFixedChildren] = _.partition(filteredChildrenArray, isReactChildFixed)
    let modifiedContainer

    if (!meshResults) {
        modifiedContainer = Object.assign({},
            container, {
                id: `${compId}${contentSkinPartId}`,
                components: container.components.filter(comp => !comp.isFixed)
            },
            contentArea && {
                width: '100%',
                contentArea
            }
        )
    }

    const meshReact = () => createReactElement(
        MeshReact.default, {
            container: modifiedContainer,
            adjustingId,
            key: `${compId}-MeshReact`,
            reportWarning: reportWarning(reportBI),
            options: {
                cssGridVariant: getGridVariant(browser)
            },
            getStyle: getMeshStyles(compId, contentSkinPartId)
        },
        notFixedChildren
    )

    const meshRenderer = () => createReactElement(
        MeshRenderer.default, {
            contentSkinPartId,
            key: `${compId}-MeshReact`,
            containerId: compId,
            meshResults
        },
        notFixedChildren)

    return [
        ...fixedChildren,
        meshResults ? meshRenderer() : meshReact()
    ]
}

module.exports = SantaMesh