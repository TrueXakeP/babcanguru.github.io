const _ = require('lodash')
const {
    resolveUrl
} = require('./scriptUrlResolver')

const isValidOverrideUrl = (url, scriptsLocation) =>
    _.startsWith(url, scriptsLocation) ||
    _.startsWith(url, 'http://localhost') ||
    _.startsWith(url, 'https://localhost')

const getOverrideViewerScriptUrl = (query, appDefinitionId, scriptsLocation) => {
    if (!query) {
        return null
    }
    const viewerScriptUrlOverride = _.get(query, 'viewerPlatformOverrides')
    if (!viewerScriptUrlOverride) {
        return null
    }
    const allViewerScriptsOverrides = viewerScriptUrlOverride.split(',')
    const viewerSctiptOverrideMap = _(allViewerScriptsOverrides)
        .invokeMap('split', '=')
        .fromPairs()
        .value()
    const viewerScriptOverrideUrl = viewerSctiptOverrideMap[appDefinitionId]
    if (isValidOverrideUrl(viewerScriptOverrideUrl, scriptsLocation)) {
        return viewerScriptOverrideUrl
    }
    return null
}

function removeApps(clientSpecMap, disableAppsString) {
    if (!disableAppsString) {
        return clientSpecMap
    }
    const apps = disableAppsString.toLowerCase().split(',')
    return _.omitBy(clientSpecMap, ({
        appDefinitionId,
        type
    }) => {
        if (type === 'siteextension') {
            return apps.includes(appDefinitionId) || apps.includes('wixcode'.toLowerCase())
        }
        return apps.includes(appDefinitionId)
    })
}

module.exports = {
    removeApps,
    getOverrideViewerScriptUrl,
    resolveUrl
}