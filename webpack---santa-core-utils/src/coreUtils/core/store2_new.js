'use strict'

const _ = require('lodash')
const requestsUtil = require('./requestsUtil')

const TIMEDOUT_DEBOUNCE = 50

/**
 * here we transform the response and stick it in the right place in the fullPagesData
 * @param {utils.Store.requestDescriptor} request
 * @param {object} response
 * @param {*} currentData
 */
function transformResponseIfNeeded(request, response, getDataFunc, currentUrl) {
    if (request.transformFunc) {
        let currentData = getDataFunc(request.destination)
        currentData = _.isUndefined(currentData) ? {} : currentData
        return request.transformFunc(response, currentData, currentUrl)
    }

    return response
}

/**
 * request the store to load a resource (resource details are in requestObject) and place that resource
 * in its data container under the given path after it was transformed by the transformationFunction (_.identity by default)
 * @param {utils.Store.requestDescriptor} request
 * @param {function} getDataFunc
 * @param {object} pendingRequests
 * @param {function} fetchFunc
 * @param dataLoadedCallbacks
 */
function loadRequestDescriptor(request, getDataFunc, pendingRequests, fetchFunc, dataLoadedCallbacks) {
    // look for the requested data in the fullPagesData (might have been requested before)
    const currentData = getDataFunc(request.destination)
    if (currentData && !request.force) {
        // data was already fetched - call the complete callback
        request.callback(currentData)
        request.done()
    } else if (pendingRequests[request.key] && !request.force) {
        pendingRequests[request.key].push(request)
    } else {
        // when request.force is true we should always get here
        pendingRequests[request.key] = pendingRequests[request.key] || []

        // this callback will be called only once as the callback of the actual request
        // doesn't matter if the request was successful or failed we need to cleanup the pendingRequest map
        // to make sure future request will get through
        const updatePendingAndCallRequestDone = function(response, err, headers) { //eslint-disable-line func-style
            const isWixServiceError = _.has(response, 'errorCode') && response.errorCode !== 0
            if (!err && !isWixServiceError) {
                const currentUrl = requestsUtil.getUrlsArray(request)[request.current]
                const transformedResponse = transformResponseIfNeeded(request, response, getDataFunc, currentUrl)
                // first call the request callback
                request.callback(transformedResponse, response, currentUrl, headers)
                // then all the rest
                _.forEach(pendingRequests[request.key], function(req) {
                    req.callback(transformedResponse, response, currentUrl, headers)
                })
                _.forEach(dataLoadedCallbacks, function(dataLoadedCallback) {
                    dataLoadedCallback(request.destination, transformedResponse)
                })
            } else {
                // first call the request error callback
                request.error(err, response)
                // then all the rest
                _.forEach(pendingRequests[request.key], function(req) {
                    req.error(err, response)
                })
            }
            // first call the request callback
            request.done()
            // then all the rest
            _.forEach(pendingRequests[request.key], function(req) {
                req.done()
            })
            delete pendingRequests[request.key]
        }

        requestsUtil.createAndSendRequest(request, updatePendingAndCallRequestDone, fetchFunc)
    }
}

/**
 * @typedef {Store} utils.Store
 *
 * @property {function} getDataFunc
 * @property {function} fetchFunc
 * @property {object} pendingRequests
 */

/**
 * @typedef {object} utils.Store.requestDescriptor
 *
 * @property {string[]} destination         	- array of strings representing the path to where we need the response to be.
 * @property {string} url                   	- where to get the data from
 * @property {?boolean} force               	- when true, will disregard the already existing data in the destination and a request will go to the server
 * @property {?string[]} urls               	- fallback urls for the request
 * @property {?object} data                 	- json object of the data to be serialized and sent with the request
 * @property {?string} dataType             	- request data type, default to JSON
 * @property {?function} onUrlRequestFailure	- a callback that will be invoked for each failed url request
 * @property {?function} callback          	 	- callback for the request, will be called for cache hits and real requests
 * @property {?function} error              	- error callback for the request, will be called for real requests that had and error
 * @property {?function} transformFunc      	- transformation function on the response data, will be called only on real requests. transformFunc will receive the response data and the current value in the destination.
 */

/**
 * @constructor
 */
function Store(getDataFunc, fetchFunc) {
    this.getDataFunc = getDataFunc
    this.fetchFunc = fetchFunc
    this.pendingRequests = {}
    this.dataLoadedCallbacks = []
}

Store.prototype = {
    /**
     * load a batch of requests and call doneCallback when they all arrived.
     * @param {utils.Store.requestDescriptor[]} requestDescriptors
     * @param {function} doneCallback
     */
    loadBatch(requestDescriptors, doneCallback = _.noop) {
        if (!requestDescriptors || requestDescriptors.length === 0) {
            _.defer(doneCallback)
        }

        let numOfDone = 0
        let numOfTimedOut = 0
        let origCallback = null

        function requestDone(reqDesc, timedOut) {
            // reqDesc.timerId is undefined if no timeout, 0 if timeout already occurred, otherwise timeout still pending
            if (timedOut) {
                numOfTimedOut++
                if (!origCallback) {
                    origCallback = doneCallback
                    doneCallback = _.debounce(doneCallback, TIMEDOUT_DEBOUNCE)
                }
                reqDesc.timerId = 0
            } else if (reqDesc.timerId) {
                clearTimeout(reqDesc.timerId)
            } else if (reqDesc.timerId === 0) {
                numOfTimedOut--
                numOfDone--
            }
            numOfDone++
            if (numOfDone === requestDescriptors.length) {
                if (numOfTimedOut === 0 && origCallback) {
                    doneCallback.cancel()
                    doneCallback = origCallback
                    origCallback = null
                }
                doneCallback(numOfTimedOut > 0)
            }
        }

        _.forEach(requestDescriptors, reqDesc => {
            reqDesc.force = reqDesc.force === true
            reqDesc.callback = reqDesc.callback || _.noop
            reqDesc.error = reqDesc.error || _.noop
            reqDesc.done = requestDone.bind(this, reqDesc, false)
            if (reqDesc.customDownload) {
                reqDesc.customDownload(this.pendingRequests, this.dataLoadedCallbacks)
            } else {
                const data = reqDesc.data ? JSON.stringify(reqDesc.data) : ''
                reqDesc.key = reqDesc.destination.join('.')
                let mainUrl = reqDesc.url
                if (!mainUrl) {
                    mainUrl = reqDesc.urls ? reqDesc.urls[0] : ''
                }
                reqDesc.fullKey = `${reqDesc.key}|${mainUrl}|${data}`
                if (_.isNumber(reqDesc.timeout)) {
                    reqDesc.timerId = setTimeout(requestDone.bind(this, reqDesc, true), reqDesc.timeout)
                }
                reqDesc.start = _.now()
                loadRequestDescriptor(reqDesc, this.getDataFunc, this.pendingRequests, this.fetchFunc, this.dataLoadedCallbacks)
            }
        })
    },

    registerDataLoadedCallback(dataLoadedFn) {
        this.dataLoadedCallbacks.push(dataLoadedFn)
    }
}

module.exports = Store