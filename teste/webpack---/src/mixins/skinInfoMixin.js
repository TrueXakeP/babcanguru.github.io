'use strict'

const _ = require('lodash')
const skins = require('santa-skin-utils')
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')
const getSkinFromSkinsDefinitions = require('./getSkinFromSkinsDefinitions')

module.exports = skinsJson => ({
    propTypes: {
        skin: santaTypesDefinitions.Component.skin,
        structure: santaTypesDefinitions.Component.structure,
        compTheme: santaTypesDefinitions.Component.theme,
        themeColor: santaTypesDefinitions.Theme.colors,
        isExperimentOpen: santaTypesDefinitions.isExperimentOpen
    },

    getParams(paramNames, skinName) {
        const params = {}

        _.forEach(paramNames, paramName => {
            params[paramName] = this.getParamFromDefaultSkin(paramName, skinName)
        })

        return params
    },

    getParamFromDefaultSkin(paramName, skinName) {
        return this.getParamFromSkin(paramName, skinName || this.props.skin)
    },

    getParamFromSkin(paramName, skinName) {
        let styleData = _.get(this.props.compTheme, 'style.properties') || {}
        const skinData = getSkinFromSkinsDefinitions(skinsJson, skinName, this.props.isExperimentOpen)
        const val = styleData[paramName] || skinData.paramsDefaults && skinData.paramsDefaults[paramName]

        if (_.isArray(val) && val.length > 1) {
            styleData = _.clone(styleData)
            styleData[paramName] = this.getSumParamValue(paramName, skinName)
        }
        return skins.renderParam(paramName, skinData, styleData, this.props.themeColor)
    },

    getSumParamValue(paramName, skinName) {
        const skinExports = this.getSkinExports()
        const paramsDefaults =
            getSkinFromSkinsDefinitions(skinsJson, skinName, this.props.isExperimentOpen).paramsDefaults
        const val = paramsDefaults && paramsDefaults[paramName]
        if (!val) {
            const exportsVal = skinExports[paramName]
            return exportsVal ? Math.abs(parseInt(exportsVal, 10)) || 0 : 0
        }
        if (Array.isArray(val)) {
            return _.sumBy(val, item => Math.abs(parseInt(this.getParamFromSkin(item, skinName).value, 10)))
        }
        return Math.abs(parseInt(val, 10)) || 0
    },

    getFromExports(paramName) {
        const exports = this.getSkinExports()
        return exports && exports[paramName] || 0
    },

    getStyleData(props) {
        props = props || this.props
        return _.get(props.compTheme, 'style.properties') || {}
    }
})