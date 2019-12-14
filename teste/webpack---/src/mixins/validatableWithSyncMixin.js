'use strict'
const _ = require('lodash')

function getPublicState(state) {
    return {
        shouldShowValidationIndication: _.get(state, 'shouldShowValidationIndication', false),
        customValidityToSet: null
    }
}

module.exports = {
    validatableWithSync: {
        getInitialState() {
            return {
                validateData: {}
            }
        },

        isValid() {
            return _.get(this.state, ['validateData', 'validity', 'valid'], true)
        },

        getValidity() {
            return _.get(this.state, ['validateData', 'validity'])
        },

        syncValidationData(validateData) {
            this.setState({
                validateData
            })
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
        },

        resetValidity() {
            this.setState({
                validateData: {}
            })
        }
    },

    getPublicState,

    VALIDATABLE_WITH_SYNC_BEHAVIORS: {
        updateValidityIndication: {
            methodName: 'updateValidityIndication',
            params: ['value']
        },
        syncValidationData: {
            methodName: 'syncValidationData',
            params: ['validateData']
        }
    }
}