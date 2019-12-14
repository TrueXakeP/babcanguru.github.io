const _ = require('lodash')
const SAMPLE_RATIO = 10

function sendViewerBI(wixBiSession, eventId, eventArgs) {
    if (wixBiSession && _.isFunction(wixBiSession.sendBI)) {
        wixBiSession.sendBI('ugc-viewer', eventId, 42, eventArgs, SAMPLE_RATIO)
    }
}

function sendBootstrapBIEvent(wixBiSession, bootstrapMessage, primaryPageId) {
    try {
        const apps = JSON.parse(bootstrapMessage.bootstrapArguments.applications).map(app => app.id)
        sendViewerBI(wixBiSession, 432, {
            apps_in_site: apps,
            stage: 'bootstrap',
            pageId: primaryPageId,
            pn: wixBiSession.pn
        })
    } catch (e) {
        //ignore bi error
    }
}

function sendInitBIEvent(wixBiSession, apps, contextPageId, contextModel) {
    const isWixCodeEnabled = !!_.get(contextModel, ['connections', contextPageId])
    sendViewerBI(wixBiSession, 432, {
        apps_in_site: Object.keys(apps),
        stage: 'init',
        pageId: contextPageId,
        pn: wixBiSession.pn,
        is_wix_code_installed: isWixCodeEnabled
    })
}

module.exports = {
    sendBootstrapBIEvent,
    sendInitBIEvent
}