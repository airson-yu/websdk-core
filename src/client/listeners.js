import logger from "../core/logger";

class Listeners {
    constructor(core) {
        this.core = core;
        this.monitors = this.core.processor.monitors;
        this.types = {
            'notice_logon': 'notice_logon',
            'notice_logout': 'notice_logout',
            'notice_emergency': 'notice_emergency',
            'notice_emergency_handled': 'notice_emergency_handled',
            'notice_user_profile': 'notice_user_profile',
            'notice_params_set': 'notice_params_set',
            'notice_user_state': 'notice_user_state',
            'notice_gps': 'notice_gps',
            'notice_query_gps': 'notice_query_gps',
            'notice_call_status': 'notice_call_status',
            'notice_ptt_replay': 'notice_ptt_replay',
            'notice_ptt_status': 'notice_ptt_status',
            'notice_im': 'notice_im',
            'notice_enter_group': 'notice_enter_group',
            'notice_leave_group': 'notice_leave_group',
            'notice_add_grp_mem': 'notice_add_grp_mem',
            'notice_rem_grp_mem': 'notice_rem_grp_mem',
            'group_mem_status_notice': 'group_mem_status_notice',
            'notice_play_video': 'notice_play_video',
            'notice_rsp_play_video': 'notice_rsp_play_video',
            'notice_stop_play_video': 'notice_stop_play_video',
            'notice_rsp_stop_play_video': 'notice_rsp_stop_play_video',
            'notice_video_mute': 'notice_video_mute',
            'notice_start_video_conf': 'notice_start_video_conf',
            'notice_start_video_conf_status': 'notice_start_video_conf_status',
            'notice_stop_video_conf': 'notice_stop_video_conf',
            'notice_share_video_in_video_conf': 'notice_share_video_in_video_conf',
            'notice_stop_share_video_in_video_conf': 'notice_stop_share_video_in_video_conf',
            'webUserLocationNotice': 'webUserLocationNotice',
            'ErrMsg': 'ErrMsg',
        };
        this.web_notices = {
            webUserLocationNotice: null,
        }
    }

    cancelNotice = (type, key) => {
        //logger.debug('listener cancelNotice');
        if (!type) {
            return false;
        }
        this.monitors.removeMonitor(type, key);
    }

    cancelNoticeByType = (type) => {
        //logger.debug('listener cancelNoticeByType');
        if (!type) {
            return false;
        }
        this.monitors.removeMonitor(type, '_all');
    }

    logonNotice = (callback, key) => {
        //logger.debug('listener logonNotice');
        this.monitors.addMonitor(this.types.notice_logon, callback, key);
    }

    logoutNotice = (callback, key) => {
        //logger.debug('listener logoutNotice');
        this.monitors.addMonitor(this.types.notice_logout, callback, key);
    }

    emergencyAlarmNotice = (callback, key) => {
        //logger.debug('listener emergencyAlarmNotice');
        this.monitors.addMonitor(this.types.notice_emergency, callback, key);
    }

    emergencyHandledNotice = (callback, key) => {
        //logger.debug('listener emergencyHandledNotice');
        this.monitors.addMonitor(this.types.notice_emergency_handled, callback, key);
    }

    userProfileNotice = (callback, key) => {
        //logger.debug('listener userProfileNotice');
        this.monitors.addMonitor(this.types.notice_user_profile, callback, key);
    }

    userParamsNotice = (callback, key) => {
        //logger.debug('listener userParamsNotice');
        this.monitors.addMonitor(this.types.notice_params_set, callback, key);
    }

    userStateNotice = (callback, key) => {
        //logger.debug('listener userStateNotice');
        this.monitors.addMonitor(this.types.notice_user_state, callback, key);
    }

    userGPSNotice = (callback, key) => {
        //logger.debug('listener userGPSNotice');
        this.monitors.addMonitor(this.types.notice_gps, callback, key);
    }

    userQueryGPSNotice = (callback, key) => {
        //logger.debug('listener userQueryGPSNotice');
        this.monitors.addMonitor(this.types.notice_query_gps, callback, key);
    }

    callStatusNotice = (callback, key) => {
        //logger.debug('listener callStatusNotice');
        this.monitors.addMonitor(this.types.notice_call_status, callback, key);
    }

    pttStatusNotice = (callback, key) => {
        //logger.debug('listener pttStatusNotice');
        this.monitors.addMonitor(this.types.notice_ptt_status, callback, key);
    }

    pttStatusReplay = (callback, key) => {
        //logger.debug('listener pttStatusReplay');
        this.monitors.addMonitor(this.types.notice_ptt_replay, callback, key);
    }

    noticeIM = (callback, key) => {
        //logger.debug('listener noticeIM');
        this.monitors.addMonitor(this.types.notice_im, callback, key);
    }

    enterGroupNotice = (callback, key) => {
        //logger.debug('listener enterGroupNotice');
        this.monitors.addMonitor(this.types.notice_enter_group, callback, key);
    }

    leaveGroupNotice = (callback, key) => {
        //logger.debug('listener leaveGroupNotice');
        this.monitors.addMonitor(this.types.notice_leave_group, callback, key);
    }

    addGroupMemberNotice = (callback, key) => {
        //logger.debug('listener addGroupMemberNotice');
        this.monitors.addMonitor(this.types.notice_add_grp_mem, callback, key);
    }

    removeGroupMemberNotice = (callback, key) => {
        //logger.debug('listener removeGroupMemberNotice');
        this.monitors.addMonitor(this.types.notice_rem_grp_mem, callback, key);
    }

    groupMemStatusNotice = (callback, key) => {
        //logger.debug('listener groupMemStatusNotice');
        this.monitors.addMonitor(this.types.group_mem_status_notice, callback, key);
    }

    playVideoNotice = (callback, key) => {
        //logger.debug('listener openVideoNotice');
        this.monitors.addMonitor(this.types.notice_play_video, callback, key);
    }

    playVideoRspNotice = (callback, key) => {
        //logger.debug('listener playVideoRspNotice');
        this.monitors.addMonitor(this.types.notice_rsp_play_video, callback, key);
    }

    stopPlayVideoNotice = (callback, key) => {
        //logger.debug('listener stopPlayVideoNotice');
        this.monitors.addMonitor(this.types.notice_stop_play_video, callback, key);
    }

    stopPlayVideoRspNotice = (callback, key) => {
        //logger.debug('listener stopPlayVideoRspNotice');
        this.monitors.addMonitor(this.types.notice_rsp_stop_play_video, callback, key);
    }

    updateVideoSetNotice = (callback, key) => {
        //logger.debug('listener updateVideoSetNotice');
        this.monitors.addMonitor(this.types.notice_update_video_set, callback, key);
    }

    videoMuteNotice = (callback, key) => {
        //logger.debug('listener videoMuteNotice');
        this.monitors.addMonitor(this.types.notice_video_mute, callback, key);
    }

    startVideoConfNotice = (callback, key) => {
        //logger.debug('listener startVideoConfNotice');
        this.monitors.addMonitor(this.types.notice_start_video_conf, callback, key);
    }

    startVideoConfStatusNotice = (callback, key) => {
        //logger.debug('listener startVideoConfStatusNotice');
        this.monitors.addMonitor(this.types.notice_start_video_conf_status, callback, key);
    }

    stopVideoConfNotice = (callback, key) => {
        //logger.debug('listener startVideoConfNotice');
        this.monitors.addMonitor(this.types.notice_stop_video_conf, callback, key);
    }

    shareVideoInVideoConfNotice = (callback, key) => {
        //logger.debug('listener shareVideoInVideoConfNotice');
        this.monitors.addMonitor(this.types.notice_share_video_in_video_conf, callback, key);
    }

    stopShareVideoInVideoConfNotice = (callback, key) => {
        //logger.debug('listener stopShareVideoInVideoConfNotice');
        this.monitors.addMonitor(this.types.notice_stop_share_video_in_video_conf, callback, key);
    }

    webUserLocationNotice = (callback, key) => {
        //logger.debug('listener webUserLocationNotice');
        this.web_notices.webUserLocationNotice = callback;
    }

    noticeWebUserLocation = (uid) => {
        this.web_notices.webUserLocationNotice && this.web_notices.webUserLocationNotice(uid);
    }

    ErrMsg = (callback, key) => {
        //logger.debug('listener ErrMsg');
        this.monitors.addMonitor(this.types.ErrMsg, callback, key);
    }

    dynamicNotice = (msg_code, callback, key) => {
        //logger.debug('monitor dynamicNotice');
        if (!msg_code) {
            logger.warn("msg_code can't be empty,dynamicNotice failed");
            return;
        }
        this.monitors.addMonitor(msg_code, callback, key);
    }

}

export default Listeners;