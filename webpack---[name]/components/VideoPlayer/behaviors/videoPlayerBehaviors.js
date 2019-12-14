export const videoPlayerBehaviors = {
    togglePlay: {
        methodName: 'togglePlay'
    },
    play: {
        methodName: 'play'
    },
    playPreview: {
        methodName: 'play'
    },
    pause: {
        methodName: 'pause'
    },
    stop: {
        methodName: 'stop'
    },
    mute: {
        methodName: 'mute'
    },
    unmute: {
        methodName: 'unmute'
    },
    seek: {
        methodName: 'seek',
        params: ['time']
    },
    setVolume: {
        methodName: 'setVolume',
        params: ['volume']
    }
};