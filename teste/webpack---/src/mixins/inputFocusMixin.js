'use strict'

const _ = require('lodash')

module.exports = {
    INPUT_FOCUS_BEHAVIORS: {
        focus: {
            methodName: 'requestFocus'
        },
        blur: {
            methodName: 'requestBlur'
        }
    },
    requestFocus() {
        _.invoke(this, 'focus')
    },
    requestBlur() {
        _.invoke(this, 'blur')
    }
}