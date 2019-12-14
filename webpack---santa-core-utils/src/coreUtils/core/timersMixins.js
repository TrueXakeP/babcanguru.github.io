'use strict'
const _ = require('lodash')
/**
 * @class core.intervalsMixin
 */
const intervalsMixin = {
    componentWillMount() {
        this.intervals = {}
    },
    componentWillUnmount() {
        _.forEach(this.intervals, (timerId, timerName) => {
            this.clearIntervalNamed(timerName)
        })
    },
    setIntervalNamed(timerName, callback, timeout) {
        if (this.intervals.hasOwnProperty(timerName)) {
            this.clearIntervalNamed(timerName)
        }
        this.intervals[timerName] = setInterval(() => {
            delete this.intervals[timerName]
            callback()
        }, timeout)
    },
    setInterval(callback, timeout) {
        this.setIntervalNamed('default', callback, timeout)
    },
    clearIntervalNamed(timerName) {
        clearInterval(this.intervals[timerName])
        delete this.intervals[timerName]
    },
    clearInterval() {
        this.clearIntervalNamed('default')
    }
}

/**
 * @class core.timeoutsMixin
 */
const timeoutsMixin = {
    componentWillMount() {
        this.timeouts = {}
    },
    componentWillUnmount() {
        _.forEach(this.timeouts, (timerId, timerName) => {
            this.clearTimeoutNamed(timerName)
        })
    },
    setTimeoutNamed(timerName, callback, timeout) {
        if (this.timeouts.hasOwnProperty(timerName)) {
            this.clearTimeoutNamed(timerName)
        }
        this.timeouts[timerName] = setTimeout(() => {
            delete this.timeouts[timerName]
            callback()
        }, timeout)
    },
    setTimeout(callback, timeout) {
        this.setTimeoutNamed('default', callback, timeout)
    },
    clearTimeoutNamed(timerName) {
        if (this.timeouts[timerName]) {
            clearTimeout(this.timeouts[timerName])
            delete this.timeouts[timerName]
        }
    },
    clearTimeout() {
        this.clearTimeoutNamed('default')
    }
}

module.exports = {
    timeoutsMixin,
    intervalsMixin
}