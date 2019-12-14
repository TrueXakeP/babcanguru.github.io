'use strict'

const _ = require('lodash')
const ssrMediaPreMeasureUtils = require('./ssrMediaPreMeasureUtils')

const defaultParams = {
    position: 'absolute',
    isFullScreen: false,
    getHeight: function getCompHeight(measureMap, compHeight) {
        return compHeight
    }
}

const fullScreenParams = {
    position: 'fixed',
    isFullScreen: true,
    getHeight: function getWindowOrCompHeight(measureMap, compHeight) {
        return Math.max(measureMap.height.screen, compHeight)
    }
}

const effectNameByBehaviors = {
    BackgroundParallax: ['BackgroundParallax'],
    BackgroundReveal: ['BackgroundReveal'],
    BackgroundParallaxZoom: ['BackgroundParallax', 'BackgroundZoom'],
    BackgroundFadeIn: ['BackgroundFadeIn'],
    BackgroundBlurIn: ['BackgroundBlurIn']
}

const paramsByEffectMap = {
    None: defaultParams,
    BackgroundFadeIn: defaultParams,
    BackgroundBlurIn: defaultParams,
    BackgroundReveal: fullScreenParams,
    BackgroundParallax: fullScreenParams,
    BackgroundParallaxZoom: fullScreenParams
}

/**
 *
 * @param effectName
 * @param renderFixedPositionBackgrounds
 * @returns {*|string}
 */
function getPositionByEffect(effectName, renderFixedPositionBackgrounds) {
    if (paramsByEffectMap[effectName] && renderFixedPositionBackgrounds !== false) {
        return paramsByEffectMap[effectName].position
    }
    return paramsByEffectMap.None.position
}

/**
 *
 * @param effectName
 * @param renderFixedPositionBackgrounds
 * @returns {boolean}
 */
function isFullScreenByEffect(effectName, renderFixedPositionBackgrounds) {
    if (paramsByEffectMap[effectName] && renderFixedPositionBackgrounds !== false) {
        return paramsByEffectMap[effectName].isFullScreen
    }
    return paramsByEffectMap.None.isFullScreen
}

/**
 *effectName
 * @param effectName
 * @param measureMap
 * @param compHeight
 * @returns {*}
 */
function getHeightByEffect(effectName, measureMap, compHeight) {
    return paramsByEffectMap[effectName] && paramsByEffectMap[effectName].getHeight(measureMap, compHeight) ||
        paramsByEffectMap.None.getHeight(measureMap, compHeight)
}

/**
 * Get the current effect name of a component
 * @param {string|object|undefined} behaviors
 * @param {boolean} isDesktopDevice
 * @param {boolean} isMobileView
 * @returns {string}
 */
function getBgEffectName(behaviors, isDesktopDevice, isMobileView) {
    if (!isDesktopDevice || isMobileView) {
        return ''
    }

    behaviors = _.isString(behaviors) ? JSON.parse(behaviors) : behaviors || []
    const behaviorNames = _(behaviors).filter({
        action: 'bgScrub'
    }).map('name').sortBy().value()
    return getEffectNameByBehaviors(behaviorNames)
}

/**
 * Return an effect name by list of behaviors
 * @param {array} behaviorNames
 */
function getEffectNameByBehaviors(behaviorNames) {
    return _.findKey(effectNameByBehaviors, effectBehaviors => _.isEqual(_.sortBy(effectBehaviors), behaviorNames))
}

module.exports = {
    getPositionByEffect,
    getHeightByEffect,
    isFullScreenByEffect,
    getImageUrlPreMeasureParams: ssrMediaPreMeasureUtils.getImageUrlPreMeasureParams,
    convertStyleToDimensions: ssrMediaPreMeasureUtils.convertStyleToDimensions,
    getBgEffectName
}