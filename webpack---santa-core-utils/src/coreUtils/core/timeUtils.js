'use strict'

function throttle(callback, wait, options = {}) {
    const leading = options.leading !== false
    let isWait = false
    let args, pending, leadingCalled
    return function() {
        args = arguments
        if (leading) {
            if (!leadingCalled) {
                callback.apply(null, args)
                leadingCalled = true
                args = []
                window.setTimeout(() => {
                    if (pending) {
                        callback.apply(null, args)
                        pending = false
                    }
                    leadingCalled = false
                }, wait)
            } else {
                pending = true
            }
        } else if (!isWait) {
            window.setTimeout(() => {
                callback.apply(null, args)
                isWait = false
            }, wait)
            isWait = true
        }
    }
}

function debounce(callback, wait) {
    let timer
    return function() {
        const args = arguments
        if (timer) {
            window.clearTimeout(timer)
        }
        timer = window.setTimeout(function() {
            callback.apply(null, args)
        }, wait)
    }
}

module.exports = {
    throttle,
    debounce
}