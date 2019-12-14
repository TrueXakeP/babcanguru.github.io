'use strict'
const _ = require('lodash')

const eventsManager = {
    create() {
        const registry = {}

        return {
            on(eventName, callback) {
                registry[eventName] = registry[eventName] || []
                registry[eventName].push(callback)
            },
            off(eventName, callback) {
                registry[eventName] = _.reject(registry[eventName], c => c === callback)
            },
            emit(eventName, ...params) {
                const registeredCallbacks = registry[eventName]

                _(registeredCallbacks)
                    .slice()
                    .forEach(callback => {
                        callback(...params)
                    })
            }
        }
    }
}

module.exports = eventsManager