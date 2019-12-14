'use strict'

const _ = require('lodash')

function getPublicState(state) {
    return {
        shouldShowValidationIndication: _.get(state, 'shouldShowValidationIndication', false),
        customValidityToSet: null
    }
}

module.exports = {
    validatable: {
        requestSetCustomValidity(customValidity) {
            this.setState({
                customValidityToSet: customValidity
            })
        },

        componentDidUpdate() {
            if (_.isString(this.state.customValidityToSet) && _.isFunction(this.setCustomValidity)) {
                this.setCustomValidity(this.state.customValidityToSet)
                this.setState({
                    customValidityToSet: null
                })
            }
        },

        updateValidityIndication(value) {
            this.setState({
                shouldShowValidationIndication: value
            })
        },

        showValidityIndication() {
            this.updateValidityIndication(true)
        },

        hideValidityIndication() {
            this.updateValidityIndication(false)
        },

        shouldShowValidityIndication() {
            return this.state.shouldShowValidationIndication
        }
    },
    getPublicState,
    VALIDATABLE_BEHAVIORS: {
        setCustomValidity: {
            methodName: 'requestSetCustomValidity',
            params: ['customValidity']
        },
        updateValidityIndication: {
            methodName: 'updateValidityIndication',
            params: ['value']
        }
    }
}