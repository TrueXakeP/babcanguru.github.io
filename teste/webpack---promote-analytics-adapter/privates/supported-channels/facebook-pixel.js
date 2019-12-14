import {
    paramsMapper
} from '../params-mapper';
/*
 * Adapter for Facebook Pixel
 */

/* eslint-disable camelcase */
const channelParams = {
    id: 'id', // ID of a product inside product catalog
    price: 'value', // Value of a user performing this event to the business
    value: 'value', // Value of a user performing this event to the business
    revenue: 'value', // Value of a user performing this event to the business
    name: 'content_name', // Name of the page/product
    category: 'content_category', // Category of the page/product
    currency: 'currency', // *fbp specific - Currency for the value specified
    content_ids: 'content_ids', // *fbp specific - Product ids associated with the event. e.g. SKUs of products for AddToCart event: ['ABC123', 'XYZ789']
    contents: 'contents', // *fbp specific - A list of JSON object that contains the product ids associated with the event as well as additional information about the products
    type: 'content_type', // *fbp specific - Either 'product' or 'product_group' based on the content_ids or contents being passed
    num_items: 'num_items', // *fbp specific, initiateCheckout event only - The number of items that checkout was initiated for
    quantity: 'quantity', // *fbp specific - The number of items that checkout was initiated for
    label: 'content_name', // *fbp specific - Mapping of lead event label, specifying lead origin (e.g. Contact Form)
};

const calculatePrice = params =>
    (Number.parseFloat(params.tax) || 0) +
    (Number.parseFloat(params.shipping) || 0) +
    params.contents.reduce(
        (totalValue, product) =>
        totalValue + Number.parseFloat(product.item_price) * product.quantity,
        0,
    );

const getCurrency = params => params.contents && params.contents[0].currency;

const verifyParams = ({
    type = 'product',
    ...params
}) => {
    const verifiedParams = Object.assign({}, params, {
        type
    });
    if (verifiedParams.contents) {
        verifiedParams.contents = verifiedParams.contents.map(product => {
            product.quantity = product.quantity || 1;
            product.item_price = product.item_price || product.price || 0;
            return product;
        });
        if (!verifiedParams.price &&
            !verifiedParams.value &&
            !verifiedParams.revenue
        ) {
            verifiedParams.price = calculatePrice(verifiedParams).toString();
        }
        if (!verifiedParams.currency) {
            verifiedParams.currency = getCurrency(verifiedParams);
        }
    }
    return paramsMapper(verifiedParams, channelParams);
};

const addNumItems = params => {
    if (params.contents && !params.num_items) {
        const newParams = { ...params
        };
        newParams.num_items = newParams.contents.reduce(
            (num_items, product) => (num_items += product.quantity || 1),
            0,
        );
        return newParams;
    }
    return params;
};

export const channelEvents = {
    ViewContent: ({
        id,
        ...params
    }) => [
        ['track', 'ViewContent', { ...verifyParams(params),
            content_ids: [id]
        }],
    ],
    AddToCart: ({
        id,
        ...params
    }) => [
        ['track', 'AddToCart', { ...verifyParams(params),
            content_ids: [id]
        }],
    ],
    InitiateCheckout: params => [
        [
            'track',
            'InitiateCheckout',
            {
                ...verifyParams(addNumItems(params)),
                ...(params.contents && {
                    content_ids: params.contents.map(product => product.id),
                }),
            },
        ],
    ],
    AddPaymentInfo: params => [
        [
            'track',
            'AddPaymentInfo',
            {
                ...verifyParams(addNumItems(params)),
                ...(params.contents && {
                    content_ids: params.contents.map(product => product.id),
                }),
            },
        ],
    ],
    Purchase: params => [
        [
            'track',
            'Purchase',
            {
                ...verifyParams(addNumItems(params)),
                ...(params.contents && {
                    content_ids: params.contents.map(product => product.id),
                }),
            },
        ],
    ],
    Lead: params => [
        ['track', 'Lead', paramsMapper(params, channelParams)]
    ],
    CustomEvent: params => {
        const {
            event,
            eventAction = 'customEvent',
            ...rest
        } = params;
        return [
            ['trackCustom', event || eventAction, rest]
        ];
    },
};