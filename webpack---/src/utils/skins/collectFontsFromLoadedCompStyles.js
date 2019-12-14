'use strict'
const _ = require('lodash')
const coreUtilsLib = require('santa-core-utils')

const fontUtils = coreUtilsLib.fonts

function getPropertySource(paramValue) {
    return /^(font|color)_[0-9]+$/.test(paramValue) ? 'theme' : 'value'
}

function getFontsFromSkin(generalTheme, skin, styleData, getSkin) {
    let fonts = []
    if (skin.exports) {
        fonts = _(skin.exports)
            .pickBy(childComp => childComp.skin && getSkin(childComp.skin))
            .flatMap(childComp => getFontsFromSkin(generalTheme, getSkin(childComp.skin), styleData, getSkin))
            .value()
    }
    if (skin.params) {
        const fontParamNames = _.keys(_.omitBy(skin.params, value => value !== 'FONT'))
        if (_.has(styleData, 'style.properties')) {
            _.forEach(fontParamNames, function(paramName) {
                let fontFamily = ''
                const propertyValue = styleData.style.properties[paramName] || skin.paramsDefaults[paramName]
                const propertySource = getPropertySource(propertyValue)

                if (propertySource === 'value') {
                    fontFamily = fontUtils.parseFontStr(propertyValue).family.toLowerCase()
                } else if (propertySource === 'theme') {
                    fontFamily = fontUtils.getFontFamilyByStyleId(generalTheme, propertyValue)
                }
                if (fontFamily) {
                    fonts.push(fontFamily.replace(/\u0000$/, '')) //eslint-disable-line no-control-regex
                }
            })
        }
    }

    return fonts
}

function collectFontsFromLoadedCompStyles(styleItems, generalTheme, getSkin) {
    return _.reduce(styleItems, (collectedFonts, styleItem, styleId) => {
        const skin = getSkin(styleItem ? styleItem.skin : styleId)
        if (skin) {
            return collectedFonts.concat(getFontsFromSkin(generalTheme, skin, styleItem, getSkin))
        }

        return collectedFonts
    }, [])
}

module.exports = collectFontsFromLoadedCompStyles