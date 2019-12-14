'use strict'

const _ = require('lodash')
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')

const generateParamArray = (behaviorDef, behavior) => {
    const paramArr = _.map(behaviorDef.params, paramDef =>
        _.isString(paramDef) ? behavior.params[paramDef] : _.get(behavior.params, paramDef.name, paramDef.defaultValue))

    return behavior.callback ? paramArr.concat(behavior.callback) : paramArr
}

const executeCompBehaviors = (compInstance, compDynamicBehaviors, behaviorsDef) => {
    _.forEach(compDynamicBehaviors, function(dynamicBehavior) {
        const behaviorDef = behaviorsDef[dynamicBehavior.name]
        if (behaviorDef && _.isFunction(compInstance[behaviorDef.methodName])) {
            const paramArray = generateParamArray(behaviorDef, dynamicBehavior)
            compInstance[behaviorDef.methodName].apply(compInstance, paramArray)
        }
    })
}

module.exports = behaviorsDef => CompClass => {
    class WithBehaviors extends CompClass {
        componentWillMount() {
            if (_.isFunction(super.componentWillMount)) {
                super.componentWillMount()
            }
            this.dispose = this.props.trackBehaviorsToExecute(behaviorsToExecute => executeCompBehaviors(this, behaviorsToExecute, behaviorsDef))
        }

        componentWillUnmount() {
            if (_.isFunction(super.componentWillUnmount)) {
                super.componentWillUnmount()
            }
            this.dispose()
        }
    }

    WithBehaviors.displayName = `withBehaviors(${CompClass.displayName})`

    WithBehaviors.propTypes = _.assign({
        trackBehaviorsToExecute: santaTypesDefinitions.Component.trackBehaviorsToExecute.isRequired
    }, CompClass.propTypes)

    return WithBehaviors
}