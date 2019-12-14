/*
 * Adapter for Wix Analytics (using BI infrastructure)
 */

import {
    encodeValue,
    removeSpaces
} from '../utils/bi-utils';

const EventsMap = {
    PageView: {
        table: 'page_views',
        paramsMap: {
            pageId: 'page_id',
            pageNumber: 'page_number',
        },
    },
    AddProductImpression: {},
    ClickProduct: {},
    ViewContent: {},
    AddToCart: {},
    RemoveFromCart: {},
    InitiateCheckout: {},
    AddPaymentInfo: {},
    Purchase: {},
    Lead: {
        name: ({
            label
        }) => removeSpaces(label),
        table: 'lead_events',
    },
};

function processParams(params) {
    return Object.keys(params).reduce((res, key) => {
        res[key] = encodeValue(params[key]);
        return res;
    }, {});
}

// eslint-disable-next-line max-params
function buildParams(type, name, params = {}, options = {}, table) {
    const res = {
        evt: type,
        evn: name,
        data: processParams(params),
    };

    if (options.context && options.context.appDefId) {
        res.appId = options.context.appDefId;
    }

    if (table) {
        res.tbl = table;
    }

    return [
        [res]
    ];
}

function predefined(name, params, options, table) {
    return buildParams('p', name, params, options, table);
}

function custom(name, params, options, table) {
    return buildParams('c', name, params, options, table);
}

export const channelEvents = Object.keys(EventsMap).reduce(
    (res, event) => {
        let {
            name,
            table,
            paramsMap
        } = EventsMap[event];

        res[event] = (params = {}, options) => {
            if (typeof name === 'function') {
                name = name(params);
            }

            if (paramsMap) {
                params = Object.keys(paramsMap).reduce((pres, pname) => {
                    pres[paramsMap[pname]] = params[pname];
                    return pres;
                }, {});
            }

            name = name || event;

            return predefined(name, params, options, table);
        };

        return res;
    }, {
        CustomEvent: ({
                event,
                targetTable,
                ...params
            }, options) =>
            custom(event, params, options, targetTable),
    },
);