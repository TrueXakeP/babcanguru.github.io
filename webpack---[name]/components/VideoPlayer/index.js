import {
    VideoPlayer,
    santaVideoPlayer
} from './VideoPlayer';
import style from './VideoPlayer.st.css';

export default {
    componentType: 'wixui.VideoPlayer',
    component: VideoPlayer,
    santaComponent: santaVideoPlayer,
    skin: style.$skin
};