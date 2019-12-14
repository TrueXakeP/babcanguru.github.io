'use strict'

const _ = require('lodash')
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')
const shouldPassSantaTypeToChild = require('./shouldPassSantaTypeToChild')

function isSantaTypeProp(propType) {
    return propType.id || _.isFunction(propType.fetch)
}

const getSantaTypesByClass = _.memoize(reactClass => _.pickBy(reactClass.propTypes, isSantaTypeProp))

const getSantaTypesForChildComponentClass = _.memoize(compClass => _.pickBy(getSantaTypesByClass(compClass), propType => shouldPassSantaTypeToChild(propType, santaTypesDefinitions)))

function getChildStyleDataFromSkinPart(skinPartName, skinExports, parentStyleId) {
    return {
        skin: skinExports[skinPartName].skin,
        styleId: parentStyleId + skinPartName
    }
}

function getChildSantaTypes(childClassName, parentProps) {
    const childCompSantaTypes = getSantaTypesForChildComponentClass(childClassName)
    return _.pick(parentProps, _.keys(childCompSantaTypes))
}

module.exports = {
    getChildStyleDataFromSkinPart,
    getChildSantaTypes
}