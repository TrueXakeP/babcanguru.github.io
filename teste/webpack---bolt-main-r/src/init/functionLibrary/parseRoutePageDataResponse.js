const _ = require('lodash')
const errorPagesIds = {
    FORBIDDEN: '__403__dp',
    NOT_FOUND: '__404__dp',
    INTERNAL_ERROR: '__500__dp',
    UKNOWN_ERROR: '__uknown_error__dp'
}

const FORBIDDEN = 403
const NOT_FOUND = 404

const getResponseValues = ({
        page: pageId,
        data: pageData,
        head: pageHeadData,
        status,
        message,
        tpaInnerRoute,
        publicData,
        redirectUrl
    }) =>
    _.pickBy({
        pageId,
        pageData,
        pageHeadData,
        status,
        message,
        tpaInnerRoute,
        publicData,
        redirectUrl
    }, value => !_.isUndefined(value))

const getErrorPageId = ({
    status,
    page,
    redirectUrl
}, exception, customNotFoundPageId, previewMode, primaryPageId) => {
    if (exception) {
        return previewMode ? primaryPageId : errorPagesIds.INTERNAL_ERROR
    }

    if (status === FORBIDDEN) {
        return previewMode ? primaryPageId : errorPagesIds.FORBIDDEN
    }

    if (status === NOT_FOUND) {
        return previewMode ? primaryPageId : customNotFoundPageId || errorPagesIds.NOT_FOUND
    }

    if (!page && !redirectUrl) {
        return previewMode ? primaryPageId : errorPagesIds.UKNOWN_ERROR
    }

    return null
}

const parseRoutePageDataResponse = ({
    result,
    exception
}, {
    customNotFoundPageId,
    previewMode,
    primaryPageId
} = {}) => {
    const responseValues = getResponseValues(result)

    const errorPageId = getErrorPageId(result, exception, customNotFoundPageId, previewMode, primaryPageId)
    if (errorPageId) {
        return {
            ...responseValues,
            pageId: errorPageId
        }
    }

    return responseValues
}

module.exports = {
    parseRoutePageDataResponse,
    errorPagesIds
}