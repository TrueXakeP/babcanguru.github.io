'use strict'

module.exports = {
    errorTypes: {
        VIDEO_GENERAL_ERROR: 'generalError',
        NO_VIDEO_FOUND: 'noVideoError',
        NO_HLS_VIDEO: 'noHlsVideoError',
        WEBGL_ERROR: 'webglError'
    },
    playbackTypes: {
        IDLE: 'idle',
        LOADING: 'loading',
        READY: 'ready',
        STOPPED: 'ready',
        PLAY_ENDED: 'ended',
        PLAY_PREVIEW: 'play_preview',
        PLAYING: 'playing',
        PAUSED: 'paused',
        PAUSED_BY_SERVICE: 'paused_by_service',
        SEEK_PLAYING: 'seek_playing',
        SEEK_PAUSED: 'seek_paused',
        SEEKING: 'seeking',
        SEEKING_ENDED: 'seek_ended',
        WAITING: 'waiting',
        STOPPING: 'stopping',
        ERROR: 'error'
    },
    eventTypes: {
        MOUNT: 'mount',
        UPDATE: 'update',
        LOAD: 'load',
        PLAYSTATE: 'playstate',
        VOLUME: 'volume',
        RATE: 'rate',
        TIME_UPDATE: 'timeupdate',
        PROGRESS: 'progress',
        ERROR: 'error'
    },
    availabilityReadyStates: {
        IN_PROCESS: 'in_process',
        PLAYING_PREVIEW: 'playing_preview',
        IDLE: 'idle',
        NO_VIDEO: 'no_video'
    },
    playback: {
        SUPPORTED_MEDIA_ATTRIBUTES: ['autoplay', 'mute', 'loop']
    },
    supportedParentProps: ['mediaBackgroundPadding'],
    clipPathPolygonSquare: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    balataConsts: {
        BALATA: 'balata',
        MEDIA: 'media',
        MEDIA_PADDING: 'mediaPadding',
        IMAGE: 'image',
        CONTENT: 'content',
        WEBGL: 'webgl',
        CANVAS: 'canvas',
        POSTER: 'poster',
        BG_IMAGE: 'bgimage',
        VIDEO: 'video',
        OVERLAY: 'overlay',
        UNDERLAY: 'underlay',
        BG_COLOR: 'bgcolor',
        ZOOM_SELECTORS: ['.bgImage', '.bgVideo'],
        PARALLAX_SELECTORS: ['.bgImage', '.bgVideo'],
        REVEAL_SELECTORS: ['.bgImage', '.bgVideo'],
        BLUR_SELECTORS: ['.bgImage', '.bgVideo'],
        FADE_SELECTORS: ['.bgImage', '.bgVideo', '.bgColor', '.bgOverlay'],
        MEDIA_PARAMS: {
            comp: 'wysiwyg.viewer.components.background.bgMedia',
            skin: 'skins.viewer.bgMedia.bgMediaSkin',
            style: 'bgMedia',
            ref: 'media'
        },
        MEDIA_PADDING_PARAMS: {
            ref: 'mediaPadding'
        },
        OVERLAY_PARAMS: {
            comp: 'wysiwyg.viewer.components.background.bgOverlay',
            skin: 'skins.viewer.bgOverlay.bgOverlaySkin',
            style: 'bgOverlay',
            ref: 'overlay'
        },
        COLOR_BG_PARAMS: {
            comp: 'wysiwyg.viewer.components.background.bgOverlay',
            skin: 'skins.viewer.bgOverlay.bgOverlaySkin',
            style: 'bgColor',
            ref: 'bgcolor'
        },
        IMAGE_BG_PARAMS: {
            comp: 'wysiwyg.viewer.components.background.bgImage',
            skin: 'skins.viewer.bgImage.bgImageSkin',
            style: 'bgImage',
            'data-type': 'bgimage'
        },
        IMAGE_PARAMS: {
            comp: 'core.components.Image',
            skin: 'skins.core.ImageNewSkinZoomable',
            style: 'bgImage',
            'data-type': 'image'
        },
        VIDEO_PARAMS: {
            comp: 'wysiwyg.viewer.components.background.html5Video',
            skin: 'skins.viewer.bgVideo.html5VideoSkin',
            style: 'bgVideo'
        },
        WEBGL_PARAMS: {
            comp: 'wysiwyg.viewer.components.background.webglMedia',
            skin: 'skins.viewer.bgVideo.webglMediaSkin',
            style: 'webgl'
        },
        IFRAME_VIDEO_PARAMS: {
            comp: 'wysiwyg.viewer.components.background.iframeVideo',
            skin: 'skins.viewer.bgVideo.iframeVideoSkin',
            style: 'iframeVideo'
        },
        overlay: 'overlayTransforms',
        media: 'mediaTransforms'
    },
    defaultMediaStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    popupMediaStyle: {
        position: 'fixed',
        pointerEvents: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
}