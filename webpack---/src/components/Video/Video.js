'use strict'

const _ = require('lodash')
const PropTypes = require('prop-types')
const createReactClass = require('create-react-class')
const coreUtilsLib = require('santa-core-utils')
const ReactDOM = require('react-dom')
const createReactElement = require('../../utils/createReactElement')
const santaTypesDefinitions = require('../../definitions/santaTypesDefinitions')
const skinBasedComp = require('../../mixins/skinBasedComp')
const skinsJson = require('../../components/Video/VideoSkins/skins.json.js')

const getComponentSkins = () => skinsJson


function getVideoHeight(videoType, showControls, styleHeight) {
    if (styleHeight === '100%') {
        return '100%'
    }
    const services = getServices()
    let minSize = videoType ? services[videoType].hMinSize : 0
    if (videoType === 'YOUTUBE' && showControls === 'always_show') {
        minSize += 20
    }
    return Math.max(styleHeight, minSize)
}

function getVideoWidth(videoType, styleWidth) {
    if (styleWidth === '100%') {
        return '100%'
    }
    const services = getServices()
    const minSize = videoType ? services[videoType].wMinSize : 0
    return Math.max(styleWidth, minSize)
}


function getServices() {
    return {
        YOUTUBE: {
            url: _.template('//www.youtube.com/embed/${videoId}?'),
            getParams: getYouTubeParams,
            hMinSize: 200,
            wMinSize: 200,
            title: 'External YouTube'
        },
        VIMEO: {
            url: _.template('//player.vimeo.com/video/${videoId}?'),
            getParams: getVimeoParams,
            hMinSize: 100,
            wMinSize: 100,
            title: 'External Vimeo'
        },
        DAILYMOTION: {
            url: _.template('//www.dailymotion.com/embed/video/${videoId}?'),
            getParams: getDailyMotionParams,
            hMinSize: 100,
            wMinSize: 100,
            title: 'External Daily Motion'
        },
        FACEBOOK: {
            url: _.template('//www.facebook.com/plugins/video.php?href=https://www.facebook.com/${videoId}&'),
            getParams: getFacebookParams,
            hMinSize: 100,
            wMinSize: 100,
            title: 'External Facebook'
        }
    }
}

function getYouTubeParams(compProp, compData, isPlayingAllowed) {
    const showControlsOption = compProp.showControls
    const isFacebookSite = false // this.resources.W.Config.isFacebookSite();
    const isAutoPlay = compProp.autoplay && !isFacebookSite
    const enablejsapi = compProp.enablejsapi || 0

    const isLightTheme = compProp.lightTheme
    const isLoop = compProp.loop
    const isShowInfo = compProp.showinfo
    const playlist = compData.videoId || ''

    return {
        wmode: 'transparent',
        autoplay: isAutoPlay && isPlayingAllowed ? '1' : '0',
        theme: isLightTheme ? 'light' : 'dark',
        controls: showControlsOption !== 'always_hide' ? '1' : '0',
        autohide: showControlsOption === 'temp_show' ? '1' : '0',
        loop: isLoop ? '1' : '0',
        showinfo: isShowInfo ? '1' : '0',
        rel: '0',
        playlist: isLoop ? playlist : false,
        enablejsapi
    }
}

function getFacebookParams(compProp, compData, isPlayingAllowed, videoSize) {
    return {
        autoplay: compProp.autoplay && isPlayingAllowed,
        width: videoSize.width,
        height: videoSize.height
    }
}

function getVimeoParams(compProp, compData, isPlayingAllowed) {
    return {
        autoplay: compProp.autoplay && isPlayingAllowed,
        loop: compProp.loop,
        byline: compProp.showinfo,
        portrait: compProp.showinfo,
        title: compProp.showinfo
    }
}

function getDailyMotionParams(compProp, compData, isPlayingAllowed) {
    return {
        autoplay: compProp.autoplay && isPlayingAllowed,
        'ui-start-screen-info': compProp.showinfo ? '1' : '0',
        controls: compProp.showControls === 'temp_show' ? '1' : '0',
        'sharing-enable': '0',
        'ui-logo': '0'
        //  https://jira.wixpress.com/browse/SE-18956  on some videos on dailymotion requesting 'light' theme doesn't work
        //'ui-theme': compProp.lightTheme ? 'light' : 'dark'
    }
}


function getVideoUrl(compData, compProp, isPlayingAllowed, videoSize) {
    const videoId = compData.videoId
    const videoType = compData.videoType
    if (!videoType || !videoId) {
        return ''
    }
    const services = getServices()

    const service = services[videoType]
    const params = service.getParams(compProp, compData, isPlayingAllowed, videoSize)
    return service.url({
        videoId
    }) + _.map(params, (val, key) => `${key}=${val}`).join('&')
}

function getVideoSize(videoType, showControls, style) {
    return {
        width: getVideoWidth(videoType, style.width),
        height: getVideoHeight(videoType, showControls, style.height)
    }
}

function getVideoFrameTitle(videoType) {
    if (!videoType) {
        return ''
    }
    const services = getServices()
    return services[videoType].title
}

/**
 * @class components.Video
 * @extends {core.skinBasedComp}
 */
//eslint-disable-line santa/no-module-state
const Video = createReactClass({
    displayName: 'Video',
    mixins: [skinBasedComp(skinsJson)],

    statics: {
        useSantaTypes: true,
        getComponentSkins,
        compType: 'wysiwyg.viewer.components.Video'
    },
    propTypes: {
        addItemProp: PropTypes.bool,
        isPlayingAllowed: santaTypesDefinitions.RenderFlags.isPlayingAllowed.isRequired,
        compData: santaTypesDefinitions.Component.compData.isRequired,
        compProp: santaTypesDefinitions.Component.compProp.isRequired,
        style: santaTypesDefinitions.Component.style.isRequired
    },
    componentWillMount() {
        this.canPlayVideo = this.props.isPlayingAllowed
    },
    componentDidUpdate() {
        if (this.canPlayVideo !== this.props.isPlayingAllowed) {
            this.canPlayVideo = this.props.isPlayingAllowed
            const videoFrame = ReactDOM.findDOMNode(this.refs.videoFrame)
            const videoIframe = videoFrame.querySelector('iframe')

            const videoSize = getVideoSize(this.props.compData.videoType, this.props.compProp.showControls, this.props.style)
            videoIframe.src = ''
            videoIframe.src = getVideoUrl(this.props.compData, this.props.compProp, this.props.isPlayingAllowed, videoSize)
        }
    },
    getSkinProperties() {
        const videoSize = getVideoSize(this.props.compData.videoType, this.props.compProp.showControls, this.props.style)
        const videoSrc = getVideoUrl(this.props.compData, this.props.compProp, this.props.isPlayingAllowed, videoSize)
        const frameTitle = getVideoFrameTitle(this.props.compData.videoType)
        const frameProps = {
            height: '100%',
            width: '100%',
            allowFullScreen: true,
            frameBorder: '0',
            title: frameTitle,
            'aria-label': frameTitle
        }

        if (coreUtilsLib.validationUtils.isValidUrl(videoSrc)) {
            frameProps['data-src'] = videoSrc
        }
        if (this.props.addItemProp) {
            frameProps.itemProp = 'image'
        }
        const refData = {
            '': {
                style: {
                    height: videoSize.height,
                    width: videoSize.width
                }
            },
            videoFrame: {
                children: createReactElement('iframe', frameProps)
            },
            preview: {
                style: {
                    display: 'none'
                }
            }
        }

        return refData
    }
})
module.exports = Video