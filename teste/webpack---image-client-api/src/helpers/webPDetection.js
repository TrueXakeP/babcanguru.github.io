/*
web browsers that natively support WebP
https://developers.google.com/speed/webp/faq
 */

'use strict'
const browserDetect = require('wix-browser-detection')
const globalFeatureSupportObject = require('./imageServiceFeatureSupportObject')

const constants = require('./imageServiceConstants')

/**
 * Check once for browser support and store on global features support object
 * https://developers.google.com/speed/webp/faq#how_can_i_detect_browser_support_using_javascript
 */
function checkWEBPSupport(type) {
    const webpTypes = {
        lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
        lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
        alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
        animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
    }
    const isWebpFeature = globalFeatureSupportObject.getFeature('isWEBP')
    const webpImg = new window.Image()
    webpImg.onload = () => {
        isWebpFeature[type] = webpImg.width > 0 && webpImg.height > 0
        globalFeatureSupportObject.setFeature('isWEBP', isWebpFeature)
    }
    webpImg.onerror = () => {
        isWebpFeature[type] = false
        globalFeatureSupportObject.setFeature('isWEBP', isWebpFeature)
    }
    webpImg.src = `data:image/webp;base64,${webpTypes[type]}`
}


const isWebPLossy = (os, osVersion, browser, browserVersion, appleWebKitVersion) => {
    const chrome_desktop_17 = !os.phone && !os.tablet && browser.chrome && browserVersion >= 17
    const chrome_android_25 = os.android && (os.phone || os.tablet) && browser.webkit && browser.chrome && browserVersion >= 25
    const native_android_4 = os.android && appleWebKitVersion < 535 && (os.phone || os.tablet) && osVersion >= 4 && browser.webkit
    const edge_desktop_18 = browser.edge && browserVersion >= 18
    const firefox_desktop_65 = !os.firefoxos && browser.firefox && !browser.webkit && browserVersion >= 65

    return !!(chrome_desktop_17 || chrome_android_25 || native_android_4 || edge_desktop_18 || firefox_desktop_65)
}

const isWebPLosslessAndAlpha = (os, osVersion, browser, browserVersion, appleWebKitVersion) => {
    const chrome_desktop_23 = !os.phone && !os.tablet && browser.chrome && browserVersion >= 23
    const chrome_android_25 = os.android && (os.phone || os.tablet) && browser.webkit && browser.chrome && browserVersion >= 25
    const native_android_4_2 = os.android && appleWebKitVersion < 535 && (os.phone || os.tablet) && osVersion >= 4.2 && browser.webkit && !browser.safari
    const edge_desktop_18 = browser.edge && browserVersion >= 18
    const firefox_desktop_65 = !os.firefoxos && browser.firefox && !browser.webkit && browserVersion >= 65

    return !!(chrome_desktop_23 || chrome_android_25 || native_android_4_2 || edge_desktop_18 || firefox_desktop_65)
}

const isWebPAnimation = (os, osVersion, browser, browserVersion) => {
    const chrome_32 = !os.ios && browser.chrome && browserVersion >= 32
    const edge_desktop_18 = browser.edge && browserVersion >= 18
    const firefox_desktop_65 = !os.firefoxos && browser.firefox && !browser.webkit && browserVersion >= 65

    return !!(chrome_32 || edge_desktop_18 || firefox_desktop_65)
}

/**
 *
 * @param userAgent
 */
const checkSupportByUserAgent = userAgent => {
    if (userAgent) {
        const {
            browser,
            os
        } = browserDetect(userAgent)
        const browserVersion = parseFloat(browser.version)
        const osVersion = parseFloat(os.version)
        // Apple webkit
        const regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/)
        const resultAppleWebKitRegEx = regExAppleWebKit.exec(userAgent)
        const appleWebKitVersion = resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(userAgent)[1])

        const isLosslessAndAlpha = isWebPLosslessAndAlpha(os, osVersion, browser, browserVersion, appleWebKitVersion)
        globalFeatureSupportObject.setFeature('isWEBP', {
            [constants.webp.LOSSY]: isWebPLossy(os, osVersion, browser, browserVersion, appleWebKitVersion),
            [constants.webp.LOSSLESS]: isLosslessAndAlpha,
            [constants.webp.ALPHA]: isLosslessAndAlpha,
            [constants.webp.ANIMATION]: isWebPAnimation(os, osVersion, browser, browserVersion)
        })
    }
}

const checkSupportByFeatureDetection = () => {
    // jpg 2 webp
    checkWEBPSupport(constants.webp.LOSSY)
    // png 2 webp
    checkWEBPSupport(constants.webp.LOSSLESS)
    checkWEBPSupport(constants.webp.ALPHA)
    // 2 animation
    checkWEBPSupport(constants.webp.ANIMATION)
}

/**
 * check if the browser supports webp image display
 * for the image source type
 * @param {string}    fileType
 * @returns {boolean}
 */
function isWEBPBrowserSupport(fileType) {
    const isWebpFeature = globalFeatureSupportObject.getFeature('isWEBP')
    const isLosssyJPG = fileType === constants.fileType.JPG && isWebpFeature[constants.webp.LOSSY]
    const isLosslessPNG = fileType === constants.fileType.PNG && isWebpFeature[constants.webp.LOSSLESS]
    const isAlphaPNG = fileType === constants.fileType.PNG && isWebpFeature[constants.webp.ALPHA]

    return isLosssyJPG || isLosslessPNG && isAlphaPNG
}

module.exports = {
    checkSupportByUserAgent,
    checkSupportByFeatureDetection,
    isWEBPBrowserSupport
}