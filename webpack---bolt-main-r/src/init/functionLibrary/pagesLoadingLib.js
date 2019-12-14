const _ = require('lodash')

const requirePromise = (requireFn, packageName) => new Promise(resolve => {
    requireFn(packageName, resolve)
})

const fetchFallbackJson = (fetchFn, fallbackUrls) => new Promise((resolve, reject) => {
    let fallbackCount = 0

    const tryToFetch = error => {
        if (fallbackCount >= fallbackUrls.length) {
            reject(error)
            return
        }

        const fallbackUrl = fallbackUrls[fallbackCount++]
        fetchFn(fallbackUrl, null, 'json', resolve, tryToFetch)
    }

    tryToFetch()
})

const fetchPageJson = ({
    fetchFn,
    requireFn,
    getDataFixerParams,
    fixedPageUrl,
    fixedViewModePageUrl,
    onSuccess,
    onError,
    fallbackUrls = [],
    reportFixedDataFetchStarted,
    reportFixedDataFetchEnded
}) => {
    const fetchFromFallback = async () => {
        try {
            const [pageJson, dataFixer] = await Promise.all([
                fetchFallbackJson(fetchFn, fallbackUrls),
                requirePromise(requireFn, 'santa-data-fixer')
            ])

            onSuccess(dataFixer.fix({
                ...getDataFixerParams(),
                pageId: _.get(pageJson, ['structure', 'id'], 'masterPage'),
                pageJson
            }))
        } catch (err) {
            if (onError) {
                onError(err)
                return
            }
            throw err
        }
    }

    const onFixedDataFetchSuccess = (...args) => {
        reportFixedDataFetchEnded()
        onSuccess(...args)
    }

    const fetchFixedPage = () => {
        fetchFn(fixedPageUrl, null, 'json', onFixedDataFetchSuccess, fetchFromFallback)
    }

    reportFixedDataFetchStarted()
    fetchFn(fixedViewModePageUrl, null, 'json', onFixedDataFetchSuccess, fetchFixedPage)
}

module.exports = {
    loadPage(setPageToLoad, pageId, requestInfo) {
        setPageToLoad(pageId, requestInfo)
    },
    fetchPageJson,
    increaseVersion(version, setVersion) {
        const newVersion = version + 1
        setVersion(newVersion)
        return newVersion
    },
    pageRequestSuccess(increaseVersion, setPageData, successCallback, pageId, page) {
        if (pageId === 'masterPage') {
            increaseVersion()
        }

        setPageData(page)
        if (successCallback) {
            successCallback(page)
        }
    },
    fetchPageForPreview: (fetchFn, pageId, viewMode, onSuccess) => {
        fetchFn(pageId, viewMode).then(onSuccess)
    }
}