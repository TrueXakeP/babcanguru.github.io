'use strict'

const COOKIE_MAP = {}

/**
 * Parse a cookie string into an object
 * @param {string} cookieStr - valid cookie string (; separated key=value pairs)
 */
function parseCookieString(cookies) {
    let parsed = COOKIE_MAP[cookies]
    if (!parsed) {
        parsed = cookies.split(/;\s*/).reduce((acc, cookie) => {
            const c = cookie.match(/([^=]*)\=(.*)/)
            if (c) {
                acc[c[1]] = c[2]
            }
            return acc
        }, {})
        COOKIE_MAP[cookies] = parsed
    }
    return parsed
}

/**
 * Get a cookie by name
 * @param name
 * @returns {string}
 */
function getCookie(name) {
    if (typeof document !== 'undefined') {
        const parsed = parseCookieString(document.cookie)
        return parsed[name]
    }
}

/**
 * Set a cookie in the browser (client-side only)
 * @param name
 * @param value
 * @param time
 * @param domain
 * @param path
 * @param secure
 */
function setCookie(name, value, time, domain, path, secure) {
    if (typeof document === 'undefined') {
        return
    }

    let cookie = `${name}=${value}`
    if (time) {
        cookie += ';expires='
        if (typeof time === 'number') {
            cookie += new Date(new Date().getTime() + time).toGMTString()
        } else {
            cookie += new Date(time).toGMTString()
        }
    }
    cookie += `;path=${path || '/'}`
    if (domain) {
        cookie += `;domain=${domain}`
    }
    if (secure) {
        cookie += ';secure'
    }
    document.cookie = cookie
}

/**
 * Delete a cookie from the browser (client-side only)
 * @param {string} name - cookie name
 * @param {string} domain - should delete the cookie from the root domain and not the subdomain
 * @param {string} [path] - the path, if it exists
 */
function deleteCookie(name, domain, path) {
    if (typeof document !== 'undefined') {
        domain = domain || document.location.host
        setCookie(name, '', 'Thu, 01-Jan-1970 00:00:01', domain, path || '/')
    }
}

const cookieUtils = {
    parseCookieString,
    setCookie,
    getCookie,
    deleteCookie
}

module.exports = cookieUtils