'use strict'

const _ = require('lodash')
const coreUtilsLib = require('santa-core-utils')
const santaTypesDefinitions = require('../definitions/santaTypesDefinitions')
const textScaleMixin = require('./textMixins/textScaleMixin')

function getLabelMargins(props) {
    const margins = {}
    if (props.compProp.align !== 'center') {
        const marginProp = `margin${props.compProp.align ? coreUtilsLib.stringUtils.capitalize(props.compProp.align) : ''}`
        margins[marginProp] = props.compProp.margin
    }
    return margins
}

function getLabelPadding(props) {
    const padding = {}
    if (props.compProp.padding !== '') {
        padding.padding = props.compProp.padding
    }
    return padding
}

function getLineHeight(container) {
    if (container.shouldRecalculateLineHeight) {
        return {
            lineHeight: ''
        }
    }
    return {}
}

function buttonMixin(skins) {
    return {
        propTypes: {
            compData: santaTypesDefinitions.Component.compData,
            scale: santaTypesDefinitions.Component.scale,
            compProp: santaTypesDefinitions.Component.compProp
        },

        mixins: [textScaleMixin(skins)],

        componentWillMount() {
            this.currentStyle = this.props.theme
            this.currentScale = this.props.scale || 1
        },
        componentWillReceiveProps(nextProps) {
            const newStyle = nextProps.theme
            const newScale = nextProps.scale || 1
            if (!_.isEqual(this.currentStyle, newStyle) || this.currentScale !== newScale) {
                this.shouldRecalculateLineHeight = true
            }
            this.currentStyle = newStyle
            this.currentScale = newScale
        },
        componentDidUpdate() {
            if (this.shouldRecalculateLineHeight) {
                this.shouldRecalculateLineHeight = false
            }
        },
        resetMinHeightIfNeeded(skinProps) {
            if (this.shouldRecalculateLineHeight) { //MUST keep this if here. Though technically always resetting the minHeight makes sense, it just DOESNT WORK for some weird reason.
                skinProps[''] = skinProps[''] || {}
                skinProps[''].style = skinProps[''].style || {}
                skinProps[''].style.minHeight = ''
            }
        },
        getLabelStyle() {
            const style = _.merge(
                getLabelMargins(this.props),
                getLabelPadding(this.props),
                this.getFontSize(),
                getLineHeight(this)
            )
            return _.omitBy(style, _.isUndefined)
        }
    }
}

module.exports = buttonMixin