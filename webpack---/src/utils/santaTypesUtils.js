'use strict'

const _ = require('lodash')
const shouldPassSantaTypeToChild = require('./shouldPassSantaTypeToChild')

if (typeof WeakMap !== 'undefined') {
    _.memoize.Cache = WeakMap //eslint-disable-line no-undef
}

function getAllMixinsAndSelf(compDefinition) {
    const queue = [compDefinition]
    for (let index = 0; index < queue.length; index++) {
        const mixins = queue[index].mixins
        if (mixins && mixins.length) {
            queue.push.apply(queue, mixins)
        }
    }
    return queue
}

function isSantaTypeProp(propType) {
    return propType.id || _.isFunction(propType.fetch)
}

function getPropTypesByDefinition(compDefinition) {
    const allMixinsAndSelf = getAllMixinsAndSelf(compDefinition)
    const allPropsTypes = _.map(allMixinsAndSelf, 'propTypes')
    return _.defaults.apply(_, [{}].concat(allPropsTypes))
}

function getSantaTypesByDefinition(compDefinition) {
    return _.pickBy(getPropTypesByDefinition(compDefinition), isSantaTypeProp)
}

function resolveComponentProps(propTypes, props) {
    const siteData = props.siteData
    const navigationInfo = siteData.getExistingRootNavigationInfo(siteData.getFocusedRootId())

    const compState = {
        fetchSantaType: (santaTypesDefinition, fetcherState, fetcherProps) => santaTypesDefinition.fetch ? santaTypesDefinition.fetch(fetcherState, fetcherProps) : props.siteAPI.getSantaFetcher(santaTypesDefinition)(fetcherState, fetcherProps),
        stylesMap: props.loadedStyles,
        siteData: props.siteData,
        siteAPI: props.siteAPI
    }

    const compProps = {
        structure: props.structure,
        hardcodedSkin: props.hardcodedSkin,
        id: props.id,
        rootId: props.rootId,
        rootNavigationInfo: navigationInfo,
        compData: props.compData
    }

    const santaTypePropTypes = _.pickBy(propTypes, isSantaTypeProp)

    const santaTypeProps = _.mapValues(santaTypePropTypes, function(santaTypeOrSantaTypeDefinition) {
        if (santaTypeOrSantaTypeDefinition.fetch) {
            return santaTypeOrSantaTypeDefinition.fetch(compState, compProps)
        }

        return compState.fetchSantaType(santaTypeOrSantaTypeDefinition, compState, compProps)
    })

    return _.assign(santaTypeProps, _.pick(props, _.keys(propTypes)))
}

const getSantaTypesFromPropTypes = _.memoize(propTypes => _.pickBy(propTypes, isSantaTypeProp))

const getSantaPropsSelectorForReactClass = _.memoize(compClass => {
    const santaTypes = compClass.propTypes && getSantaTypesFromPropTypes(compClass.propTypes)
    return function(state, props) {
        return _.mapValues(santaTypes, function(propType) {
            if (propType.fetch) {
                return propType.fetch(state, props)
            }

            return state.fetchSantaType(propType, state, props)
        })
    }
})

const getSantaTypesForChildComponentClass = _.memoize((compClass, santaTypes) => compClass.propTypes && _.pickBy(getSantaTypesFromPropTypes(compClass.propTypes), propType => shouldPassSantaTypeToChild(propType, santaTypes)))

module.exports = {
    getSantaTypesFromPropTypes,
    getSantaTypesForChildComponentClass,
    getSantaPropsSelectorForReactClass,
    // todo get rid of these two
    resolveComponentProps,
    getSantaTypesByDefinition: _.memoize(getSantaTypesByDefinition)
}