const _ = require('lodash')

module.exports = ({
    fetchFunction
}) => {
    const APP_JSON_TYPE = 'application/json'
    const TYPES_WITHOUT_CONTENT = ['GET', 'DELETE']

    const ajaxMethod = (options = {}) => {
        options.headers = options.headers || {}
        const contentType = options.headers['Content-Type'] || options.contentType
        if (contentType) {
            options.headers['Content-Type'] = contentType
        } else if (!options.data && !_.includes(TYPES_WITHOUT_CONTENT, options.type)) {
            options.headers['Content-Type'] = APP_JSON_TYPE
        }
        const acceptHeaders = options.headers.Accept
        if (_.includes(options.headers['Content-Type'], APP_JSON_TYPE) && !acceptHeaders) {
            options.headers.Accept = APP_JSON_TYPE
        }

        if (_.get(options, 'xhrFields.withCredentials')) {
            options.credentials = 'include'
        }

        return fetchFunction(options.url, {
                method: options.type,
                body: options.data,
                ...options
            }, options.dataType)
            .then(options.success)
            .catch(options.error)
    }

    return {
        registerAjaxMethod: warmupUtils => {
            warmupUtils.ajaxLibrary.register(ajaxMethod)
        }
    }
}