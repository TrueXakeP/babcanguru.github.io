'use strict'

const _ = require('lodash')
const React = require('react')
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')

function getEvent(syntheticEvent, {
    id,
    now
}) {
    const basicEvent = {
        id: _.get(syntheticEvent, 'id') || id,
        timeStamp: now()
    }

    if (!syntheticEvent) {
        return basicEvent
    }

    basicEvent.timeStamp = syntheticEvent.timeStamp || basicEvent.timeStamp
    return _.defaults(basicEvent, syntheticEvent)
}

module.exports = (Comp, eventHandlersProp) => {
    class withEventHandlers extends React.Component {
        render() {
            const eventHandlers = _.mapValues(this.props.compActions, eventPayLoad => syntheticEvent => this.props.handleAction(eventPayLoad, getEvent(syntheticEvent, this.props)))
            const propsWithActions = _.defaults({
                [eventHandlersProp]: eventHandlers
            }, this.props)

            return React.createElement(Comp, propsWithActions)
        }
    }

    withEventHandlers.propTypes = _.assign({
        id: santaTypesDefinitions.Component.id,
        handleAction: santaTypesDefinitions.Behaviors.handleAction,
        compActions: santaTypesDefinitions.Component.compActions,
        now: santaTypesDefinitions.Utils.logging.performance.now
    }, Comp.propTypes)

    return withEventHandlers
}