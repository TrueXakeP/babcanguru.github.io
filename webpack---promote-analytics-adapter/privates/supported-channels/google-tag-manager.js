/*
 * Adapter for Google Tag Manager
 */
/* eslint-disable camelcase */
export const channelEvents = {
    AddProductImpression: ({
        contents,
        origin
    }) => {
        const impressions = contents;
        return [
            [
                [{
                    event: 'productImpression',
                    ...(origin && {
                        origin
                    }),
                    ecommerce: {
                        impressions
                    },
                }, ],
            ],
        ];
    },
    ClickProduct: ({
        list = '(not set)',
        origin,
        ...params
    }) => {
        return [
            [
                [{
                    event: 'productClick',
                    ...(origin && {
                        origin
                    }),
                    ecommerce: {
                        click: {
                            actionField: {
                                list
                            },
                            products: [params]
                        }
                    },
                }, ],
            ],
        ];
    },
    ViewContent: ({
        list = '(not set)',
        origin,
        ...params
    }) => {
        return [
            [
                [{
                    event: 'viewContent',
                    ...(origin && {
                        origin
                    }),
                    ecommerce: {
                        detail: {
                            actionField: {
                                list
                            },
                            products: [params]
                        },
                    },
                }, ],
            ],
        ];
    },
    AddToCart: ({
        origin,
        ...params
    }) => {
        return [
            [
                [{
                    event: 'addToCart',
                    ...(origin && {
                        origin
                    }),
                    ecommerce: {
                        add: {
                            products: [params]
                        }
                    },
                }, ],
            ],
        ];
    },
    RemoveFromCart: ({
        origin,
        ...params
    }) => {
        return [
            [
                [{
                    event: 'removeFromCart',
                    ...(origin && {
                        origin
                    }),
                    ecommerce: {
                        remove: {
                            products: [params]
                        }
                    },
                }, ],
            ],
        ];
    },
    InitiateCheckout: ({
        contents = [],
        origin,
        option
    }) => {
        const products = [...contents];
        const actionField = Object.assign({}, option && {
            option
        });
        return [
            [
                [{
                    event: 'checkout',
                    ...(origin && {
                        origin
                    }),
                    ecommerce: {
                        checkout: {
                            actionField,
                            products
                        }
                    },
                }, ],
            ],
        ];
    },
    StartPayment: ({
        origin
    }) => {
        const actionField = {
            step: 1
        };
        return [
            [
                [{
                    event: 'checkoutOption',
                    ...(origin && {
                        origin
                    }),
                    ecommerce: {
                        checkout_option: {
                            actionField
                        }
                    },
                }, ],
            ],
        ];
    },
    AddPaymentInfo: ({
        origin,
        option
    }) => {
        const actionField = Object.assign({
            step: 2
        }, option && {
            option
        });
        return [
            [
                [{
                    event: 'checkoutOption',
                    ...(origin && {
                        origin
                    }),
                    ecommerce: {
                        checkout_option: {
                            actionField
                        }
                    },
                }, ],
            ],
        ];
    },
    CheckoutStep: ({
        step = 3,
        origin,
        option
    }) => {
        const actionField = Object.assign({
            step
        }, option && {
            option
        });
        return [
            [
                [{
                    event: 'checkoutOption',
                    ...(origin && {
                        origin
                    }),
                    ecommerce: {
                        checkout_option: {
                            actionField
                        }
                    },
                }, ],
            ],
        ];
    },
    Purchase: ({
        contents = [],
        origin,
        ...params
    }) => {
        const products = [...contents];
        const actionField = {};
        ['id', 'affiliation', 'revenue', 'tax', 'shipping', 'coupon'].forEach(
            param => params[param] && (actionField[param] = params[param]),
        );
        return [
            [
                [{
                    event: 'purchase',
                    ...(origin && {
                        origin
                    }),
                    ecommerce: {
                        purchase: {
                            actionField,
                            products
                        }
                    },
                }, ],
            ],
        ];
    },
    Lead: () => {
        return [
            [
                [{
                    event: 'lead'
                }]
            ]
        ];
    },
    CustomEvent: ({
        event = 'customEvent',
        ...params
    }) => {
        return [
            [
                [{
                    event,
                    ...params
                }]
            ]
        ];
    },
};