const _ = require('lodash')

function getSMbySiteExtensionInstanceForRgi(clientSpecMap) { // eslint-disable-line complexity
    const atobFun = typeof window !== 'undefined' ? window.atob : atob
    let extensionData = _.find(clientSpecMap, {
        type: 'siteextension'
    }) || {}
    if (_.isEmpty(extensionData)) {
        const publicEntries = _.filter(clientSpecMap, app => !(app.type === 'wixapps' || app.type === 'appbuilder'))
        extensionData = _.find(publicEntries, 'instance') || {}
    }

    // TODO If you refactor this as part of Bolt project please change the behaviour according to WEED-16329
    const instance = extensionData.instance || ''
    let instanceObject
    try {
        instanceObject = JSON.parse(atobFun(_.last(instance.split('.')) || '') || ' {"uid": null, "permissions": null}') || {
            uid: null,
            permissions: null
        }
    } catch (e) {
        instanceObject = {
            uid: null,
            permissions: null
        }
        //TODO: send BI message
    }
    return {
        uid: instanceObject.uid || instanceObject.sessionUId || null,
        permissions: instanceObject.permissions || null,
        onUserLogin: []
    }
}

module.exports = {
    getSMbySiteExtensionInstanceForRgi
}