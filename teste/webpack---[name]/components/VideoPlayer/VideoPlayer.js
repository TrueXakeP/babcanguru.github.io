import React from 'react';
import _ from 'lodash';
import createReactClass from 'create-react-class';
import {
    bool,
    object,
    string
} from 'prop-types';
import {
    mixins,
    santaTypesDefinitions,
    utils,
    constants
} from 'santa-components';
import {
    Video as VideoCore
} from 'wix-ui-core/video';
import {
    PlaybackBIModule
} from '@wix/playback-bi-module';

import {
    biEvents
} from './bi/events';
import {
    videoPlayerBehaviors
} from './behaviors/videoPlayerBehaviors';
import style from './VideoPlayer.st.css';
import {
    playButtonIcon
} from './playButtonIcon';

const {
    skinBasedComp,
    runTimeCompData,
    compStateMixin
} = mixins;
const {
    imageClientApi
} = utils;
const {
    playbackTypes
} = constants.MEDIA;
const {
    ACTION_TYPES
} = constants.SITE;

const getComponentSkins = () => ({
    'wixui.skins.VideoPlayer': style.$skin
});

function getPublicState(state) {
    const isPlaying = _.get(state, 'isPlaying');
    const currentTime = _.get(state, 'currentTime');
    const duration = _.get(state, 'duration');
    const volume = _.get(state, 'volume');
    const isMuted = _.get(state, 'isMuted');

    return {
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted
    };
}

const VIDEO_TYPE_FILE = 'file';
const MAX_LOGO_WIDTH = 126;
const LOGO_TRANSFORM_TYPE = {
    transformType: 'fit'
};
const FITTING_SCALE_TO_FILL = imageClientApi.fittingTypes.SCALE_TO_FILL;

const listenToEventOnce = (eventEmitter, eventName, callback = _.noop) => {
    const handler = () => {
        eventEmitter.off(eventName, handler);
        callback();
    };

    eventEmitter.on(eventName, handler);
};

export const VideoPlayer = santaProps => {
    const styleState = {
        isMobileView: santaProps.isMobileView,
        isDesktopView: !santaProps.isMobileView,
        isTitleExists: Boolean(santaProps.showTitle && santaProps.title)
    };

    const config = _.merge({}, santaProps.config, {
        playable: {
            playButton: < button type = "button"
            className = {
                style.playButton
            } > {
                playButtonIcon
            } < /button>,
            preload: 'none',
            modules: {
                [PlaybackBIModule.moduleName]: PlaybackBIModule
            }
        }
    });

    const props = _.assign({}, santaProps, {
        config,
        id: `video-player-${santaProps.videoId}`,
        fillAllSpace: true,
        width: santaProps.style.width,
        height: santaProps.style.height,
    });

    return ( <
        VideoCore key = {
            `video${santaProps.controls}${santaProps.showTitle}`
        } { ...props
        } { ...style('root', styleState, santaProps)
        }
        />
    );
};

VideoPlayer.propTypes = {
    controls: bool,
    config: object,
    showTitle: bool,
    title: string,
    isMobileView: bool,
};

VideoPlayer.displayName = 'VideoPlayer';


export const santaVideoPlayer = createReactClass({
    displayName: 'VideoPlayerSanta',

    mixins: [
        skinBasedComp(getComponentSkins()),
        runTimeCompData,
        compStateMixin(getPublicState)
    ],

    propTypes: {
        styleId: santaTypesDefinitions.Component.styleId,
        style: santaTypesDefinitions.Component.style,
        isMobileView: santaTypesDefinitions.isMobileView,
        id: santaTypesDefinitions.Component.id,
        compProp: santaTypesDefinitions.Component.compProp,
        compData: santaTypesDefinitions.Component.compData,
        reportBI: santaTypesDefinitions.reportBI,
        biVisitorId: santaTypesDefinitions.biVisitorId,
        metaSiteId: santaTypesDefinitions.RendererModel.metaSiteId,
        isPlayingAllowed: santaTypesDefinitions.RenderFlags.isPlayingAllowed,
        staticMediaUrl: santaTypesDefinitions.ServiceTopology.staticMediaUrl,
        staticVideoUrl: santaTypesDefinitions.ServiceTopology.staticVideoUrl,
        registerPlayer: santaTypesDefinitions.Media.registerPlayer,
        unregisterPlayer: santaTypesDefinitions.Media.unregisterPlayer,
        updatePlayerState: santaTypesDefinitions.Media.updatePlayerState
    },

    statics: {
        behaviors: videoPlayerBehaviors,
        getComponentSkins
    },

    getInitialState() {
        const duration = _.get(this.props, 'compData.videoRef.duration');
        const volume = _.get(this.props, 'compProp.autoplay') ? 0 : 100;
        const isMuted = volume === 0;

        return {
            isReady: false,
            isPlaying: false,
            currentTime: 0,
            duration,
            volume,
            isMuted
        };
    },

    componentDidMount() {
        this.props.registerPlayer(this.props.id);
    },

    componentWillUnmount() {
        this.stop();
        this.props.unregisterPlayer(this.props.id);
    },

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.isPlayingAllowed && this.props.isPlayingAllowed) {
            this.player.stop();
        }
    },

    play(callback = _.noop) {
        this.player.play().then(() => callback());
    },

    pause(callback = _.noop) {
        this.player.pause().then(() => callback());
    },

    stop(callback = _.noop) {
        this.player.stop().then(() => callback());
    },

    togglePlay(callback = _.noop) {
        this.player.togglePlay().then(() => callback());
    },

    mute(callback = _.noop) {
        return this.player.mute().then(() => {
            this.setState({
                isMuted: true,
            });
            callback();
        });
    },

    unmute(callback = _.noop) {
        return this.player.unMute().then(() => {
            this.setState({
                isMuted: false,
            });
            callback();
        });
    },

    seek(time, callback = _.noop) {
        const timePoint = Number(time);

        if (_.isFinite(timePoint)) {
            this.player.seekTo(timePoint).then(() => callback());
        }
    },

    setVolume(volume) {
        this.player.setVolume(Number(volume));

        this.setState({
            volume: Number(volume),
        });
    },

    updatePlaybackState(playbackState) {
        const isPlaying = playbackState === playbackTypes.PLAYING;

        this.setState({
            isPlaying
        });
        this.props.updatePlayerState(this.props.id, {
            playbackState
        });
    },

    handleFirstPlayRequested() {
        this.props.reportBI(biEvents.PLAY_REQUESTED, {
            videoId: this.getVideoId(),
            videoSource: this.getVideoType(),
            playSource: this.getPlaySource()
        });
    },

    handleFirstPlay() {
        this.props.reportBI(biEvents.PLAY_START, {
            videoId: this.getVideoId(),
            videoSource: this.getVideoType(),
            playSource: this.getPlaySource()
        });
    },

    handleFirstEnded() {
        this.props.reportBI(biEvents.PLAY_DONE, {
            videoId: this.getVideoId(),
            videoSource: this.getVideoType()
        });
    },

    handleInit(playerAPI) {
        if (this.getVideoType() === VIDEO_TYPE_FILE) {
            playerAPI.setWixBIVideoID(this.getVideoId());
            playerAPI.setWixVisitorID(this.props.biVisitorId);
            playerAPI.setWixMSID(this.props.metaSiteId);
            playerAPI.setWixBIProduct('editor_player');

            listenToEventOnce(playerAPI, 'engine-state/play-requested', this.handleFirstPlayRequested);
        }
    },

    handleReady() {
        const volume = this.player.getVolume();
        const isMuted = this.player.isMuted();

        this.setState({
            isReady: true,
            volume,
            isMuted,
        });

        this.handleAction(ACTION_TYPES.ITEM_READY);
    },

    handleDuration(duration) {
        this.setState({
            duration
        });
    },

    handlePlay() {
        this.updatePlaybackState(playbackTypes.PLAYING);
        this.handleAction(ACTION_TYPES.ON_PLAY);
    },

    handlePause() {
        this.updatePlaybackState(playbackTypes.PAUSED);
        this.handleAction(ACTION_TYPES.ON_PAUSE);
    },

    handleProgress(currentTime) {
        const volume = this.player.getVolume();
        const isMuted = this.player.isMuted();

        this.setState({
            currentTime,
            volume,
            isMuted
        });

        this.handleAction(ACTION_TYPES.ON_PROGRESS, currentTime);
    },

    handleEnded() {
        this.updatePlaybackState(playbackTypes.PLAY_ENDED);
        this.handleAction(ACTION_TYPES.ON_ENDED);
    },

    handleError(err) {
        this.props.reportBI(biEvents.ERROR, {
            errorMessage: err && err.name && err.message ? `${err.name} : ${err.message}` : err,
            videoId: this.getVideoId(),
            videoSource: this.getVideoType(),
            playSource: this.getPlaySource()
        });
    },

    handleMouseIn(e) {
        this.handleAction(ACTION_TYPES.MOUSE_IN, e);
    },

    handleMouseOut(e) {
        this.handleAction(ACTION_TYPES.MOUSE_OUT, e);
    },

    getPlaySource() {
        return this.props.compProp.autoplay ? 'autoplay' : 'click';
    },

    getVideoType() {
        return _.get(this.props, 'compData.videoType') || VIDEO_TYPE_FILE;
    },

    getVideoId() {
        return _.get(this.props, 'id');
    },

    getPosterUrl() {
        const posterUrl = _.get(this.props, 'compData.posterUrl');

        if (posterUrl) {
            return posterUrl;
        }

        const {
            style
        } = this.props;
        const posterImageRef = _.get(this.props, 'compData.videoRef.posterImageRef');

        if (!posterImageRef) {
            return;
        }

        const {
            width,
            height,
            uri
        } = posterImageRef;
        const src = {
            id: uri,
            width,
            height
        };
        const target = {
            width: style.width,
            height: style.height
        };

        const previewData = imageClientApi.getData(FITTING_SCALE_TO_FILL, src, target);

        return `${this.props.staticMediaUrl}/${previewData.uri}`;
    },

    getVideoUrl() {
        const videoUrl = _.get(this.props, 'compData.videoUrl');

        if (videoUrl) {
            return videoUrl;
        }

        const qualities = _.get(this.props, 'compData.videoRef.qualities');
        if (!qualities) {
            return;
        }

        const {
            url
        } = _.maxBy(qualities, 'width');

        return `${this.props.staticVideoUrl}${url}`;
    },

    getLogoUrl() {
        if (!_.isObject(this.props.compData.logoRef)) {
            return;
        }

        const {
            width,
            height,
            uri
        } = this.props.compData.logoRef;
        const src = {
            id: uri,
            width,
            height
        };
        const target = {
            width: MAX_LOGO_WIDTH,
            height: Math.ceil(MAX_LOGO_WIDTH / width * height)
        };
        const previewData = imageClientApi.getData(FITTING_SCALE_TO_FILL, src, target, LOGO_TRANSFORM_TYPE);

        return `${this.props.staticMediaUrl}/${previewData.uri}`;
    },

    getSkinProperties() {
        const {
            id,
            styleId,
            style,
            isPlayingAllowed,
            isMobileView
        } = this.props;
        const {
            loop,
            showVideoTitle,
            controlsVisibility,
            autoplay
        } = this.props.compProp;
        const {
            videoTitle,
            description
        } = this.props.compData;
        const controls = controlsVisibility === 'hover';
        const playing = isPlayingAllowed && autoplay;

        const props = {
            className: styleId,
            videoId: id,
            style,
            isMobileView,
            src: this.getVideoUrl(),
            loop,
            playing,
            muted: autoplay,
            controls,
            showTitle: showVideoTitle,
            config: {
                playable: {
                    title: videoTitle,
                    description,
                    logoUrl: this.getLogoUrl(),
                    poster: this.getPosterUrl(),
                }
            },
            playerRef: player => {
                this.player = player;
            },
            onMouseIn: this.handleMouseIn,
            onMouseOut: this.handleMouseOut,
            onInit: this.handleInit,
            onReady: this.handleReady,
            onDuration: this.handleDuration,
            onProgress: this.handleProgress,
            onPlay: this.handlePlay,
            onPause: this.handlePause,
            onEnded: this.handleEnded,
            onFirstPlay: this.handleFirstPlay,
            onFirstEnded: this.handleFirstEnded,
            onError: this.handleError,
        };

        return {
            '': {
                children: [
                    utils.createReactElement(VideoPlayer, props)
                ]
            }
        };
    }
});