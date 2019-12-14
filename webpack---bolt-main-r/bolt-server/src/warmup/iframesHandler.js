/* eslint-disable fp/no-unused-expression, no-undef, santa/no-module-state*/
'use strict'
let iframes
let events

function loadHandler(event) {
    if (events) {
        events.set(this, event)
    }
}

function registerForEvents() {
    const ifs = Array.from(window.document.querySelectorAll('#SITE_CONTAINER iframe[data-src]'))
    if (ifs.length) {
        events = new Map()
        ifs.forEach(iframe => {
            iframe.onload = loadHandler
        })
        iframes = ifs
    }
}

function trigger([element, event]) {
    try {
        element.dispatchEvent(event)
    } catch (e) { // For IE11 hooray!!!
        try {
            const ev = window.document.createEvent('HTMLEvents')
            ev.initEvent(event.type, !!event.bubbles, !!event.cancelable)
            element.dispatchEvent(ev)
        } catch (ex) {
            // empty
        }
    }
}

function flushEvents() {
    if (iframes) {
        iframes = null
        if (events) {
            const invoke = [...events.entries()]
            events = null
            invoke.forEach(trigger)
        }
    }
}

module.exports = {
    registerForEvents,
    flushEvents
}