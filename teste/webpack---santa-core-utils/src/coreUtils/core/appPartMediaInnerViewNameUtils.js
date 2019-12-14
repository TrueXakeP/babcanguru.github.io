'use strict'
const _ = require('lodash')

const appPartMediaInnerViewNameUtils = {
    getMediaInnerViewNames() {
        return [
            'FeaturedInner',
            'FeaturedInnerMobile',
            'MediaInner',
            'MediaInnerCustom',
            'PostsListMediaInner',
            'SinglePostMediaInner'
        ]
    },

    isMediaInnerViewName(viewName) {
        const mediaInnerViewNames = appPartMediaInnerViewNameUtils.getMediaInnerViewNames()
        return _.includes(mediaInnerViewNames, viewName)
    }
}

module.exports = appPartMediaInnerViewNameUtils