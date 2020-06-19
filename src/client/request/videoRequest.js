import BaseRequest from './baseRequest';
//import axios from 'axios';
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

    stopPlayVideo = (demander, target, extdemander, exttarget, session, channel, stop_type, callback, cbid) => {
        //logger.debug('stopPlayVideo:{}', target);
        let param = {
            'demander': demander,
            'target': target,
            'extdemander': extdemander,
            'exttarget': exttarget,
            'session': session,
            'channel': channel,
            'stop_type': stop_type,//0停止视频播放和推流，1仅停止视频播放，不停止推流
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

    getVideoList = (start, count, starttime, endtime, name, callback, cbid) => {
        logger.debug('getVideoList,start:{},count:{}', start, count);
        //startDate endDate userCamNameLike start length
        start = start >= 0 ? start : 0;
        count = count > 0 ? count : 100;
        //let consoleId = window.websdk.private_cache.login_uid;
        let param = {
            'starttime': starttime,
            'endtime': endtime,
            'usercamnamelike': name,
            'start': start,
            'length': count,
            //'consoleId': consoleId,
        }
        this.core.invokes.req_get_video_list(param, callback, cbid);
    }

    transformVideo = (videoid, videourl, callback, cbid) => {
        let result = {
            msg_code: 'transformVideo',
            cbid: cbid,
            cmd_type: 1
        }
        if (!videoid) {
            result.cmd_status = 2;
            result.error_reason = 'videoId empty';
            callback(result);
            return;
        }
        if (!videourl) {
            result.cmd_status = 3;
            result.error_reason = 'videoUrl empty';
            callback(result);
            return;
        }
        let param = {
            'videoid': videoid,
            'videourl': videourl
        }
        this.core.invokes.req_transform_video(param, callback, cbid);
    }

    getPushVideoUsers = (callback, cbid) => {
        //logger.debug('getPushVideoUsers');
        let param = {};
        this.core.invokes.req_get_push_video_users(param, callback, cbid);
    }

    /*getRemoteVideoList = (start, count, startDate, endDate, name, callback, cbid) => {
        logger.debug('getRemoteVideoList,start:{},count:{}', start, count);
        //startDate endDate userCamNameLike start length
        start = start >= 0 ? start : 0;
        count = count > 0 ? count : 50;
        let param = {
            'startDate': startDate,
            'endDate': endDate,
            'userCamNameLike': name,
            'start': start,
            'length': count,
            'consoleId': vsid,
        };

        let url = window.websdk.private_cache.get_remote_video_url;
        let result = {
            msg_code: 'getRemoteVideoList',
            cbid: cbid,
            cmd_type: 1
        }
        if (!url) {
            result.cmd_status = 1;
            result.error_reason = 'cache url empty';
            callback(result);
            return;
        }

        axios.post(url, param).then(function (response) {
            console.log(response);
            if (response.success) {
                response.cmd_status = 0;
                let data = Object.assign({}, response, result);
                callback(data);
            } else {
                result.cmd_status = 20;
                result.error_reason = 'http response error';
                callback(result);
            }

        }).catch(function (error) {
            console.log(error);
            result.cmd_status = 10;
            result.error_reason = 'http error:' + error;
            callback(result);
        });

    }

    transformVideo = (videoId, videoUrl, callback, cbid) => {

        let url = window.websdk.private_cache.transform_video_url;
        let result = {
            msg_code: 'transformVideo',
            cbid: cbid,
            cmd_type: 1
        }
        if (!url) {
            result.cmd_status = 1;
            result.error_reason = 'cache url empty';
            callback(result);
            return;
        }
        if (!videoId) {
            result.cmd_status = 2;
            result.error_reason = 'videoId empty';
            callback(result);
            return;
        }
        if (!videoUrl) {
            result.cmd_status = 3;
            result.error_reason = 'videoUrl empty';
            callback(result);
            return;
        }

        let param = {
            'videoId': videoId,
            'videoUrl': videoUrl
        };

        axios.post(url, param).then(function (response) {
            console.log(response);
            if (response.success) {
                response.cmd_status = 0;
                let data = Object.assign({}, response, result);
                callback(data);
            } else {
                result.cmd_status = 20;
                result.error_reason = 'http response error';
                callback(result);
            }

        }).catch(function (error) {
            console.log(error);
            result.cmd_status = 10;
            result.error_reason = 'http error:' + error;
            callback(result);
        });
    }*/

    initVideoDom = (cavans) => {

    }

}

export default VideoRequest;