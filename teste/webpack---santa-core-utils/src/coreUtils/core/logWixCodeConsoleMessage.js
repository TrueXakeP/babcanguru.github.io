'use strict'

const _ = require('lodash')
const window = require('./windowGlobal')
const stringifySpecialTypesReplacer = require('./stringifySpecialTypesReplacer')

const WIX_CODE_INTENT = 'WIX_CODE'
const WIX_CODE_CONSOLE_MESSAGE_TYPE = 'console'

function isPreview() {
    return window.parent && window.parent !== window
}

function isWixCodeConsoleMessage(msg) {
    return msg.intent === WIX_CODE_INTENT && msg.type === WIX_CODE_CONSOLE_MESSAGE_TYPE
}

function convertToWixCodeConsoleMessage(logLevel, ...msg) {
    return {
        intent: WIX_CODE_INTENT,
        type: WIX_CODE_CONSOLE_MESSAGE_TYPE,
        data: {
            logLevel,
            args: [...msg]
        }
    }
}

function sendMessage(wixCodeConsoleMessage) {
    window.parent.postMessage(serializeMessage(wixCodeConsoleMessage), '*')
}

function logWixCodeConsoleMessage(msg, logLevel = logLevels.info) {
    if (!msg) {
        return
    }

    if (logLevel === logLevels.ERROR) {
        throw new Error('For error messages, please use "logWixCodeConsoleError"')
    }

    if (_.isString(msg)) {
        msg = convertToWixCodeConsoleMessage(logLevel, msg)
    }

    if (isWixCodeConsoleMessage(msg) && isPreview()) {
        sendMessage(msg)
    }
}

function serializeMessage(message) {
    return JSON.stringify(message, stringifySpecialTypesReplacer)
}

function logWixCodeConsoleError(error) {
    if (isPreview()) {
        const wixCodeConsoleMessage = convertToWixCodeConsoleMessage(logLevels.ERROR, error.name, error.message, error.stack)
        sendMessage(wixCodeConsoleMessage)
    }
}

const logLevels = {
    LOG: 'LOG',
    INFO: 'INFO',
    WARNING: 'WARNING',
    VERBOSE: 'VERBOSE',
    ERROR: 'ERROR'
}

module.exports = {
    logLevels,
    logWixCodeConsoleMessage,
    logWixCodeConsoleError,
    serializeMessage
}