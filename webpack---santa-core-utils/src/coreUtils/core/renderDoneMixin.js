'use strict'

const _ = require('lodash')

let pendingCallbacks = [] // eslint-disable-line santa/no-module-state
let renderCounter = 0 // eslint-disable-line santa/no-module-state
let renderToStringCounter = 0 // eslint-disable-line santa/no-module-state

function flushPendingCallbacksIfNotRenderingAndHasPending() {
    if (pendingCallbacks.length && renderCounter === 0) {
        const copyOfPendingCallbacks = pendingCallbacks
        pendingCallbacks = []
        _.forEach(copyOfPendingCallbacks, function(callback) {
            callback()
        })
        flushPendingCallbacksIfNotRenderingAndHasPending()
    }
}

function finishedRendering() {
    this._isMounted = true
    if (renderToStringCounter === 0) {
        renderCounter--
        flushPendingCallbacksIfNotRenderingAndHasPending()
    }
}

function componentWillUnmount() { //eslint-disable-line no-unused-vars
    this._isMounted = false
}

function startedRendering() {
    if (renderToStringCounter === 0) {
        renderCounter++
    }
}

function toggleRenderToString(renderingToString) {
    renderToStringCounter += renderingToString ? 1 : -1
}

function callAfterRenderDone(callback) {
    if (!this._isMounted) {
        console.error('only invoke callAfterRenderDone if the component is mounted') //eslint-disable-line no-console
        return
    }
    if (renderCounter === 0) {
        callback()
    } else {
        pendingCallbacks.push(callback)
    }
}

module.exports = {
    componentDidMount: finishedRendering,
    componentDidUpdate: finishedRendering,
    componentWillMount: startedRendering,
    componentWillUpdate: startedRendering,
    toggleRenderToString,
    callAfterRenderDone
}