'use strict'

const _ = require('lodash')

const withoutJsonSuffix = pageJsonFileName => pageJsonFileName.replace('.json', '')

function getPageFileNames(pageList) {
    if (!pageList) {
        return {}
    }
    const accumulator = {
        masterPage: withoutJsonSuffix(pageList.masterPageJsonFileName)
    }
    const reducer = (result, page) => _.assign(result, {
        [page.pageId]: withoutJsonSuffix(page.pageJsonFileName)
    })
    return _(pageList.pages)
        .filter('pageJsonFileName')
        .reduce(reducer, accumulator)
}

module.exports = {
    getPageFileNames
}