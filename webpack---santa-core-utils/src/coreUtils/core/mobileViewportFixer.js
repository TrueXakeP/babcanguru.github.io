'use strict'

function fixViewportTag(siteData, params) {
    const viewport = typeof document !== 'undefined' && window.document.getElementById('wixMobileViewport')
    if (!viewport) {
        return
    }

    const browserFlags = siteData.browserFlags()
    const responsive = params && params.isResponsive
    const width = responsive ? 'device-width' : siteData.getSiteWidth()
    const userScalable = responsive && browserFlags.forceOverflowScroll ? 'no' : 'yes'
    const finalizeViewport = () => viewport.setAttribute('content', `width=${width}, user-scalable=${userScalable}`)

    if (responsive || !browserFlags.doubleResetMobileViewport) {
        finalizeViewport()
        return
    }

    viewport.setAttribute('content', `width=${width}, user-scalable=yes, initial-scale=0`)
    return window.requestAnimationFrame(() => {
        viewport.setAttribute('content', `width=${width}, user-scalable=yes, initial-scale=${window.screen.width / width}`)
        return window.requestAnimationFrame(finalizeViewport)
    })
}

module.exports = {
    fixViewportTag
}