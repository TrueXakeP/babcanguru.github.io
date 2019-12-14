import requirejs from 'requirejs'
import {
    getPageInfo
} from 'santa-main-r/lib/lib/viewer/utils.js'
import _isSuspectedBot from 'santa-main-r/lib/lib/common/isSuspectedBot.js'
import instrumentsFactory from 'santa-main-r/lib/lib/viewer/instruments.js'
import getQueryUtils from 'santa-main-r/lib/lib/common/getQueryUtils.js'
import {
    getBaseVersion
} from 'santa-main-r/lib/lib/common/getBaseVersion.js'
import {
    BEATS
} from './constants.js'
import {
    track,
    get
} from './browsingSession.js'

export function initBeatEvents(experimentInst, isBot) {
    const isSuspectedBot = _isSuspectedBot(window)
    const {
        instrument: instrumentInit
    } = instrumentsFactory(window, requirejs, isBot, isSuspectedBot, experimentInst)

    const {
        rendererModel,
        publicModel,
        serviceTopology,
        wixBiSession
    } = window

    const {
        premiumFeatures
    } = rendererModel
    const isPremium = !!premiumFeatures && premiumFeatures.indexOf('HasDomain') !== -1 //eslint-disable-line lodash/prefer-includes

    const pageInfo = rendererModel && getPageInfo(window, rendererModel.pageList, isPremium)
    const hasPageIdInHash = window.location.hash && window.location.hash !== '#!'
    let isServerSide = window.isStreaming

    if (isServerSide && hasPageIdInHash) {
        window.isServerSideWithHash = true
        isServerSide = false
    }

    const queryUtil = getQueryUtils(window)
    const baseVersion = getBaseVersion(window.santaBase)
    const siteHeader = {
        id: rendererModel.siteId,
        userId: rendererModel.userId
    }

    instrumentInit(serviceTopology, wixBiSession, queryUtil, {
        rendererModel,
        publicModel,
        baseVersion,
        siteHeader
    }, pageInfo, isPremium, isServerSide)

    if (!wixBiSession.sendBeat) {
        return () => {}
    }

    return (beatNumber, eventName, {
        pageId,
        pageNumber = 1
    } = {}) => {
        const {
            isNew,
            id
        } = beatNumber === BEATS.INTERACTIVE.beatNumber ? track() : get()
        let extra = id ? `&fis=${isNew}&bsi=${id}` : ''
        if (pageId) {
            extra += `&pid=${pageId}`
        }
        wixBiSession.sendBeat(beatNumber, eventName, extra, pageNumber)
    }
}