import {
    Adapter
} from './privates/Adapter';

const adapter = new Adapter();

export const init = (channels = []) => {
    channels.forEach(adapter.addChannel);
};

export const addListener = (listenerInitializer, siteData) => {
    adapter.addListener(listenerInitializer, siteData);
};

export const trackEvent = (eventName, params, options) => {
    adapter.trackEvent(eventName, params, options);
};