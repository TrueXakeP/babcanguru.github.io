function getWixCodeAppDefId(clientSpecMap) {
    for (const spec in clientSpecMap) {
        if (clientSpecMap[spec].type === 'siteextension') {
            return clientSpecMap[spec].appDefinitionId.toString()
        }
    }
    return null
}

function hasAppWithAppDefId(clientSpecMap, appDefId) {
    for (const appId in clientSpecMap) {
        if (clientSpecMap.hasOwnProperty(appId) && clientSpecMap[appId].appDefinitionId === appDefId) {
            return true
        }
    }
    return false
}

function isGuid(appId) {
    const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    return guidRegex.test(appId)
}

//compare appDefId with current and legacy wix code app def ids - needed for old automation site
function isLegacyWixCodeAppDefId(rendererModel, appDefId) {
    return isGuid(appDefId) && !hasAppWithAppDefId(rendererModel.clientSpecMap, appDefId)
}

module.exports = {
    getPagesPlatformApplications: rendererModel => {
        const wixCodeAppDefId = getWixCodeAppDefId(rendererModel.clientSpecMap)
        const pagesPlatformApplications = rendererModel.pagesPlatformApplications
        const result = {}
        for (const pageId in pagesPlatformApplications) {
            if (pagesPlatformApplications.hasOwnProperty(pageId)) {
                pagesPlatformApplications[pageId].forEach(appDefId => {
                    if (appDefId === wixCodeAppDefId || isLegacyWixCodeAppDefId(rendererModel, appDefId)) {
                        appDefId = 'wixCode'
                    }
                    result[appDefId] = result[appDefId] || {}
                    result[appDefId][pageId] = true
                })
            }
        }
        return result
    }
}