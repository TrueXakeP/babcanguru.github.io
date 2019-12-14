/* eslint-disable fp/no-unused-expression, no-undef*/
'use strict'
const layoutUtils = require('carmi-host-extensions/src/layout/layoutUtils')
const {
    BEATS
} = require('bolt-main/src/bi/constants')

module.exports = () => ({
    publicModel,
    rendererModel,
    serviceTopology,
    requestModel,
    wixBiSession,
    mobileDeviceAnalyzer
}, setSsrSucceeded, setServerMarkup, warmupDoneCallback, reportBeatEvent, registerToIframesLoadEvent, appLoadingPhaseStart, appLoadingPhaseFinish, prefersReducedMotion) => {
    appLoadingPhaseStart('warmup')
    const _ = requirejs('lodash')
    const warmupUtils = requirejs('warmupUtils')
    const $ = requirejs('zepto')
    const {
        indicator,
        constants,
        urlUtils
    } = warmupUtils
    const shouldShowDebugInformation = warmupUtils.shouldShowDebugInformation()

    window.sssr = {} // TODO † jesus †, let's not copy this naming to bolt

    $(() => {
        const ssrReturnedBody = !_.isUndefined(window.clientSideRender)
        if (!ssrReturnedBody) {
            window.clientSideRender = true
            window.santaRenderingError = {
                errorInfo: constants.BODY_NOT_RENDERED_ERR,
                reason: constants.BODY_NOT_RENDERED_ERR
            }

            const siteContainer = window.document.createElement('DIV')
            siteContainer.setAttribute('id', 'SITE_CONTAINER')
            window.document.body.appendChild(siteContainer)
        }

        const ssrSucceeded = window.clientSideRender === false

        indicator.init('Bolt', () => {
            switch (indicator.getState()) {
                case indicator.STATES.PREWARMUP:
                    warmup()
                    break
                case indicator.STATES.STANDBY:
                    indicator.updateState(indicator.STATES.RENDERING)
                    warmupSuccess()
                    break
                default:
                    return
            }
        })

        if (!urlUtils.isTrue('ssrPrewarmupOnly')) {
            warmup()
        }

        function warmup() {
            if (!ssrSucceeded) {
                indicator.updateStateOnClientSide()

                if (window.santaRenderingError && shouldShowDebugInformation) {
                    const errorInfo = _.get(window.santaRenderingError, 'errorInfo', '')
                    const message = '%cUnable to render using Server Side Rendering. Defaulting to client-side render.'
                    const messageStyle = 'color: red; font-size: large'
                    console.error(message, messageStyle)
                    console.error(`Reason: ${errorInfo}`)
                }

                console.timeEnd('warmup')
                warmupDoneCallback()
                return
            }

            const serverMarkup = window.document.getElementById('SITE_CONTAINER').innerHTML
            setServerMarkup(serverMarkup)

            registerToIframesLoadEvent()

            const {
                layoutData: layoutWarmupData
            } = window.warmupData

            const isResponsive = _.get(rendererModel, ['siteMetaData', 'isResponsive'], false)
            if (layoutWarmupData && !isResponsive) {
                const layout = requirejs('layout')
                const layoutData = _.assign({},
                    layoutWarmupData, {
                        publicModel,
                        rendererModel,
                        serviceTopology,
                        requestModel,
                        wixBiSession,
                        primaryPageNavigationInfo: warmupData.rootNavigationInfo,
                        devicePixelRatio: mobileDeviceAnalyzer.getDevicePixelRatio(),
                        isViewerMode: !rendererModel.isPreview
                    }
                )
                const siteData = layoutUtils.createSiteData(layoutData, {
                    warmupUtils,
                    lodash: _
                }, true, prefersReducedMotion)
                const {
                    runLayout,
                    isMobileDevice
                } = layoutUtils.init({
                    dependencies: {
                        warmupUtils,
                        layout,
                        lodash: _
                    },
                    siteData
                })
                runLayout({
                    isPageAllowed: layoutData.isPageAllowed
                }, afterLayout.bind(null, isMobileDevice), true)
            } else {
                afterLayout()
            }
        }

        function afterLayout(isMobileDevice) {
            removeServerGeneratedClassesForLegacyWixSiteHTMLembeds(isMobileDevice)
            $('body').removeClass('prewarmup')
            const {
                beatNumber,
                eventName
            } = BEATS.DONE_WARMUP
            const {
                rootNavigationInfo
            } = warmupData
            const extra = rootNavigationInfo && rootNavigationInfo.pageId
            reportBeatEvent(beatNumber, eventName, extra)
            appLoadingPhaseFinish('warmup')
            indicator.updateState(indicator.STATES.WARMUP)
            if (urlUtils.isTrue('ssrWarmupOnly')) {
                indicator.updateState(indicator.STATES.STANDBY)
            } else {
                warmupSuccess()
            }
        }

        function removeServerGeneratedClassesForLegacyWixSiteHTMLembeds(isMobileDevice) {
            const elementsHiddenByServer = $('.hiddenTillReady')
            if (isMobileDevice) {
                $('.wix-menu-enabled').removeClass('wix-menu-enabled') //remove server class from the menu so it doesn't mess with our site placement... they have top:60px!important
                elementsHiddenByServer.css({
                    display: 'none'
                }) //the server sets the opacity to 0, we want display:none in mobile so it doesn't take up space in DOM
            } else {
                elementsHiddenByServer.removeClass('hiddenTillReady') //we want it to be visible after site is rendered in client.
            }
        }

        function warmupSuccess() {
            setSsrSucceeded(true)
            warmupDoneCallback()
        }
    })
}