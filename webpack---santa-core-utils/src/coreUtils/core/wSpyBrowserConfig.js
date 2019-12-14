'use strict'

const wSpy = require('./wSpyBrowserHost')

const settings = {
    moreLogs: 'mobx,createDisplayedPage,livepreview,ds_GETTER',
    includeLogs: 'setHook,registerAction,runAction,worker,applyHook,ds_ACTION,ds_DATA_MANIPULATION_ACTION,dispatch',
    extraIgnoredEvents: [
        'wixCode.fileSystem.getRoots',
        'wixCode.log.trace',
        'bi.event',
        'platform.reportAPICallBI'
    ],
    MAX_LOG_SIZE: 10000,
    DEFAULT_LOGS_COUNT: 300,
    GROUP_MIN_LEN: 5,
    stackFilter: /wSpy|publicMethodUtils|bundle.js|ActionQueue.js|require.min.js|main-r.min.js|observableDataUtil.js|lodash|mobxDataHandlers.js|react-dom|createEditorStore.js|coreUtils.js|create-react-class.js|redux-libs.js|throttledStore.js|raven.min.js|Object.store.dispatch|react.development/i
}

module.exports = wSpy.init({
    settings
})