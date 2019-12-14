/*
 * Adapter for Wix Developers Analytics
 */

export const externalChannels = {};
let trackEvent;
let genericSiteData;

const hop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

const generateDefaultParams = siteData => ({
    isPremium: getIsPremium(siteData),
    userId: siteData.getUserId(),
    metaSiteId: siteData.getMetaSiteId(),
});

const extendParams = params => Object.assign({}, params, genericSiteData);

//let external tpa to register
export const register = (channelName, listener) => {
    if (!hop(externalChannels, channelName)) {
        externalChannels[channelName] = listener;
    }
};
//forward any event to whom ever that was subscribed.
export const dispatchChannels = (eventName, params) => {
    const channels = Object.keys(externalChannels);
    channels.forEach(channel => {
        externalChannels[channel].call(this, eventName, extendParams(params));
    });
};

export const triggerEvent = (eventName, params = {}) => {
    if (trackEvent) {
        trackEvent(eventName, params);
    }
};

export const init = (_trackEvent, siteData) => {
    if (!_trackEvent) {
        return;
    }

    if (window) {
        window.wixDevelopersAnalytics = window.wixDevelopersAnalytics || {
            register,
            triggerEvent,
        };

        if (typeof window.onWixDevelopersAnalyticsReady === 'function') {
            window.onWixDevelopersAnalyticsReady();
        }
    }

    trackEvent = _trackEvent;
    genericSiteData = generateDefaultParams(siteData);
    return dispatchChannels;
};

function getIsPremium({
    isPremium,
    isPremiumDomain,
    isPremiumUser
} = {}) {
    return (
        (isPremium && isPremium()) ||
        (isPremiumDomain && isPremiumDomain()) ||
        (isPremiumUser && isPremiumUser())
    );
}