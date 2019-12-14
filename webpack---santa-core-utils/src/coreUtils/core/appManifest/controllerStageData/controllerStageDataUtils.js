'use strict'

const {
    CONTROLLER_STAGE_DATA: {
        VISIBILITY
    }
} = require('../common/constants')
const _ = require('lodash')

function isControllerVisible(controllerStageData, appManifestExists, isDeveloperMode) {
    const visibility = calcVisibility(controllerStageData, appManifestExists)
    if (isDeveloperMode) {
        return visibility === VISIBILITY.DEV || visibility === VISIBILITY.EDITOR
    }
    return visibility === VISIBILITY.EDITOR
}

function calcVisibility(controllerStageData, appManifestExists) {
    if (!appManifestExists) {
        return VISIBILITY.NEVER
    }

    const visibility = _.get(controllerStageData, 'visibility')
    if (VISIBILITY[visibility]) {
        return visibility
    }
    return VISIBILITY.DEV
}

module.exports = {
    isControllerVisible
}