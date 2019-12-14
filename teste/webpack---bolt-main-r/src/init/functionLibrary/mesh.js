const {
    MESH_ID_SEPARATOR
} = require('../mesh/meshConstants')

const _ = require('lodash')
const {
    structure2mesh
} = require('santa-mesh')
const stylePropName = key => _.head(key) === '-' ? key : _.kebabCase(key)

function isContainerMeshStyle(meshId, compId) {
    return _.startsWith(meshId, compId)
}

function isRotatedChildStyle(rotatedComponents, meshId) {
    return _.includes(rotatedComponents, meshId)
}

function isRotatedWrapperStyle(meshId) {
    return meshId.includes('rotated-wrapper')
}

function getWrappedCompId(rotatedWrapperId) {
    return rotatedWrapperId.replace('-rotated-wrapper', '')
}

function hasClass(meshId) {
    return meshId.includes(MESH_ID_SEPARATOR)
}

const idsToSelectors = (meshContainerId, stylesMap, rotatedComponents, contentSkinPartId) =>
    _.mapKeys(stylesMap, (style, meshId) => {
        const shouldAddClass = hasClass(meshId)
        const splitMeshId = _.split(meshId, MESH_ID_SEPARATOR)
        meshId = splitMeshId[0]
        const className = shouldAddClass ? `.${splitMeshId[1]}` : ''
        const meshContainerDisplayedOnlyIdPrefix = `${meshContainerId}__`

        if (isContainerMeshStyle(meshId, meshContainerId)) { // meshId=container1inlineContent
            const suffix = _.replace(meshId, meshContainerId, '') // suffix=inlineContent
            return `#${meshContainerId}${className} #${meshId},
           [id^="${meshContainerId}"]${className} [id^="${meshContainerDisplayedOnlyIdPrefix}"][id$="${suffix}"]` // [id^=container1][id$=inlineContent]
        }

        if (isRotatedChildStyle(rotatedComponents, meshId)) { // meshId = child1
            return `[id^="${meshContainerId}"]${className}  #${meshContainerId}${contentSkinPartId}-gridContainer > [id^="${meshId}-rotated-wrapper"] >
            [id^="${meshId}"],
            [id^="${meshContainerId}"]${className}  [id^="${meshContainerDisplayedOnlyIdPrefix}"] > [id^="${meshId}"][id$="-rotated-wrapper"] > [id^="${meshId}"]`
        }
        if (isRotatedWrapperStyle(meshId)) {
            return `[id^="${meshContainerId}"]${className} #${meshContainerId}${contentSkinPartId}-gridContainer > #${meshId},
       [id^="${meshContainerId}"]${className} [id^="${meshContainerDisplayedOnlyIdPrefix}"][id$="gridContainer"] > [id^="${getWrappedCompId(meshId)}"][id$="rotated-wrapper"]` // meshId = child1
        }
        return `[id^="${meshContainerId}"]${className} #${meshContainerId}${contentSkinPartId}-gridContainer > #${meshId},
       [id^="${meshContainerDisplayedOnlyIdPrefix}"] > [id^="${meshId}"]` // meshId = child1
    })

const renderStyle = ({
    id,
    stylesMap
}) => {
    const css = `
    ${_(stylesMap).map((compStyle, selector) => `
${selector} {
${_(compStyle).omitBy(_.isNil).map((value, key) => `    ${stylePropName(key)}: ${value};`).join('\n')}
}`).join('\n')}`

    return {
        [id]: css
    }
}


const getMeshStyles = (id, stylesMap, rotatedComponents, contentSkinPartId) => {
    const displayedOnlyIdPrefix = `${id}__`
    return renderStyle({
        id: `${id}-mesh-styles`,
        stylesMap: _.merge(
            idsToSelectors(id, stylesMap, rotatedComponents, contentSkinPartId), {
                [`#${id}${contentSkinPartId},
                [id^="${displayedOnlyIdPrefix}"][id$="${contentSkinPartId}"]`]: {
                    position: 'relative'
                },
                [`#${id}centeredContent,
                [id^="${displayedOnlyIdPrefix}"][id$="centeredContent"]`]: {
                    position: 'relative'
                },
                // To make sure overlaps and soap container does not block clicks on components underneath
                [`#${id}${contentSkinPartId}-gridWrapper,
                [id^="${displayedOnlyIdPrefix}"][id$="${contentSkinPartId}-gridWrapper"]`]: {
                    'pointer-events': 'none'
                },
                [`#${id}${contentSkinPartId}-gridContainer > *,
                [id^="${displayedOnlyIdPrefix}"][id$="${contentSkinPartId}-gridContainer"] > *`]: {
                    'pointer-events': 'auto'
                },
                [`#${id}${contentSkinPartId}-gridContainer > [id$="-rotated-wrapper"],
                [id^="${displayedOnlyIdPrefix}"][id$="${contentSkinPartId}-gridContainer"] > [id$="-rotated-wrapper"]`]: {
                    'pointer-events': 'none'
                },
                [`#${id}${contentSkinPartId}-gridContainer > [id$="-rotated-wrapper"] > *,
                [id^="${displayedOnlyIdPrefix}"][id$="${contentSkinPartId}-gridContainer"] > [id$="-rotated-wrapper"] > *`]: {
                    'pointer-events': 'auto'
                }
            }
        )
    })
}

const getMeshResults = (compId, meshParams, contentSkinPartId) => { //TODO: this logic should be in carmi
    const rotatedComponents = []
    const wedges = []
    const children = _.get(meshParams, 'structure.children[0].children[0].children', [])
    children.forEach(comp => {
        if (comp.id.includes('rotated-wrapper')) {
            rotatedComponents.push(...comp.children.map(child => child.id))
        } else if (comp.id.includes('wedge')) {
            wedges.push(comp.id)
        }
    })

    return {
        css: getMeshStyles(compId, meshParams.styles, rotatedComponents, contentSkinPartId),
        wedges,
        rotatedComponents
    }
}


module.exports = {
    getMeshResults,
    structure2mesh
}