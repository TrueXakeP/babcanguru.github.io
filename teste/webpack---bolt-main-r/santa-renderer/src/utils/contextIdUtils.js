'use strict'
const _ = require('lodash')

const getMainRootIdFromContextId = contextId => {
    const [mainRootId] = contextId.split('$$')
    return mainRootId
}

const getContextId = ({
    mainRootId,
    innerRoute,
    tpaInnerRoute,
    lang,
    platformGoToEditorCounter
}) => [mainRootId, innerRoute, tpaInnerRoute, lang, _.uniqueId('context'), platformGoToEditorCounter].join('$$')


module.exports = {
    getContextId,
    getMainRootIdFromContextId
}