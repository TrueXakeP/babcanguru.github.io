const _ = require('lodash')
const {
    parseRoutePageDataResponse,
    errorPagesIds
} = require('./parseRoutePageDataResponse')

const ERROR_ROUTE_DATA = {
    pageId: errorPagesIds.INTERNAL_ERROR
}

const handleDynamicPageResponse = (setNavigationInfos, setPendingDynamicPageInfo, pendingDynamicPageInfoPrimaryPage, startNavigationAgain, boltInstanceNavigationErrorCallbacks, pageList, previewMode, reportPageNavigationInteractionStarted, routePageDataResponse, externalBaseUrl, inEditMode) => {
    if (!pendingDynamicPageInfoPrimaryPage) {
        return
    }
    if ((routePageDataResponse.status >= 400 || routePageDataResponse.exception) && previewMode && !inEditMode) {
        const routerSuffix = `/${pendingDynamicPageInfoPrimaryPage.innerRoute}`.replace(/^\/\//, '/')
        const errorInfo = {
            statusCode: routePageDataResponse.exception ? 500 : routePageDataResponse.status,
            routerUrl: `/${pendingDynamicPageInfoPrimaryPage.routerDefinition.prefix}${routerSuffix}`,
            publicUrl: `${externalBaseUrl}/${pendingDynamicPageInfoPrimaryPage.routerDefinition.prefix}${routerSuffix}`
        }
        _.forEach(boltInstanceNavigationErrorCallbacks, cb => cb(errorInfo))
    }
    const {
        pageId,
        tpaInnerRoute,
        pageData: routerData,
        pageHeadData,
        publicData
    } = routePageDataResponse
    const pageData = _.find(pageList, {
        pageId
    })
    const isProtectedPage = previewMode ? false : pageData && !_.get(pageData, 'pageJsonFileName')
    const nextNavigationInfo = {
        ...pendingDynamicPageInfoPrimaryPage,
        pageId,
        title: _.get(pageHeadData, 'title', ''),
        tpaInnerRoute,
        routerData,
        pageHeadData,
        routerPublicData: publicData
    }
    setPendingDynamicPageInfo(null)
    if (isProtectedPage && _.isFunction(startNavigationAgain)) {
        startNavigationAgain(nextNavigationInfo)
        return
    }

    reportPageNavigationInteractionStarted()
    setNavigationInfos({
        primaryPage: nextNavigationInfo
    })
}

const handleRelativeUrlRedirect = (relativeUrl, externalBaseUrl, warmupUtils, resolvedSiteData, setNavigationInfos, setPendingDynamicPageInfo, pendingDynamicPageInfoPrimaryPage, relativeRedirectCounter) => {
    // router returned an internal redirect path
    const newUrl = warmupUtils.urlUtils.joinURL(externalBaseUrl, relativeUrl)
    const pageInfo = warmupUtils.wixUrlParser.parseUrl(resolvedSiteData, newUrl)
    if (pageInfo.routerDefinition) {
        setPendingDynamicPageInfo({
            primaryPage: { ...pendingDynamicPageInfoPrimaryPage,
                ...pageInfo,
                relativeRedirectCounter: relativeRedirectCounter + 1,
                replaceHistory: true
            }
        })
    } else {
        setNavigationInfos({
            primaryPage: pageInfo
        })
    }
}

const handleDynamicRedirectResponse = (setNavigationInfos, setPendingDynamicPageInfo, pendingDynamicPageInfoPrimaryPage, routeResponse, warmupUtils, externalBaseUrl, resolvedSiteData) => {
    const {
        redirectUrl
    } = routeResponse
    const relativeRedirectCounter = pendingDynamicPageInfoPrimaryPage.relativeRedirectCounter || 0
    if (warmupUtils.urlUtils.isExternalUrl(redirectUrl)) {
        window.location.assign(redirectUrl)
    } else if (warmupUtils.urlUtils.isRelativeUrl(redirectUrl) && relativeRedirectCounter < 4) {
        handleRelativeUrlRedirect(redirectUrl, externalBaseUrl, warmupUtils, resolvedSiteData, setNavigationInfos, setPendingDynamicPageInfo, pendingDynamicPageInfoPrimaryPage, relativeRedirectCounter)
    } else {
        setPendingDynamicPageInfo(null)
        // unexpected redirectUrl, display error page
        // callback(INTERNAL_ERROR_PAGE_INFO)
    }
}

const getAbsoluteUrl = (url, warmupUtils, externalBaseUrl, queryParams) => {
    if (!warmupUtils.urlUtils.isRelativeUrl(url)) {
        return url
    }

    const absoluteUrl = warmupUtils.urlUtils.joinURL(externalBaseUrl, url)

    return warmupUtils.urlUtils.setUrlParams(absoluteUrl, queryParams)
}
const handleRoutePageDataResponse = (responseHandlerParams, routeResponse) => {
    const {
        setNavigationInfos,
        setPendingDynamicPageInfo,
        reportPageNavigationInteractionStarted,
        pendingDynamicPageInfoPrimaryPage,
        isInSSR,
        warmupUtils,
        externalBaseUrl,
        resolvedSiteData,
        handleSsrRedirect,
        queryParams,
        startNavigationAgain,
        boltInstanceNavigationErrorCallbacks,
        pageList,
        inEditMode,
        previewMode,
        customNotFoundPageId,
        primaryPageId
    } = responseHandlerParams
    const routePageDataResponse = parseRoutePageDataResponse(routeResponse, {
        customNotFoundPageId,
        previewMode,
        primaryPageId
    })

    const {
        redirectUrl,
        status,
        message
    } = routePageDataResponse
    if (redirectUrl) {
        if (isInSSR) {
            const absoluteUrl = getAbsoluteUrl(redirectUrl, warmupUtils, externalBaseUrl, queryParams)
            handleSsrRedirect({
                redirectUrl: absoluteUrl,
                status,
                message
            })
            return
        }

        handleDynamicRedirectResponse(setNavigationInfos, setPendingDynamicPageInfo, pendingDynamicPageInfoPrimaryPage, routePageDataResponse, warmupUtils, externalBaseUrl, resolvedSiteData)
    } else {
        handleDynamicPageResponse(setNavigationInfos, setPendingDynamicPageInfo, pendingDynamicPageInfoPrimaryPage, startNavigationAgain, boltInstanceNavigationErrorCallbacks, pageList, previewMode, reportPageNavigationInteractionStarted, routePageDataResponse, externalBaseUrl, inEditMode)
    }
}

const handleRouteFetchError = ({
    setNavigationInfos,
    setPendingDynamicPageInfo,
    pendingDynamicPageInfoPrimaryPage,
    pageList,
    previewMode,
    reportPageNavigationInteractionStarted,
    externalBaseUrl,
    navigationErrorCallbacks,
    inEditMode
}) => {
    handleDynamicPageResponse(setNavigationInfos, setPendingDynamicPageInfo, pendingDynamicPageInfoPrimaryPage, null, navigationErrorCallbacks, pageList, previewMode, reportPageNavigationInteractionStarted, ERROR_ROUTE_DATA, externalBaseUrl, inEditMode)
}

const cleanPrefix = (url, prefix) => {
    const reg = new RegExp(`.*?\/${prefix}`)
    const urlWithoutPrefix = url.replace(reg, '')
    if (urlWithoutPrefix.charAt(0) === '/' && urlWithoutPrefix.length > 1) {
        return urlWithoutPrefix.substring(1)
    }

    return urlWithoutPrefix
}

const cleanPrefixesFromSiteMap = (siteMapEntries, prefix) =>
    _.map(siteMapEntries, entry => {
        if (!entry || !entry.url) {
            return entry
        }

        return {
            ...entry,
            url: cleanPrefix(entry.url, prefix)
        }
    })

const onSiteMapResponse = (resolve, reject, routerPrefix, routerResponse) => {
    if (routerResponse.exception) {
        reject(routerResponse.result)
        return
    }

    resolve({
        ...routerResponse,
        result: cleanPrefixesFromSiteMap(routerResponse.result, routerPrefix)
    })
}

const onErrorPageDownloaded = (setRawPage, {
    masterPageData: pageDataItem,
    themeData
}, pageJson) => {
    const pageJsonToSet = _.defaultsDeep({
        data: {
            document_data: {
                [pageJson.structure.id]: pageDataItem
            },
            theme_data: themeData
        }
    }, pageJson)

    setRawPage(pageJsonToSet)
}

module.exports = {
    onSiteMapResponse,
    onErrorPageDownloaded,
    handleRouteFetchError,
    handleRoutePageDataResponse
}