'use strict'

const _ = require('lodash')
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')

function isFixedPosition(props) {
    return _.get(props.style, 'position') === 'fixed'
}

function getCssStates(props) {
    return {
        $mobile: props.isMobileView ? 'mobileView' : '',
        $fixed: isFixedPosition(props) ? 'fixedPosition' : ''
    }
}

module.exports = {
    propTypes: {
        isMobileView: santaTypesDefinitions.isMobileView.isRequired,
        style: santaTypesDefinitions.Component.style.isRequired
    },

    getRootStyle(style) {
        if (this.getRootPosition) {
            return {
                position: this.getRootPosition(style)
            }
        }
        return {}
    },

    getInitialState() {
        return getCssStates(this.props)
    },

    componentWillReceiveProps(nextProps) {
        const oldCssStates = getCssStates(this.props) //we do this because we don't know if a component using the mixin has other states, so we cant compare with this.state
        const newCssStates = getCssStates(nextProps)
        if (!_.isEqual(oldCssStates, newCssStates)) {
            this.setState(newCssStates)
        }
    }
}