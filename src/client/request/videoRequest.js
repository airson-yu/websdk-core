import BaseRequest from './baseRequest';
import logger from "../../core/logger";

class VideoRequest extends BaseRequest {
    constructor(core) {
        super(core);
        this.core = core;
    }

    playVideo = (demander, target, extdemander, exttarget, session, channel, resolution, callback, cbid) => {
        //logger.debug('openVideo:{}', target);
        let param = {
            'demander': demander,
            'target': target,
            'extdemander': extdemander,
            'exttarget': exttarget,
            'session': session,
            'channel': channel,
            'resolution': resolution,
            //'camera': camera
        };
        this.core.invokes.req_play_video(param, callback, cbid);
        //this.initVideoDom(param.cavans);
    }

    stopPlayVideo = (demander, target, extdemander, exttarget, session, channel, callback, cbid) => {
        //logger.debug('stopPlayVideo:{}', target);
        let param = {
            'demander': demander,
            'target': target,
            'extdemander': extdemander,
            'exttarget': exttarget,
            'session': session,
            'channel': channel,
            //'camera': camera
        };
        this.core.invokes.req_stop_play_video(param, callback, cbid);
    }

    switchCamera = (target, exttarget, session, channel, type, callback, cbid) => {
        //logger.debug('switchCamera:{}', target);
        let param = {
            'target': target,
            'exttarget': exttarget,
            'session': session,
            'channel': channel,
            //'camera': camera,
            'type': type
        };
        this.core.invokes.req_switch_camera(param, callback, cbid);
    }

    updateVideoSet = (target, exttarget, session, channel, resolution, quality, callback, cbid) => {
        //logger.debug('updateVideoSet:{}', target);
        let param = {
            'target': target,
            'exttarget': exttarget,
            'session': session,
            'channel': channel,
            'resolution': resolution,
            'quality': quality,
        };
        this.core.invokes.req_update_video_set(param, callback, cbid);
    }

    videoMute = (target, exttarget, session, channel, mute, callback, cbid) => {
        //logger.debug('videoMute:{}', target);
        let param = {
            'target': target,
            'exttarget': exttarget,
            'session': session,
            'channel': channel,
            'mute': mute,
        };
        this.core.invokes.req_video_mute(param, callback, cbid);
    }

    startVideoConf = (demander, extdemander, tgid, callback, cbid) => {
        //logger.debug('startVideoConf:{}', target);
        let param = {
            'demander': demander,
            'extdemander': extdemander,
            'tgid': tgid,
        };
        this.core.invokes.req_start_video_conf(param, callback, cbid);
    }

    stopVideoConf = (demander, extdemander, tgid, callback, cbid) => {
        //logger.debug('stopVideoConf:{}', target);
        let param = {
            'demander': demander,
            'extdemander': extdemander,
            'tgid': tgid,
        };
        this.core.invokes.req_stop_video_conf(param, callback, cbid);
    }

    shareVideoInVideoConf = (demander, extdemander, tgid, vsid, callback, cbid) => {
        //logger.debug('shareVideoInVideoConf:{}', target);
        let param = {
            'demander': demander,
            'extdemander': extdemander,
            'tgid': tgid,
            'vsid': vsid
        };
        this.core.invokes.req_share_video_in_video_conf(param, callback, cbid);
    }

    stopShareVideoInVideoConf = (demander, extdemander, tgid, vsid, callback, cbid) => {
        //logger.debug('stopShareVideoInVideoConf:{}', target);
        let param = {
            'demander': demander,
            'extdemander': extdemander,
            'tgid': tgid,
            'vsid': vsid
        };
        this.core.invokes.req_stop_share_video_in_video_conf(param, callback, cbid);
    }


    initVideoDom = (cavans) => {

    }

}

export default VideoRequest;