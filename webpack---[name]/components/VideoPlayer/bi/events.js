export const biEvents = {
    PLAY_REQUESTED: {
        eventId: 397,
        adapter: 'ugc-viewer',
        params: {
            playSource: 'playSource',
            videoId: 'videoId',
            videoSource: 'videoSource',
            site_id: 'site_id'
        }
    },
    PLAY_START: {
        eventId: 398,
        adapter: 'ugc-viewer',
        params: {
            playSource: 'playSource',
            videoId: 'videoId',
            videoSource: 'videoSource',
            site_id: 'site_id'
        }
    },
    PLAY_DONE: {
        eventId: 399,
        adapter: 'ugc-viewer',
        params: {
            videoId: 'videoId',
            videoSource: 'videoSource',
            site_id: 'site_id'
        }
    },
    ERROR: {
        eventId: 420,
        adapter: 'ugc-viewer',
        params: {
            errorMessage: 'errorMessage',
            playSource: 'playSource',
            videoId: 'videoId',
            videoSource: 'videoSource',
            site_id: 'site_id'
        }
    }
};