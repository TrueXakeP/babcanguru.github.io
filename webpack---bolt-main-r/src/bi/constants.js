module.exports = {
    BEATS: {
        DONE_WARMUP: {
            eventName: 'visible',
            beatNumber: 2
        },
        INTERACTIVE: {
            eventName: 'interactive',
            beatNumber: 3
        },
        PAGE_INTERACTIVE: {
            eventName: 'page interactive',
            beatNumber: 33
        },
        MAIN_R_LOADED: {
            eventName: 'main-r executed',
            beatNumber: 4
        },
        PAGE_NAVIGATION: {
            eventName: 'page navigation start',
            beatNumber: 101,
            isPageEvent: true
        },
        PAGE_NAVIGATION_DONE: {
            eventName: 'page navigation complete',
            beatNumber: 103,
            isPageEvent: true
        }
    }
}