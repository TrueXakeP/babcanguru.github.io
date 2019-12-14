/*eslint no-console:0*/
'use strict'
const _ = require('lodash')
const urlUtils = require('./urlUtils')
const log = console.log.bind(console)
const warn = console.warn.bind(console)
const BASE_DEPRECATION_MESSAGE = 'DocumentServices|Deprecated|'

const debugEnabled = isDebug()
const verbose = debugEnabled ? log : _.noop
const warnVerbose = debugEnabled ? warn : _.noop

function isDebug() {
    return typeof window === 'undefined' ? true : urlUtils.parseUrl(_.get(window, ['location', 'href'], '')).query.debug === 'all'
}

module.exports = {
    isDebug,
    verbose,
    info: log,
    warnVerbose,
    warn,
    error: console.error.bind(console),
    warnDeprecation(deprecationMessage) {
        if (debugEnabled) {
            console.error.call(console, BASE_DEPRECATION_MESSAGE + deprecationMessage)
        }
    }
}