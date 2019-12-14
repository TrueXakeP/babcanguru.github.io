'use strict'

const _ = require('lodash')

const COMP_SANTA_TYPES_TO_PASS = {
    rootId: true,
    rootNavigationInfo: true,
    theme: true,
    compDesign: true
}

const santaTypesPathsToSkip = _.flatMap([
    ['Layout', 'layoutComponentClassName']
], path => [path, path.concat(['isRequired'])])

const shouldSkipPropType = (propType, SantaTypes) => _.some(santaTypesPathsToSkip, path => propType === _.get(SantaTypes, path))

const shouldPassSantaTypeToChild = (propType, SantaTypes) => _.every(SantaTypes.RenderRealtimeConfig, function(realtimePropType) {
    return propType !== realtimePropType && propType !== realtimePropType.isRequired
}) && _.every(SantaTypes.Component, function(componentPropType, propName) {
    return COMP_SANTA_TYPES_TO_PASS[propName] || propType !== componentPropType && propType !== componentPropType.isRequired // eslint-disable-line no-mixed-operators
}) && !shouldSkipPropType(propType, SantaTypes)

module.exports = shouldPassSantaTypeToChild