'use strict'

const _ = require('lodash')
const getInnerBorderRadius = require('../formatters/getInnerBorderRadius')
const getFontWithSizeInRange = require('../formatters/getFontWithSizeInRange')
const isEmptyCSSValue = require('../formatters/isEmptyCSSValue')
const getValueByCondition = require('../formatters/getValueByCondition')
const getColorWithOpacity = require('../formatters/getColorWithOpacity')
const calcTagBorderSize = require('../formatters/calcTagBorderSize')
const increaseAlphaChannel = require('../formatters/increaseAlphaChannel')

/* this is the place to add function used by the custom render of a string E.g $render function.*/

module.exports = {
    identity: _.identity,
    calcTagBorderSize,
    getInnerBorderRadius,
    getFontWithSizeInRange,
    isEmptyCSSValue,
    getValueByCondition,
    getColorWithOpacity,
    increaseAlphaChannel
}