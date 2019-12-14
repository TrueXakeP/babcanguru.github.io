'use strict'

const _ = require('lodash')

const candidatePhoneNumberPattern = /(?:\+|\()?\d(?:[\-\.\(\) \t\u00a0\u1680\u180e\u2000\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]{0,5}\d){6,16}\)?|\*\d{4}/g
const emailPattern = /(^|[\s:;,<>])([A-Z0-9][A-Z0-9._%+-]+@[A-Z0-9][A-Z0-9.-]+\.[A-Z]{2,})(?=$|[\s:;,<>])/ig //http://www.regular-expressions.info/email.html
const urlPattern = /(^|[\s:;,<>])((?:https?:\/\/|www\.)[a-z0-9](?:\.?[a-z0-9\-%_])*(?:(?:\\|\/)[a-z0-9\-._~:/\\?#\[\]@!$&'()*+,;=%]*)?)(?=$|[^a-z0-9\-._~:/\\?#\[\]@!$&'()*+,;=%])/ig

const Pattern = {
    PHONE: 'PHONE',
    MAIL: 'MAIL',
    URL: 'URL'
}

function testForAll(text, {
    PHONE,
    MAIL,
    URL
} = {}) {
    if (MAIL && text.includes('@')) {
        return true
    }
    if (URL && (text.includes('://') || text.includes('www.'))) {
        return true
    }
    if (PHONE && text.search(/\d{4}/) >= 0) {
        return true
    }
    return false
}

function findAll(text, {
    PHONE,
    MAIL,
    URL
} = {}) {
    const results = _.flatten([
        PHONE ? findPhoneNumbers(text) : [],
        MAIL ? findEmails(text) : [],
        URL ? findUrls(text) : []
    ])

    return resolveCollisions(results)
}

function findPhoneNumbers(text) {
    const results = []
    let singleRegexExec
    while (singleRegexExec = candidatePhoneNumberPattern.exec(text)) { //eslint-disable-line no-cond-assign
        const value = singleRegexExec[0].match(/[*\d]/g).join('')
        results.push({
            key: singleRegexExec[0],
            value,
            index: singleRegexExec.index,
            pattern: Pattern.PHONE
        })
    }

    return results
}

function findEmails(text) {
    const results = []
    let singleRegexExec
    while (singleRegexExec = emailPattern.exec(text)) { //eslint-disable-line no-cond-assign
        const mainCapture = singleRegexExec[2]
        const prefixSize = singleRegexExec[1].length
        results.push({
            key: mainCapture,
            value: mainCapture,
            index: singleRegexExec.index + prefixSize,
            pattern: Pattern.MAIL
        })
    }
    return results
}

function findUrls(text) {
    const results = []
    let singleRegexExec
    while (singleRegexExec = urlPattern.exec(text)) { //eslint-disable-line no-cond-assign
        const mainCapture = singleRegexExec[2]
        const prefixSize = singleRegexExec[1].length
        const beginsWithHttp = singleRegexExec[2].toLowerCase().indexOf('http') === 0
        const value = beginsWithHttp ? mainCapture : `http://${mainCapture}`
        results.push({
            key: mainCapture,
            value,
            index: singleRegexExec.index + prefixSize,
            pattern: Pattern.URL
        })
    }
    return results
}

function resolveCollisions(resultList) {
    return _(resultList)
        .sortBy(['index'])
        .transform((result, item) => {
            const lastItem = _.last(result)
            if (!lastItem || item.index > lastItem.index + lastItem.key.length) {
                result.push(item)
            }
        }, [])
        .value()
}

module.exports = {
    Pattern,
    testForAll,
    findAll
}