import {
    dispatchEvent
} from './events-dispatcher';
import {
    channels as supportedChannels
} from './channels';

export class Adapter {
    _channels = [];
    _listeners = [];

    constructor(channels = []) {
        channels.forEach(this.addChannel);
    }

    addChannel = channel => {
        if (this.isChannelAlreadyInit(channel)) {
            return;
        }
        if (this.isChannelPredefined(channel)) {
            this.populateChannelEvents(channel);
        } else {
            this.registerChannel(channel);
        }
        if (this.isChannelValid(channel)) {
            this._channels.push(channel);
        }
    };

    addListener = (listenerInitializerMap, siteData = {}) => {
        if (Array.isArray(listenerInitializerMap)) {
            listenerInitializerMap.forEach(listenerInitializer => {
                if (this.isListenerInitializerValid(listenerInitializer)) {
                    const listener = listenerInitializer(this.trackEvent, siteData);
                    listener && this._listeners.push(listener);
                }
            });
        }
    };

    trackEvent = (eventName, params, options) => {
        const reporters = this.getReporters();
        dispatchEvent(reporters, eventName, params, options);
    };

    getReporters = () => {
        const listenerReporters = this._listeners.map(listener => ({
            report: listener,
        }));
        return [...listenerReporters, ...this._channels];
    };

    isChannelAlreadyInit = channel =>
        this._channels.some(_channel => _channel.name === channel.name);

    isChannelPredefined(channel) {
        return supportedChannels[channel.name];
    }

    populateChannelEvents(channel) {
        channel.events = supportedChannels[channel.name];

        if (
            channel.events.publicTracking &&
            channel.events.publicTracking instanceof Function
        ) {
            channel.events.publicTracking();
        }
    }

    isChannelValid(channel) {
        const hasName = channel.name;
        const hasReportFunction = channel.report;
        const hasEvents =
            channel.events &&
            Object.values(channel.events).every(event => typeof event === 'function');
        return hasName && hasReportFunction && hasEvents;
    }

    isListenerInitializerValid = listener =>
        listener && listener instanceof Function;

    registerChannel(channel) {
        if (this.isChannelValid(channel)) {
            supportedChannels[channel.name] = channel.events;
        }
    }
}