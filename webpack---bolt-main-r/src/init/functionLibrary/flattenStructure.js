/*eslint fp/no-let:0, fp/no-loops:0, fp/no-mutating-methods:0*/
/*eslint fp/no-mutating-assign:0, fp/no-mutation:0*/
const _ = require('lodash')
const MOBILE_COMPONENTS = 'mobileComponents'
const MASTER_PAGE_CHILDREN = 'children'
const COMPONENTS = 'components'

function getChildrenKey(data, isMobile) {
    if (isMobile && data.mobileComponents) {
        return MOBILE_COMPONENTS
    }

    return data.children ? MASTER_PAGE_CHILDREN : COMPONENTS
}

function getChildrenComponents(structure, isMobile) {
    const children = isMobile ? structure.mobileComponents : structure.children
    return children || structure.components || []
}

function getAllCompsInStructure(compStructure, isMobile) {
    const queue = [compStructure]
    for (let i = 0; i < queue.length; i++) {
        const component = queue[i]
        const childrenData = _.map(
            getChildrenComponents(component, isMobile),
            childStructure => ({ ...childStructure,
                parent: component.id
            }))

        queue.push(...childrenData)
    }

    return queue.reduce((acc, val) => Object.assign(acc, {
        [val.id]: val
    }), {})
}

module.exports = function convertNestedPageStructureToFlat(structure, pageId, isMobile) {
    const convertChildrenToIds = comp => {
        const newComp = { ..._.omit(comp, [MASTER_PAGE_CHILDREN, MOBILE_COMPONENTS]),
            metaData: { ...comp.metaData,
                pageId
            }
        }
        const compChildren = comp[getChildrenKey(comp, isMobile)]
        return compChildren ? { ...newComp,
            components: compChildren.map(item => item.id)
        } : newComp
    }

    const struct = getAllCompsInStructure(structure, isMobile)
    return Object.keys(struct).reduce((acc, id) => Object.assign(acc, {
        [id]: convertChildrenToIds(struct[id])
    }), {})
}