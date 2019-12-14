'use strict'

const _ = require('lodash')

function getEvent(syntheticEvent) {
    const basicEvent = {
        id: _.get(syntheticEvent, 'id') || this.props ? this.props.id : null,
        timeStamp: this.props && this.props.now ? this.props.now() : null
    }
    if (!syntheticEvent) {
        return basicEvent
    }
    basicEvent.timeStamp = syntheticEvent.timeStamp || basicEvent.timeStamp
    return _.defaults(basicEvent, syntheticEvent)
}

exports.getEvent = getEvent