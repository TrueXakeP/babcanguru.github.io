import {
    getArgumentsLists
} from './events-mapper';

export const dispatchEvent = (channels, eventName, params, options) => {
    channels.forEach(channel => {
        getArgumentsLists(eventName, channel, params, options).forEach(args =>
            channel.report(...args),
        );
    });
};