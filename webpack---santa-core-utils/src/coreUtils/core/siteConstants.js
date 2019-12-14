'use strict'

const pageAnchors = {
    TOP_ANCHOR_ID: 'SCROLL_TO_TOP',
    TOP_ANCHOR_COMP_ID: 'PAGE_TOP_ANCHOR',
    BOTTOM_ANCHOR_ID: 'SCROLL_TO_BOTTOM',
    BOTTOM_ANCHOR_COMP_ID: 'PAGE_BOTTOM_ANCHOR'
}

module.exports = {
    GLOBAL_IMAGE_QUALITY: 'IMAGE_QUALITY',
    GLOBAL_IMAGE_QUALITY_PROPERTIES: ['quality', 'unsharpMask'],
    MASTER_PAGE_ID: 'masterPage',
    HEADER_ID: 'SITE_HEADER',
    FOOTER_ID: 'SITE_FOOTER',
    SITE_STRUCTURE_ID: 'masterPage',
    SAME_PAGE_SCROLL_ANCHORS: [
        pageAnchors.TOP_ANCHOR_ID,
        pageAnchors.BOTTOM_ANCHOR_ID
    ],
    PAGE_ANCHORS: pageAnchors,
    PAGES_CONTAINER_ID: 'PAGES_CONTAINER',
    SITE_PAGES_ID: 'SITE_PAGES',
    COMP_SIZE: {
        MIN_WIDTH: 5,
        MIN_HEIGHT: 5,
        MAX_WIDTH: 2500,
        MAX_HEIGHT: 15000
    },
    COMP_MODES_TYPES: {
        HOVER: 'HOVER',
        SCROLL: 'SCROLL',
        WIDTH: 'WIDTH',
        DEFAULT: 'DEFAULT',
        APPLICATIVE: 'APPLICATIVE',
        SHOW_ON_SOME_PAGES: 'SHOW_ON_SOME_PAGES',
        POPOVER: 'POPOVER'
    },
    URL_FORMATS: {
        SLASH: 'slash',
        HASH_BANG: 'hashBang'
    },
    ACTION_TYPES: {
        CLICK: 'click',
        DBL_CLICK: 'dblClick',
        MOUSE_IN: 'mouseenter',
        MOUSE_OUT: 'mouseleave',
        CHANGE: 'change',
        BLUR: 'blur',
        FOCUS: 'focus',
        IMAGE_CHANGED: 'imageChanged',
        IMAGE_EXPANDED: 'imageExpanded',
        ITEM_CLICKED: 'itemClicked',
        CELL_SELECT: 'cellSelect',
        CELL_EDIT: 'cellEdit',
        ROW_SELECT: 'rowSelect',
        FETCH_DATA: 'fetchData',
        DATA_CHANGE: 'dataChange',
        ON_TIMEOUT: 'onTimeout',
        ON_VERIFY: 'onVerify',
        ON_ERROR: 'onError',
        ON_PLAY: 'onPlay',
        ON_PAUSE: 'onPause',
        ON_PROGRESS: 'onProgress',
        ON_ENDED: 'onEnded',
        AUTOPLAY_OFF: 'autoplayOff',
        AUTOPLAY_ON: 'autoplayOn',
        PLAY_ENDED: 'playEnded',
        PLAY_PROGRESS: 'playProgress',
        KEY_PRESS: 'keyPress',
        SCREEN_IN: 'screenIn',
        VIEWPORT_ENTER: 'viewportEnter',
        VIEWPORT_LEAVE: 'viewportLeave',
        SCROLL: 'scroll',
        VALIDATE: 'validate',
        SET_CUSTOM_VALIDITY: 'setCustomValidity',
        SYNC_VALIDATION_DATA: 'syncValidationData',
        UPDATE_VALIDITY_INDICATION: 'updateValidityIndication',
        MESSAGE: 'message',
        UPLOAD_COMPLETE: 'uploadComplete',
        ITEM_READY: 'itemReady',
        ITEM_REMOVED: 'itemRemoved',
        TAG_CLICK: 'tagClick',
        QUICK_ACTION_BAR_ITEM_CLICKED: 'quickActionBarItemClicked',
        GOOGLE_MAP_MARKER_CLICKED: 'markerClicked',
        GOOGLE_MAP_CLICKED: 'mapClicked',
        ICON_MOUSE_IN: 'iconMouseIn',
        ON_STATE_CHANGE: 'onStateChange'
    },
    DEFAULT_PAGE_URI_SEO: 'untitled',
    DEFAULT_POPUP_URI_SEO_PREFIX: 'popup-',
    BRIGHTNESS_DIFF_THRESHOLD: 20,
    FREE_DOMAIN: {
        WIXSITE: 'wixsite.com',
        WIX: 'wix.com'
    },
    VIEW_MODES: {
        DESKTOP: 'DESKTOP',
        MOBILE: 'MOBILE'
    },
    LANDING_PAGES_COMP_IDS: {
        PAGES_CONTAINER: 'PAGES_CONTAINER',
        QUICK_ACTION_BAR: 'QUICK_ACTION_BAR'
    },
    LAYOUT_MECHANISMS: {
        ANCHORS: 'anchors',
        MESH: 'mesh'
    },
    Animations: {
        Modes: {
            AnimationType: {
                ENTER: 'enter',
                LEAVE: 'leave',
                TRANSITION: 'transition'
            }
        },
        TimingFunctions: {
            EaseInOut: 'cubic-bezier(0.420, 0.000, 0.580, 1.000)'
        },
        TransitionType: {
            SCALE: 'Scale',
            NO_SCALE: 'NoScale',
            NO_DIMESIONS: 'NoDimensions'
        }
    }
}