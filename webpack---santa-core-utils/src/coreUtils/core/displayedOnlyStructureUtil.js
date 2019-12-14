'use strict'
const _ = require('lodash')

const REPEATER_DELIMITER = '__'
const REFERRED_POINTER_DELIMITER = '_r_'

const getUniqueDisplayedId = (originalId, itemId) => originalId ? originalId + REPEATER_DELIMITER + itemId : undefined
const getUniqueRefId = (refHostId, compId) => `${refHostId}${REFERRED_POINTER_DELIMITER}${compId}`
const updateCompIdInPointersMap = ({
    id
}, itemId, updatePointerMap) => updatePointerMap(id, getUniqueDisplayedId(id, itemId))
const isRepeatedComponent = compId => !!getRepeaterItemId(compId)
const getRepeaterItemId = uniqueItemId => _.isString(uniqueItemId) ? uniqueItemId.split(REPEATER_DELIMITER)[1] : undefined
const getRepeaterTemplateId = uniqueItemId => _.isString(uniqueItemId) ? uniqueItemId.split(REPEATER_DELIMITER)[0] : undefined

const isRefferedId = id => _.includes(id, REFERRED_POINTER_DELIMITER)

const isDisplayedOnlyComponent = compId => isRepeatedComponent(compId) || isRefferedId(compId)
const getReferredCompId = compId => _.isString(compId) ? compId.split(REFERRED_POINTER_DELIMITER)[1] : undefined
const getRefHostCompId = compId => isRefferedId(compId) ? compId.split(REFERRED_POINTER_DELIMITER)[0] : undefined

const uniquePropertyMapperFunctions = {
    dataQuery: getUniqueDisplayedId,
    designQuery: getUniqueDisplayedId,
    id: getUniqueDisplayedId,
    parent: getUniqueDisplayedId,
    layout: value => _.cloneDeep(value),
    components: (value, itemId, updatePointerMap) =>
        _.map(value, child => _.isString(child) ? getUniqueDisplayedId(child, itemId) : getUniqueStructure(child, itemId, updatePointerMap))
}

function getUniqueStructure(structure, itemId, updatePointerMap = _.noop) {
    updateCompIdInPointersMap(structure, itemId, updatePointerMap)
    return _.mapValues(structure, (value, property) => _.invoke(uniquePropertyMapperFunctions, property, value, itemId, updatePointerMap) || value)
}

function getUniqueFlatStructureMap(compsMap, itemId, updatePointerMap = _.noop) {
    return _(compsMap)
        .map(comp => getUniqueStructure(comp, itemId, updatePointerMap))
        .keyBy('id')
        .value()
}

const originalPropertyMapperFunctions = {
    dataQuery: getRepeaterTemplateId,
    designQuery: getRepeaterTemplateId,
    id: getRepeaterTemplateId,
    layout: value => _.cloneDeep(value),
    components: value => _.map(value, child => child.id ? getOriginalStructure(child) : getRepeaterTemplateId(child))
}

function getOriginalStructure(itemStructure) {
    return _(itemStructure)
        .omit('parent')
        .mapValues((value, property) => _.invoke(originalPropertyMapperFunctions, property, value) || value)
        .value()
}

function unwrapDisplayedId(displayedId) {
    const repeatedItemId = getRepeaterItemId(displayedId)

    return {
        compId: repeatedItemId ? getRepeaterTemplateId(displayedId) : displayedId,
        wrappingFunction: repeatedItemId ? _.partialRight(getUniqueDisplayedId, repeatedItemId) : _.identity
    }
}

function createRefIdWithSuffix(refHostId, referredCompId, suffix = '') {
    const {
        compId,
        wrappingFunction
    } = unwrapDisplayedId(referredCompId)
    const newReferredCompId = `${getUniqueRefId(refHostId, compId)}${suffix}`

    return wrappingFunction(newReferredCompId)
}

const isRefPointer = p => isRefferedId(p.id)

module.exports = {
    getUniqueFlatStructureMap,
    getUniqueStructure,
    getOriginalStructure,
    isRepeatedComponent,
    isDisplayedOnlyComponent,
    getRepeaterItemId,
    getRepeaterTemplateId,
    getUniqueDisplayedId,
    isRefPointer,
    getReferredCompId,
    getRefHostCompId,
    getUniqueRefId,
    createRefIdWithSuffix,
    //Keeping these for backward compatibility while refactoring
    isDisplayedComponent: isRepeatedComponent,
    getItemId: getRepeaterItemId,
    getOriginalId: getRepeaterTemplateId
}