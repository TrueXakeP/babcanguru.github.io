const _ = require('lodash')
const urlRegex = /((https?\:)\/\/)?([^\?\:\/#]+)(\:([0-9]+))?(\/[^\?\#]*)?(\?([^#]*))?(#.*)?/i
const DEFAULT_SUB_DOMAIN = 'www'

const parseQueryParams = searchStr =>
    _(searchStr)
    .split('&')
    .map(x => x.split('='))
    .fromPairs()
    .value()

function removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    const urlparts = url.split('?')
    if (urlparts.length >= 2) {
        const prefix = `${encodeURIComponent(parameter)}=`
        const pars = urlparts[1].split(/[&;]/g)

        //reverse iteration as may be destructive
        for (let i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1)
            }
        }

        return urlparts[0] + (pars.length > 0 ? `?${pars.join('&')}` : '')
    }
    return url
}

module.exports = {
    DEFAULT_SUB_DOMAIN,
    stringifyQuery: queryObj => Object.keys(queryObj).map(key => `${key}=${encodeURIComponent(queryObj[key])}`).join('&'),

    isHttps: url => {
        const match = url.match(urlRegex)
        const protocol = match[2] || 'http:'
        return protocol.startsWith('https')
    },
    parseQueryParams,
    getQueryParamValue: (url, key) => {
        const search = url.match(urlRegex)[8] // url search string
        return _(search)
            .thru(parseQueryParams)
            .pickBy((value, currentKey) => key.toLowerCase() === currentKey.toLowerCase())
            .values()
            .head()
    },
    updateQueryStringParameter: (uri, key, value) => {
        const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i')
        if (!value) {
            return removeURLParameter(uri, key)
        }
        // remove the hash part before operating on the uri
        const i = uri.indexOf('#')
        const hash = i === -1 ? '' : uri.substr(i)
        uri = i === -1 ? uri : uri.substr(0, i)

        const separator = _.includes(uri, '?') ? '&' : '?'
        if (uri.match(re)) {
            uri = uri.replace(re, `$1${key}=${value}$2`)
        } else {
            uri = `${uri + separator + key}=${value}`
        }
        return uri + hash // finally append the hash as well
    },
    parseUrl: (rawUrl, warmupUtils) => warmupUtils.urlUtils.parseUrl(rawUrl),
    getUrl: (warmupUtils, linkRenderInfo, options) => {
        const {
            pageInfo,
            forceAddPageInfo,
            cleanQuery,
            baseUrl,
            urlMapping,
            hasAppSectionParams
        } = options
        const dismissQueryParams = hasAppSectionParams ? [] : ['appSectionParams']
        return warmupUtils.wixUrlParser.getUrl(linkRenderInfo, pageInfo, forceAddPageInfo, cleanQuery, baseUrl, urlMapping, dismissQueryParams)
    },
    setProtocol: (url, protocol) => url && url.replace(/https?:/, protocol),
    resolveNavigationInfo: (rawUrl, warmupUtils, resolvedSiteData) => {
        const resolvedSiteDataAPI = Object.assign({
            isResolvedSiteData: true
        }, resolvedSiteData)

        return {
            primaryPage: warmupUtils.wixUrlParser.parseUrl(resolvedSiteDataAPI, rawUrl)
        }
    },
    updateHost(currentHost, url, newHost = '') {
        // based on the fact the anyway there is a sub domain (www by default)
        if (!newHost) {
            return url.replace(currentHost, currentHost.replace(/^[^\.]*/, DEFAULT_SUB_DOMAIN))
        }
        return url.replace(currentHost, newHost)
    }
}