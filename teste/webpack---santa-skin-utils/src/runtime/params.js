'use strict'

const _ = require('lodash')
const color = require('color')
const {
    checkIsParamAnAliasAndGetUnaliasedValue
} = require('./paramAliases')

const paramMutators = {
    //color
    brightness(paramValue, brightness) {
        return paramValue.value(brightness * paramValue.hsv().v)
    },
    alpha(paramValue, alpha) {
        return paramValue.alpha(alpha * paramValue.alpha())
    },
    //size
    decrease(paramValue, decreaseFrom) {
        return _.parseInt(paramValue) - _.parseInt(decreaseFrom)
    },
    increase(paramValue, increaseFrom) {
        return _.parseInt(paramValue) + _.parseInt(increaseFrom)
    },
    multiply(paramValue, multiplyOn) {
        return _.parseInt(paramValue) * parseFloat(multiplyOn)
    },
    max(paramValue, maxValue) {
        return Math.max(_.parseInt(paramValue), _.parseInt(maxValue))
    },
    eval(paramValue, expression, evaluators) {
        return evaluators[expression](paramValue)
    }
}

function applyMutator(paramValue, mutator, evals) {
    if (paramMutators[mutator.type]) {
        return paramMutators[mutator.type](paramValue, mutator.value, evals)
    }
    return paramValue
}

function applyMutators(paramName, paramValue, paramsMutators, evaluators) {
    if (paramsMutators && paramsMutators[paramName]) {
        //TODO: multiply multiple alpha mutators before applying (like in Audio3dPlayer)
        const mutator = paramsMutators[paramName]

        return applyMutator(paramValue, mutator, evaluators)
    }
    return paramValue
}

function isBoxShadowOff(paramName, styleData, paramsDefaults) {
    const shadowOnProp = `boxShadowToggleOn-${paramName}`
    const isShadowOn = styleData[shadowOnProp] || paramsDefaults[shadowOnProp]
    return isShadowOn === 'false'
}

function limitBorderRadius(paramValue) {
    //FF and IE don't support css numbers larger than 17895697 (0x1111111); We limit to 99999 for good measure's sake
    //Also, make the fix only if we're dealing with data from style, since we assume data from skin will be OK

    let borderRadius = ''
    _.forEach(paramValue.replace(/px/g, '').split(' '), br => {
        const brValue = Math.min(_.parseInt(br), 99999)
        borderRadius += ` ${brValue}${brValue === 0 ? '' : 'px'}`
    })

    paramValue = borderRadius.substring(1)
    return paramValue
}

function limitBorderSizes(paramValue) {
    //FF and IE don't support css numbers larger than 17895697 (0x1111111); We limit to 99999 for good measure's sake
    //Also, make the fix only if we're dealing with data from style, since we assume data from skin will be OK
    const limit = 99999
    if (typeof paramValue === 'number') {
        return `${Math.min(_.parseInt(paramValue), limit)}px`
    }
    let borderSize = ''
    _.forEach(paramValue.replace(/px/g, '').split(' '), br => {
        const brValue = Math.min(_.parseInt(br), limit)
        borderSize += ` ${brValue}${brValue === 0 ? '' : 'px'}`
    })

    paramValue = borderSize.substring(1)
    return paramValue
}

function handleColorParam(value, colors) {
    const colorParts = value.split('color_')
    if (colorParts.length === 2) {
        value = colors[_.parseInt(colorParts[1])]
    }
    if (_.includes(value, ',') && !_.includes(value, 'rgb')) {
        value = `rgba(${value})`
    }
    return color(value)
}

function handleColorAlphaProp(value, paramName, paramsDefaults, styleData) {
    const mappedParamName = Array.isArray(paramsDefaults[paramName]) && paramsDefaults[paramName][0]
    const alphaProp = `alpha-${mappedParamName || paramName}`

    const alpha = !_.isUndefined(styleData[alphaProp]) ? styleData[alphaProp] : paramsDefaults[alphaProp]
    if (!_.isUndefined(alpha)) {
        value = paramMutators.alpha(value, parseFloat(alpha))
    }

    return value
}

function getCssUnits(cssValue) {
    const numericValue = _.parseInt(cssValue).toString()
    cssValue = cssValue.toString()

    if (isNaN(numericValue) || cssValue === numericValue) {
        return ''
    }

    return cssValue.substr(cssValue.indexOf(numericValue) + numericValue.length)
}

function getParamValue(paramName, styleData, paramsDefaults) {
    let paramValue = !_.isUndefined(styleData[paramName]) ? styleData[paramName] : paramsDefaults[paramName]

    if (!_.isArray(paramValue)) {
        return paramValue
    }

    if (paramValue.length === 1) {
        return styleData[paramValue[0]] || paramsDefaults[paramValue[0]]
    }

    let units = ''
    paramValue = _.reduce(paramValue, (sum, parameterName) => {
        const paramVal = styleData[parameterName] || paramsDefaults[parameterName]
        units = units || getCssUnits(paramVal)
        return sum + _.parseInt(paramVal)
    }, 0)

    if (units === 'x') { //not sure its needed, possibly because of corrupted data
        units = 'px'
    }

    return paramValue + units
}

function renderParam(paramName, skinData, styleData, colors, evaluators) {
    if (!skinData.params) {
        return ''
    }

    const paramType = checkIsParamAnAliasAndGetUnaliasedValue(skinData.params[paramName])
    let paramValue = getParamValue(paramName, styleData, skinData.paramsDefaults)

    if (typeof paramValue === 'undefined' || !paramType) {
        return ''
    }

    switch (paramType) {
        case 'BG_COLOR':
        case 'COLOR':
        case 'COLOR_ALPHA':
            paramValue = handleColorParam(paramValue, colors)
            paramValue = handleColorAlphaProp(paramValue, paramName, skinData.paramsDefaults, styleData)
            break

        case 'BORDER_RADIUS':
            if (styleData[paramName]) {
                paramValue = limitBorderRadius(paramValue)
            }
            break

        case 'BORDER_SIZES':
            if (styleData[paramName]) {
                paramValue = limitBorderSizes(paramValue)
            }
            break

        case 'BOX_SHADOW':
            if (isBoxShadowOff(paramName, styleData, skinData.paramsDefaults)) {
                return ''
            }
            break

        default:
    }

    paramValue = applyMutators(paramName, paramValue, skinData.paramsMutators, evaluators)

    return {
        type: paramType,
        value: paramValue
    }
}

module.exports = {
    renderParam
}