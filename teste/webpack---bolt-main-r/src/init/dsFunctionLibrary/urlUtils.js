module.exports = {
    getExternalBaseUrl: (rawUrl, warmupUtils) => {
        // const relevantPathParts = this.isSiteHistoryEndpoint() ? 8 : 7;//http://editor.wix.com/html/editor/web/renderer/render/document/{meta-site-id}
        const relevantPathParts = 7
        return warmupUtils.urlUtils.getBaseUrlWithPath(warmupUtils.urlUtils.parseUrl(rawUrl), relevantPathParts)
    }
}