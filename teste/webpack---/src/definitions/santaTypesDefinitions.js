'use strict'

const createSantaTypesDefinitions = require('../utils/createSantaTypesDefinitions')
const {
    Definitions
} = require('./definitions')
module.exports = createSantaTypesDefinitions(Definitions)