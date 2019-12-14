'use strict'

const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')

/**
 * Created by alexandreroitman on 08/05/2016.
 */

module.exports = {
    propTypes: {
        id: santaTypesDefinitions.Component.id.isRequired,
        setRuntimeCompData: santaTypesDefinitions.DAL.setCompData.isRequired,
        setRuntimeCompProps: santaTypesDefinitions.DAL.setCompProps.isRequired
    },

    updateData(newData) {
        this.props.setRuntimeCompData(this.props.id, newData)
    },

    updateProps(newProps) {
        this.props.setRuntimeCompProps(this.props.id, newProps)
    }
}