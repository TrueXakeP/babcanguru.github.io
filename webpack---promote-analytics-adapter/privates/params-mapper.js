export const paramsMapper = (params, mapper) => {
    const mappedParams = Object.keys(params);
    if (mappedParams.length === 0) {
        return params;
    }
    return mappedParams.reduce((mappedObject, currentKey) => {
        const newKey = mapper[currentKey];
        if (newKey && (params[currentKey] || params[currentKey] === 0)) {
            mappedObject[newKey] = params[currentKey];
        }
        return mappedObject;
    }, {});
};