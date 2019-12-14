'use strict'

/**
 *  Function: validateUrl
 *      checks if the urlToTest is a valid URL. NOTE: existence (404 check) is not tested for!.
 *
 *  Parameters:
 *      urlToTest - (string) a url to validate.
 *
 *  Returns:
 *      true if valid.
 */
function isValidUrl(urlToTest) {
    const regexp = /^(?:(?:ftps?:|https?:)?\/\/)?(?:(?:[\u0400-\uA69F\w][\u0400-\uA69F\w-]*)?[\u0400-\uA69F\w]\.)+(?:[\u0400-\uA69Fa-z]+|\d{1,3})(?::[\d]{1,5})?(?:[/?#].*)?$/i
    return regexp.test(urlToTest)
}

function isValidEmail(emailToTest) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(emailToTest)
}

function isValidUrlNoProtocol(urlToTest) {
    const regexp = new RegExp('^[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&*;:/~\\+#!|]*[\\w\\-\\@?^=%&*;/~\\+#!|])?$')
    return regexp.test(urlToTest)
}

function isValidTwitterUser(twitterUser) {
    const re = /^@?[a-zA-Z0-9_%]+$/
    return re.test(twitterUser)
}

module.exports = {
    isValidEmail,
    isValidUrl,
    isValidUrlNoProtocol,
    isValidTwitterUser
}