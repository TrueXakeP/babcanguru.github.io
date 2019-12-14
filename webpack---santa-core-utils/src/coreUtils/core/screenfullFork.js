'use strict'

const fnMap = [
    [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenElement',
        'fullscreenEnabled',
        'fullscreenchange',
        'fullscreenerror'
    ],
    [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror'

    ],
    [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror'
    ],
    [
        'msRequestFullscreen',
        'msExitFullscreen',
        'msFullscreenElement',
        'msFullscreenEnabled',
        'MSFullscreenChange',
        'MSFullscreenError'
    ]
]
/**
 * A cross browser fullscreen handler
 *
 * Fork of screenfull.js 3.1.0 (https://github.com/sindresorhus/screenfull.js/)
 * MIT © Sindre Sorhus (https://sindresorhus.com/)
 * Differences from original:
 * - ES6
 * - CommonJS only
 * - No self invoking functions, no global state. has to be initiated
 * - Removed support for Safari 5.1
 * - onchange and onerror return their remove function
 * @returns {*}
 */
module.exports = function Screenfull() {

    const keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element
    const fn = fnMap.find(item => item[1] in document).reduce((fnObj, value, index) => {
        fnObj[fnMap[0][index]] = value
        return fnObj
    }, {})

    const publicAPI = {
        /**
         * Request browser to set an element into fullscreen
         * This method must be invoked within a user input event handler for the request to pass.
         * @param {HtmlElement} elem
         */
        request(elem) {
            elem[fn.requestFullscreen](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT)
        },
        /**
         * Exit fullscreen mode
         */
        exit() {
            document[fn.exitFullscreen]()
        },
        /**
         * Toggle fullscreen mode for an element
         * @param {HtmlElement} elem
         */
        toggle(elem) {
            if (this.isFullscreen) {
                this.exit()
            } else {
                this.request(elem)
            }
        },
        /**
         * Listen to fullscreen mode change
         * @param {function} callback
         * @returns {function} The remove function for this listener
         */
        onchange(callback) {
            document.addEventListener(fn.fullscreenchange, callback, false)
            return () => document.removeEventListener(fn.fullscreenchange, callback)
        },
        /**
         * Listen to fullscreen request error
         * @param {function} callback
         * @returns {function} The remove function for this listener
         */
        onerror(callback) {
            document.addEventListener(fn.fullscreenerror, callback, false)
            return () => document.removeEventListener(fn.fullscreenerror, callback)
        },
        raw: fn
    }

    Object.defineProperties(publicAPI, {
        isFullscreen: {
            /**
             * Is in fullscreen mode?
             * @returns {boolean}
             */
            get() {
                return Boolean(document[fn.fullscreenElement])
            }
        },
        element: {
            enumerable: true,
            /**
             * Get the fullscreen element node
             * @returns {HtmlElement}
             */
            get() {
                return document[fn.fullscreenElement]
            }
        },
        enabled: {
            enumerable: true,
            /**
             * Check if fullscreen enabled for this session
             * @returns {boolean}
             */
            get() {
                // Coerce to boolean in case of old WebKit
                return Boolean(document[fn.fullscreenEnabled])
            }
        }
    })

    return publicAPI
}