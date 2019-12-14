'use strict'

module.exports = {
    /**
     * @enum {string} documentServices.viewMode.VIEW_MODES
     */
    VIEW_MODES: {
        /**
         * @property {string}
         */
        DESKTOP: 'DESKTOP',
        /**
         * @property {string}
         */
        MOBILE: 'MOBILE'
    },
    /**
     * @enum {string} utils.constants.DATA_TYPES
     */
    DATA_TYPES: {
        data: 'data',
        prop: 'props',
        design: 'design',
        theme: 'style',
        layout: 'layout',
        breakpoints: 'breakpoints',
        anchors: 'anchors',
        behaviors: 'behaviors',
        connections: 'connections',
        mobileHints: 'mobileHints'
    },

    COMP_DATA_QUERY_KEYS: {
        data: 'dataQuery',
        props: 'propertyQuery',
        design: 'designQuery',
        behaviors: 'behaviorQuery',
        layout: 'layoutQuery',
        breakpoints: 'breakpointsQuery',
        anchors: 'anchorQuery',
        connections: 'connectionQuery',
        mobileHints: 'mobileHintsQuery'
    },

    COMP_DATA_QUERY_KEYS_WITH_STYLE: {
        data: 'dataQuery',
        props: 'propertyQuery',
        design: 'designQuery',
        behaviors: 'behaviorQuery',
        layout: 'layoutQuery',
        breakpoints: 'breakpointsQuery',
        anchors: 'anchorQuery',
        connections: 'connectionQuery',
        mobileHints: 'mobileHintsQuery',
        style: 'styleId'
    },

    PAGE_DATA_DATA_TYPES: {
        props: 'component_properties',
        data: 'document_data',
        design: 'design_data',
        behaviors: 'behaviors_data',
        connections: 'connections_data',
        style: 'theme_data',
        layout: 'layout_data',
        anchors: 'anchors_data',
        breakpoints: 'breakpoints_data',
        mobileHints: 'mobile_hints'
    },

    BASE_PROPS_SCHEMA_TYPE: 'DefaultProperties',

    COMP_IDS: {
        PAGE_GROUP: 'SITE_PAGES',
        PAGES_CONTAINER: 'PAGES_CONTAINER',
        HEADER: 'SITE_HEADER',
        FOOTER: 'SITE_FOOTER',
        BACKGROUND: 'SITE_BACKGROUND',
        QUICK_ACTION_BAR: 'QUICK_ACTION_BAR',
        WIX_ADS: 'WIX_ADS',
        WINDOW: 'WINDOW'
    },

    POPUP: {
        POPUP_OVERLAY_CONTAINER: {
            STYLE_ID: 'strc1',
            SKINPART_ID: 'popupOverlayContainer',
            COMPONENT_TYPE: 'wysiwyg.viewer.components.StripContainer',
            SKIN: 'wysiwyg.viewer.skins.stripContainer.DefaultStripContainer',
            TYPE: 'StripContainer'
        },
        POPUP_CONTAINER: {
            COMPONENT_TYPE: 'wysiwyg.viewer.components.PopupContainer'
        }
    },

    ACTIVE_ANCHOR: {
        DELAY_TO_END_SCROLL: 50
    },

    CURRENT_CONTEXT: 'CURRENT_CONTEXT',

    LAYOUT_MECHANISMS: {
        ANCHORS: 'anchors',
        MESH: 'mesh'
    },

    ANCHORS: {
        LOCK_THRESHOLD: 70,
        LOCK_CONDITION: {
            ALWAYS: 'always',
            NEVER: 'never',
            THRESHOLD: 'threshold'
        }
    },

    SUPPORTED_DYNAMIC_ACTIONS: {
        chat: {
            appId: '14517e1a-3ff0-af98-408e-2bd6953c36a2',
            icon: '55ef598f51c14f36ba4f0690cf28626f',
            color: '#2D41A9',
            text: 'Chat',
            itemType: 'chat'
        }
    },

    LANDING_PAGES_COMP_IDS: {
        PAGES_CONTAINER: 'PAGES_CONTAINER',
        QUICK_ACTION_BAR: 'QUICK_ACTION_BAR'
    },

    COMP_LAYOUT_OPTIONS: {
        REPEATER: {
            ALIGNMENTS: {
                LEFT: 'left',
                RIGHT: 'right',
                CENTER: 'center',
                JUSTIFY: 'justify'
            }
        },

        CHANGES_TYPES: {
            css: 'css',
            attr: 'attr',
            data: 'data'
        }

    },

    TPA_LINK_TAGS: {
        DATA_ID: 'linkTagHref__tpa',
        SUPPORTED_RELS: ['canonical', 'next', 'prev']
    },

    BODY_NOT_RENDERED_ERR: 'body failed to render',

    STYLES_PER_PAGE_VER: '1.0'
}