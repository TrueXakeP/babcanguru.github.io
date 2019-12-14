import {
    paramsMapper
} from '../params-mapper';
/*
 * Adapter for Google GTag
 */
const channelParams = {
    GA_TRACKING_ID: 'GA_TRACKING_ID',
    pagePath: 'page_path',
    pageTitle: 'page_title',
};

(() => {
    for (let index = 1; index <= 200; index++) {
        channelParams['dimension' + index] = 'dimension' + index;
        channelParams['metric' + index] = 'metric' + index;
    }
})();

export const channelEvents = {
    PageView: ({
        GA_TRACKING_ID,
        ...params
    }, {
        config
    }) => {
        return [
            [
                'config',
                GA_TRACKING_ID || config.trackingId,
                paramsMapper(params, channelParams),
            ],
        ];
    },
};