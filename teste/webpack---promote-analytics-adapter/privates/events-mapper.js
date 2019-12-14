export const events = {};

export const getArgumentsLists = (eventName, channel, params = {}, options) => {
    const {
        appDefId,
        ...eventParams
    } = params;

    if (!channel.events) {
        return [
            [eventName, eventParams, ...(options ? [options] : [])]
        ];
    }

    options = options || {};
    options.config = channel.config;
    options.context = options.context || {};

    options.context.appDefId = options.context.appDefId || appDefId;
    return channel.events[eventName] ?
        channel.events[eventName](eventParams, options) :
        [];
};