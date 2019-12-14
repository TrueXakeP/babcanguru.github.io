import '@webcomponents/custom-elements'
import {
    wixCustomElementsRegistry
} from 'wix-custom-elements'
import imageClientApi from 'image-client-api'
import fastdom from 'fastdom'
import ResizeObserver from 'wix-resize-observer-polyfill'
import getQueryUtils from 'santa-main-r/lib/lib/common/getQueryUtils.js'
import addExperimentsFromQuery from 'santa-main-r/lib/lib/common/addExperimentsFromQuery'
import {
    prefersReducedMotion
} from './functionLibrary/accessability'

const queryUtil = getQueryUtils(window)
const runningExperiments = addExperimentsFromQuery(window.rendererModel.runningExperiments, queryUtil, 'viewer')

const isExperimentOpen = experimentName => {
    const val = runningExperiments[experimentName]
    return !!(val && val !== 'old' && val !== 'false')
}

const getDevicePixelRatio = () => {
    const isMSMobileDevice = /iemobile/i.test(navigator.userAgent)
    if (isMSMobileDevice) {
        return Math.round(window.screen.availWidth / (window.screen.width || window.document.documentElement.clientWidth))
    }
    return window.devicePixelRatio
}

const serviceTopology = window.serviceTopology

const environmentConsts = {
    staticMediaUrl: serviceTopology.staticMediaUrl,
    mediaRootUrl: serviceTopology.mediaRootUrl,
    experiments: {},
    isViewerMode: !window.rendererModel.previewMode,
    devicePixelRatio: getDevicePixelRatio()
}

const resizeService = {
    init: callback => new ResizeObserver(callback)
}

const windowResizeService = {
    init: callback => window.addEventListener('resize', callback)
}

const biService = {
    reportBI: () => {}
}


if (isExperimentOpen('bv_wixImage') ||
    isExperimentOpen('bv_wixImagePhaseTwo') ||
    isExperimentOpen('bv_wixDropdown') ||
    isExperimentOpen('bv_wixVideo')) {
    const wixCustomElements = wixCustomElementsRegistry.init({
        resizeService,
        windowResizeService
    })

    if (isExperimentOpen('bv_wixImage') || isExperimentOpen('bv_wixImagePhaseTwo')) {
        wixCustomElements.defineWixImage({
            mutationService: fastdom,
            biService
        }, environmentConsts)
        wixCustomElements.defineWixBgImage({
            mutationService: fastdom,
            biService
        }, environmentConsts)
        wixCustomElements.defineWixBgMedia({
            mutationService: fastdom,
            biService
        }, environmentConsts)
    }

    if (isExperimentOpen('bv_wixDropdown')) {
        wixCustomElements.defineWixDropdownMenu({
            mutationService: fastdom,
            biService
        })
    }

    if (isExperimentOpen('bv_wixVideo')) {
        const reducedMotion = prefersReducedMotion() && isExperimentOpen('bv_reducedMotion')
        wixCustomElements.defineWixVideo({
            mutationService: fastdom,
            biService
        }, {
            prefersReducedMotion: reducedMotion
        })
    }
}

module.exports = {
    loadedModules: {
        imageClientApi
    }
}