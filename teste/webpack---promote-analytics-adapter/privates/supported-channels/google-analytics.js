import {
    paramsMapper
} from '../params-mapper';
/*
 * Adapter for Google Analytics
 */
const channelParams = {
    price: 'price', // Value of a user performing this event to the business
    sku: 'id', // Product stock keeping unit id
    id: 'id', // *ga specific - Product ID (string)
    currency: 'currency', // The currency for the price specified
    name: 'name', // Name of the page/product
    category: 'category', // Category of the page/product
    brand: 'brand', // *ga specific - Product brand (string)
    variant: 'variant', // *ga specific - Product variant (string)
    list: 'list', // *ga specific - Name of the list the product was selected from, e.g 'search results'
    quantity: 'quantity', // *ga specific - Product quantity (number)
    step: 'step', // *ga specific - Step number for the checkout action
    option: 'option', // *ga specific - Additional info about the checkout action e.g. Visa/Mastercard, FedEx/USPS
    position: 'position', // *ga specific - Position  (string)
    coupon: 'coupon', // *ga specific - Product coupon (string).
    affiliation: 'affiliation', // *ga specific - Affiliation (string).
    revenue: 'revenue', // *ga specific - Revenue (currency).
    tax: 'tax', // *ga specific - Tax (currency).
    shipping: 'shipping', // *ga specific - Shipping (currency).
};

(() => {
    for (let index = 1; index <= 200; index++) {
        channelParams['dimension' + index] = 'dimension' + index;
        channelParams['metric' + index] = 'metric' + index;
    }
})();

const getEventCategory = origin =>
    origin ? `Enhanced Ecommerce - ${origin}` : 'Enhanced Ecommerce';

export const channelEvents = {
    AddProductImpression: params => {
        const impressions = (params.contents || []).map(product => [
            'ec:addImpression',
            paramsMapper(product, channelParams),
        ]);
        return [
            ['require', 'ec']
        ].concat(impressions).concat([
            [
                'send',
                'event',
                getEventCategory(params.origin),
                'Product Impressions',
                {
                    nonInteraction: true,
                },
            ],
        ]);
    },
    ClickProduct: params => {
        const productName = params.name ? params.name : '(not set)';
        const list = params.list ? params.list : '(not set)';
        return [
                ['require', 'ec']
            ]
            .concat([
                ['ec:addProduct', paramsMapper(params, channelParams)]
            ])
            .concat([
                ['ec:setAction', 'click', {
                    list
                }]
            ])
            .concat([
                [
                    'send',
                    'event',
                    getEventCategory(params.origin),
                    'Product Click',
                    productName,
                ],
            ]);
    },
    ViewContent: params => {
        const productName = params.name ? params.name : '(not set)';
        return [
                ['require', 'ec']
            ]
            .concat([
                ['ec:addImpression', paramsMapper(params, channelParams)]
            ])
            .concat([
                ['ec:setAction', 'detail']
            ])
            .concat([
                [
                    'send',
                    'event',
                    getEventCategory(params.origin),
                    'View Content',
                    productName,
                    {
                        nonInteraction: true,
                    },
                ],
            ]);
    },
    AddToCart: params => {
        const productName = params.name ? params.name : '(not set)';
        return [
                ['require', 'ec']
            ]
            .concat([
                ['ec:addProduct', paramsMapper(params, channelParams)]
            ])
            .concat([
                ['ec:setAction', 'add']
            ])
            .concat([
                [
                    'send',
                    'event',
                    getEventCategory(params.origin),
                    'Add to Cart',
                    productName,
                ],
            ]);
    },
    RemoveFromCart: params => {
        const productName = params.name ? params.name : '(not set)';
        return [
                ['require', 'ec']
            ]
            .concat([
                ['ec:addProduct', paramsMapper(params, channelParams)]
            ])
            .concat([
                ['ec:setAction', 'remove']
            ])
            .concat([
                [
                    'send',
                    'event',
                    getEventCategory(params.origin),
                    'Remove from Cart',
                    productName,
                ],
            ]);
    },
    InitiateCheckout: params => {
        const products = (params.contents || []).map(product => [
            'ec:addProduct',
            paramsMapper(product, channelParams),
        ]);
        const requiredParams = paramsMapper({
                option: params.option
            },
            channelParams,
        );
        return [
                ['require', 'ec']
            ]
            .concat(products)
            .concat([
                ['ec:setAction', 'checkout', requiredParams]
            ])
            .concat([
                ['send', 'event', getEventCategory(params.origin), 'Initiate Checkout'],
            ]);
    },
    StartPayment: params => {
        const requiredParams = paramsMapper({
                step: 1,
                option: params.option
            },
            channelParams,
        );
        return [
                ['require', 'ec']
            ]
            .concat([
                ['ec:setAction', 'checkout_option', requiredParams]
            ])
            .concat([
                ['send', 'event', getEventCategory(params.origin), 'Start Payment'],
            ]);
    },
    AddPaymentInfo: params => {
        const requiredParams = paramsMapper({
                step: 2,
                option: params.option
            },
            channelParams,
        );
        return [
                ['require', 'ec']
            ]
            .concat([
                ['ec:setAction', 'checkout_option', requiredParams]
            ])
            .concat([
                ['send', 'event', getEventCategory(params.origin), 'Add Payment Info'],
            ]);
    },
    CheckoutStep: params => {
        const requiredParams = paramsMapper({
                step: params.step || 3,
                option: params.option
            },
            channelParams,
        );
        return [
                ['require', 'ec']
            ]
            .concat([
                ['ec:setAction', 'checkout_option', requiredParams]
            ])
            .concat([
                [
                    'send',
                    'event',
                    getEventCategory(params.origin),
                    `Checkout Step ${requiredParams.step}`,
                ],
            ]);
    },
    Purchase: params => {
        const products = (params.contents || []).map(product => [
            'ec:addProduct',
            paramsMapper(product, channelParams),
        ]);
        const requiredParams = {};
        ['id', 'affiliation', 'revenue', 'tax', 'shipping', 'coupon'].forEach(
            param => params[param] && (requiredParams[param] = params[param]),
        );
        return [
                ['require', 'ec']
            ]
            .concat(products)
            .concat([
                [
                    'ec:setAction',
                    'purchase',
                    paramsMapper(requiredParams, channelParams),
                ],
            ])
            .concat([
                ['send', 'event', getEventCategory(params.origin), 'Purchase']
            ]);
    },
    Lead: ({
        category = 'Leads',
        action = 'Submitted',
        label = 'New Lead'
    }) => [
        ['send', 'event', category, action, label],
    ],
    CustomEvent: params => {
        const {
            event = 'customEvent', eventAction, ...restOfParams
        } = params;
        if (event.toLowerCase() === 'pageview') {
            return [
                ['send', 'pageview', paramsMapper(restOfParams, channelParams)]
            ];
        }
        return [
            [
                'send',
                'event',
                {
                    eventAction: eventAction || event,
                    ...restOfParams,
                },
            ],
        ];
    },
};