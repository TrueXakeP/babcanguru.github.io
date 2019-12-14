/*
 * Adapter for BI Analytics (using BI infrastructure)
 * DO NOT add new fields to events before the schema supports them
 */

import {
    mapParam,
    encodeValue,
    encodePrice
} from '../utils/bi-utils';

const SRC = 76;

const Fields = {
    product: [
        'id',
        'sku',
        'name',
        'category',
        'price',
        'currency',
        'brand',
        'variant',
        'list',
        'position',
    ],
    productList: ['contents'],
    payment: ['option'],
    purchase: [
        'id',
        'affiliation',
        'revenue',
        'tax',
        'shipping',
        'coupon',
        'contents',
    ],
};

const EventsMap = {
    AddProductImpression: {
        params: {
            evid: 1100
        },
        fields: Fields.productList
    },
    ClickProduct: {
        params: {
            evid: 1101
        },
        fields: Fields.product
    },
    ViewContent: {
        params: {
            evid: 1102
        },
        fields: Fields.product
    },
    AddToCart: {
        params: {
            evid: 1103
        },
        fields: [...Fields.product, 'quantity'],
    },
    RemoveFromCart: {
        params: {
            evid: 1104
        },
        fields: [...Fields.product, 'quantity'],
    },
    InitiateCheckout: {
        params: {
            evid: 1105
        },
        fields: Fields.productList
    },
    AddPaymentInfo: {
        params: {
            evid: 1106
        },
        fields: Fields.payment
    },
    Purchase: {
        params: {
            evid: 1107
        },
        fields: Fields.purchase
    },
    Lead: {
        params: {
            evid: 1108
        },
        fields: []
    },
};

const ParamsMap = {
    price: price => ({
        name: 'price',
        value: encodePrice(price)
    }),
    revenue: revenue => ({
        name: 'revenue',
        value: encodePrice(revenue)
    }),
    tax: tax => ({
        name: 'tax',
        value: encodePrice(tax)
    }),
    shipping: shipping => ({
        name: 'shipping',
        value: encodePrice(shipping)
    }),
};

function processParams(fields, params) {
    return fields.reduce((res, key) => {
        const {
            name,
            value
        } = mapParam(ParamsMap, key, params[key]);
        res[name] = encodeValue(value);

        return res;
    }, {});
}

export const channelEvents = Object.keys(EventsMap).reduce((res, event) => {
    res[event] = (params = {}, options = {}) => {
        const res = {
            src: SRC,
            ...EventsMap[event].params,
            ...processParams(EventsMap[event].fields, params),
        };

        if (options.context && options.context.appDefId) {
            res.appId = options.context.appDefId;
        }

        return [
            [res]
        ];
    };

    return res;
}, {});