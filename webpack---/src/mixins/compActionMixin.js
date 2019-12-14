'use strict'

const {
    getEvent
} = require('./getEvent')

const _ = require('lodash')
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')

module.exports = {
    propTypes: {
        id: santaTypesDefinitions.Component.id,
        handleAction: santaTypesDefinitions.Behaviors.handleAction,
        compActions: santaTypesDefinitions.Component.compActions,
        now: santaTypesDefinitions.Utils.logging.performance.now
    },

    handleAction(actionName, syntheticEvent) {
        const actionToHandle = _.get(this.props.compActions, actionName)
        if (actionToHandle) {
            this.props.handleAction(actionToHandle, getEvent.call(this, syntheticEvent))
        }
    }
}