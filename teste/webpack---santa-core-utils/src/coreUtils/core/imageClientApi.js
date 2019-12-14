'use strict'

const imageClientLib = require('image-client-api/dist/imageClientApi')
const _ = require('lodash')

module.exports = {
    getImageClientLib: _.once(() => {
        imageClientLib.populateGlobalFeatureSupport()
        return imageClientLib
    })
}