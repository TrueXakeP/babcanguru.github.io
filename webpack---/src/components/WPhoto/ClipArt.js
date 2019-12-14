'use strict'

const wPhotoDefinition = require('./wPhotoDefinition')
const createReactClass = require('create-react-class')
const _ = require('lodash')

const ClipArt = createReactClass(_.defaults({
    displayName: 'ClipArt'
}, wPhotoDefinition))

module.exports = ClipArt