'use strict'

// In case we're not running in the browser
const win = typeof window !== 'undefined' ? window : {}

const raf = win.requestAnimationFrame ||
    win.webkitRequestAnimationFrame ||
    win.mozRequestAnimationFrame ||
    win.oRequestAnimationFrame ||
    win.msRequestAnimationFrame ||
    function( /* function */ callback) {
        return setTimeout(callback, 1000 / 60)
    }

const caf = win.cancelAnimationFrame ||
    win.webkitCancelAnimationFrame ||
    win.mozCancelAnimationFrame ||
    win.oCancelAnimationFrame ||
    win.msCancelAnimationFrame ||
    clearTimeout

module.exports = {
    /**
     *
     * @param {function()} callback
     * @returns {number}
     */
    request() {
        return raf.apply(win, arguments)
    },
    /**
     * @param {number} id
     */
    cancel() {
        return caf.apply(win, arguments)
    }
}