import {
    channelEvents as fbpEvents
} from './supported-channels/facebook-pixel';
import {
    channelEvents as gaEvents
} from './supported-channels/google-analytics';
import {
    channelEvents as gtmEvents
} from './supported-channels/google-tag-manager';
import {
    channelEvents as wixEvents
} from './supported-channels/wix-analytics';
import {
    channelEvents as biEvents
} from './supported-channels/bi-analytics';
import {
    channelEvents as gtagEvents
} from './supported-channels/gtag';
import {
    channelEvents as vkRetargetingEvents
} from './supported-channels/vkRetargeting';
import {
    init as wixDevelopersListenerInit
} from './supported-channels/wix-developers-analytics';

export const channelNames = {
    FACEBOOK_PIXEL: 'facebookPixel',
    GOOGLE_ANALYTICS: 'googleAnalytics',
    GOOGLE_TAG_MANAGER: 'googleTagManager',
    WIX_ANALYTICS: 'wixAnalytics',
    BI_ANALYTICS: 'biAnalytics',
    GTAG: 'gtag',
    VK_RETARGETING: 'vkRetargeting',
    WIX_DEVELOPERS_ANALYTICS: 'wix-developers-analytics',
};

export const channels = {
    [channelNames.FACEBOOK_PIXEL]: fbpEvents,
    [channelNames.GOOGLE_ANALYTICS]: gaEvents,
    [channelNames.GOOGLE_TAG_MANAGER]: gtmEvents,
    [channelNames.WIX_ANALYTICS]: wixEvents,
    [channelNames.BI_ANALYTICS]: biEvents,
    [channelNames.GTAG]: gtagEvents,
    [channelNames.VK_RETARGETING]: vkRetargetingEvents,
};

export const listeners = {
    [channelNames.WIX_DEVELOPERS_ANALYTICS]: wixDevelopersListenerInit,
};