'use strict'
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')

function getState(publicState) {
    const propsInfo = {
        props: this.props.compProp,
        data: this.props.compData
    }

    return publicState.call(this, this.state, propsInfo)
}

/**
 * Creates a mixin that update RuntimeDal with the public state of the component.
 * @param {function(state: Object, {data: Object?, props: Object?})} getPublicState Function to get the public state out of the current state, data and properties
 * @returns {Object} The mixin definition
 */
function compStateMixin(getPublicState) {
    return {
        statics: {
            publicState: getPublicState
        },

        propTypes: {
            setCompState: santaTypesDefinitions.DAL.setCompState.isRequired,
            removeCompState: santaTypesDefinitions.DAL.removeCompState.isRequired,
            id: santaTypesDefinitions.Component.id.isRequired
        },

        componentWillUnmount() {
            this.props.removeCompState(this.props.id)
        },

        componentDidMount() {
            this.props.setCompState(this.props.id, getState.call(this, getPublicState))
        },

        componentDidUpdate() {
            this.props.setCompState(this.props.id, getState.call(this, getPublicState))
        }
    }
}

module.exports = compStateMixin