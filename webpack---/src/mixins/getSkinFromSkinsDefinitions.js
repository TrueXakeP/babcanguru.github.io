'use strict'

const _ = require('lodash')

const getSkinFromObject = (skinsJson, skinName) => {
    if (_.isNil(skinName)) {
        return
    }

    const skin = skinsJson[skinName]

    if (!skin) {
        return _.find(skinsJson, () => true) // get the first value, without more iteratios
    }

    return skin
}

const getSkinFromSkinsDefinitions = (skinsJson, skinName, isExperimentOpen) =>
    skinsJson.get ? skinsJson.get(skinName, isExperimentOpen) : getSkinFromObject(skinsJson, skinName)

module.exports = getSkinFromSkinsDefinitions