'use strict'

/**
 *
 * @param win
 * @returns {{local: (.requestModel.localStorage|*|exports.browser.localStorage|defaultSiteModel.requestModel.localStorage|Storage|localStorage), session: (exports.browser.sessionStorage|*|Storage|defined.sessionStorage|sessionStorage)}}
 */
function init(win = {}) {

    function Storage() {}

    // Missing definitions for length and key
    Storage.prototype = {
        getItem(key) {
            return key in this ? this[key] : null
        },
        setItem(key, value) {
            this[key] = `${value}`
        },
        removeItem(key) {
            delete this[key]
        },
        clear() {
            for (const p in this) {
                if (this.hasOwnProperty(p)) {
                    delete this[p]
                }
            }
        }
    }

    function canUse(name) {
        const unique = `testStorage${Date.now()}`
        try {
            const storage = win[name]
            storage.setItem(unique, unique)
            const value = storage.getItem(unique)
            storage.removeItem(unique)
            if (value !== unique) {
                throw 'not equal' //eslint-disable-line no-throw-literal
            }
        } catch (e) {
            return false
        }
        return true
    }

    return {
        local: canUse('localStorage') ? win.localStorage : new Storage(),
        session: canUse('sessionStorage') ? win.sessionStorage : new Storage()
    }
}

module.exports = init