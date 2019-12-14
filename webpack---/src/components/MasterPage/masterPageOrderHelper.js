'use strict'

const _ = require('lodash')

const GROUP_TYPES = {
    LEGACY_GAPS: 'LEGACY_GAPS',
    OTHER: 'OTHER',
    PAGES_CONTAINER: 'PAGES_CONTAINER',
    PINNED: 'PINNED',
    SOAP: 'SOAP',
    STRUCTURAL: 'STRUCTURAL'
}

const isFixed = compLayout => compLayout && !!compLayout.fixedPosition
const isPinned = compLayout => isFixed(compLayout) && !!compLayout.docked

const createOtherGroup = components => ({
    type: GROUP_TYPES.OTHER,
    components
})
const createPinnedGroup = (components, groupId) => ({
    type: GROUP_TYPES.PINNED,
    components,
    id: groupId
})
const createSOAPGroup = (components, groupId) => ({
    type: GROUP_TYPES.SOAP,
    components,
    id: groupId
})
const createStructuralGroup = components => ({
    type: GROUP_TYPES.STRUCTURAL,
    components
})

const isPagesContainer = compId => compId === 'PAGES_CONTAINER'
const isPinnedBreakpoint = (compId, compLayout) => {
    if (isPagesContainer(compId)) {
        return true
    }

    return (compId === 'SITE_HEADER' || compId === 'SITE_FOOTER') && isFixed(compLayout)
}

const getMasterPageChildrenGroups = (childrenIds, childrenLayout, isMobileView) => {
    const structuralIDs = isMobileView ? {
        SITE_HEADER: true,
        SITE_FOOTER: true,
        PAGES_CONTAINER: true,
        BACK_TO_TOP_BUTTON: true,
        SOSP_CONTAINER_CUSTOM_ID: true,
        QUICK_ACTION_BAR: true
    } : {
        SITE_HEADER: true,
        SITE_FOOTER: true,
        PAGES_CONTAINER: true,
        BACK_TO_TOP_BUTTON: true
    }
    const isStructural = id => !!structuralIDs[id]

    let pinnedAgg = []
    let soapAgg = []
    let pageContainerIndex = 0
    let lastPinnedBreakpointId = ''

    const groupedComponents = childrenIds.reduce((result, childId) => {
        if (isPinned(childrenLayout[childId]) && !isStructural(childId)) {
            pinnedAgg.push(childId)
            return result
        }

        if (isPinnedBreakpoint(childId, childrenLayout[childId])) {
            lastPinnedBreakpointId = childId

            if (!_.isEmpty(pinnedAgg)) {
                result.push(createPinnedGroup(pinnedAgg, `pinnedBefore${childId}`))
                pinnedAgg = []
            }
        }

        if (isPagesContainer(childId)) {
            if (!_.isEmpty(soapAgg)) {
                result.push(createSOAPGroup(soapAgg, 'soapBeforePagesContainer'))
                soapAgg = []
            }

            pageContainerIndex = result.length
        }

        if (isStructural(childId)) {
            result.push(createStructuralGroup([childId]))
        } else if (isFixed(childrenLayout[childId])) {
            result.push(createOtherGroup([childId]))
        } else {
            soapAgg.push(childId)
        }

        return result
    }, [])

    if (!_.isEmpty(pinnedAgg)) {
        groupedComponents.push(createPinnedGroup(pinnedAgg, `pinnedAfter${lastPinnedBreakpointId}`))
    }
    if (!_.isEmpty(soapAgg)) {
        const soapGroup = createSOAPGroup(soapAgg, 'soapAfterPagesContainer')
        groupedComponents.splice(pageContainerIndex + 1, 0, soapGroup)
    }

    return groupedComponents
}

module.exports = {
    GROUP_TYPES,
    getMasterPageChildrenGroups
}