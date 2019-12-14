export function mapParam(mapper, name, value) {
    return typeof mapper[name] === 'function' ?
        mapper[name](value) :
        {
            name,
            value
        };
}

export function encodeValue(value = '') {
    if (typeof value === 'object') {
        if (
            value instanceof Number ||
            value instanceof Boolean ||
            value instanceof String
        ) {
            value = value.valueOf();
        } else if (value !== null) {
            value = JSON.stringify(value);
        }
    }

    return value;
}

export function encodePrice(price) {
    if (typeof price === 'number') {
        return Math.round(price * 10000);
    }

    return price;
}

export function removeSpaces(str) {
    return str && ('' + str).replace(/\s/g, '');
}