const SESSION = {
    TS_KEY: 'beatSessionTs',
    ID_KEY: 'beatSessionId',
    TTL_MS: 1000 * 60 * 30
}

function isExpired() {
    const {
        ts
    } = get()
    return isNaN(ts) || Date.now() - ts > SESSION.TTL_MS
}

function init() {
    try {
        const {
            localStorage,
            wixBiSession
        } = window
        localStorage.setItem(SESSION.TS_KEY, Date.now())
        localStorage.setItem(SESSION.ID_KEY, wixBiSession.viewerSessionId)
    } catch (e) {
        // empty
    }
}

function extend() {
    try {
        window.localStorage.setItem(SESSION.TS_KEY, Date.now())
    } catch (e) {
        // empty
    }
}

/**
 *  returns current session
 */
function get() {
    try {
        const {
            localStorage
        } = window
        return {
            isNew: false,
            ts: parseInt(localStorage.getItem(SESSION.TS_KEY), 10),
            id: localStorage.getItem(SESSION.ID_KEY)
        }
    } catch (e) {
        return {}
    }
}

/**
 *  tracks a time limited session and extends it whenever this function is called
 */
function track() {
    const isNew = isExpired()
    if (isNew) {
        init()
    } else {
        extend()
    }

    const bs = get()
    bs.isNew = isNew
    return bs
}

module.exports = {
    SESSION,
    get,
    track
}