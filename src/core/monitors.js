import logger from "./logger";
import CacheTools from "./cache_tools";

class Monitors {
    constructor(processor) {
        this.processor = processor;
        // msg_code is the key
        this.functions = {};
    }

    addMonitor = (type, callback, key) => {
        if (!key) {
            key = 'base';
        }
        logger.debug('add monitor:{}-{}', type, key);
        if (!this.functions[type]) {
            this.functions[type] = {name: type};
        }
        this.functions[type][key] = callback;
    }

    removeMonitor = (type, key) => {
        if (!key) {
            key = 'base';
        }
        logger.debug('remove monitor:{}-{}', type, key);
        if (key === '_all') {
            delete this.functions[type];
            return;
        }
        if (!this.functions[type]) {
            return;
        }
        delete this.functions[type][key];
    }

    executeMonitor = (monitor_obj, data) => {
        if (!monitor_obj) {
            return;
        }
        for (let key in monitor_obj) {
            if (key === 'name') {
                continue;
            }
            logger.debug('execute monitor:{}-{}', monitor_obj.name, key);
            monitor_obj[key](data);
        }
    }

    notice_logon = (data) => {
        //logger.debug('monitor notice_logon');
        if (this.functions.notice_logon) {
            this.executeMonitor(this.functions.notice_logon, data);
        }
    }

    notice_logout = (data) => {
        //logger.debug('monitor notice_logout1');
        if (this.functions.notice_logout) {
            /*let param = {'reason': data.reason};
            this.functions.notice_logout(param);*/
            //this.functions.notice_logout(data);
            this.executeMonitor(this.functions.notice_logout, data);
        }
    }

    notice_emergency = (data) => {
        //logger.debug('monitor notice_emergency');
        if (this.functions.notice_emergency) {
            /*let param = {'uid': data.uid, 'target:': data.target, 'timestamp': data.timestamp, 'notes': data.notes};
            this.functions.notice_emergency(param);*/
            //this.functions.notice_emergency(data);
            this.executeMonitor(this.functions.notice_emergency, data);
        }
    }

    notice_emergency_handled = (data) => {
        //logger.debug('monitor notice_emergency_handled');
        if (this.functions.notice_emergency_handled) {
            /*let param = {'uid': data.uid, 'processor:': data.processor, 'timestamp': data.timestamp, 'ack_type': data.ack_type};
            this.functions.notice_emergency_handled(param);*/
            //this.functions.notice_emergency_handled(data);
            this.executeMonitor(this.functions.notice_emergency_handled, data);
        }
    }

    notice_user_profile = (data) => {
        //logger.debug('monitor notice_user_profile');
        if (this.functions.notice_user_profile) {
            /*let param = {'user_info': data.user_info};
            this.functions.notice_user_profile(param);*/
            //this.functions.notice_user_profile(data);
            this.executeMonitor(this.functions.notice_user_profile, data);
        }
    }

    notice_params_set = (data) => {
        //logger.debug('monitor notice_params_set');
        if (this.functions.notice_params_set) {
            /*let param = {'targets': data.targets, 'paraminfo': data.paraminfo};
            this.functions.notice_params_set(param);*/
            //this.functions.notice_params_set(data);
            this.executeMonitor(this.functions.notice_params_set, data);
        }
    }

    notice_user_state = (data) => {
        //logger.debug('monitor notice_user_state');
        if (this.functions.notice_user_state) {
            /*let param = {'target': data.target, 'states': data.states};
            this.functions.notice_user_state(param);*/
            //this.functions.notice_user_state(data);
            this.executeMonitor(this.functions.notice_user_state, data);
        }
    }

    notice_gps = (data) => {
        //logger.debug('monitor notice_gps');
        if (this.functions.notice_gps) {
            /*let param = {'uid': data.uid, 'points': data.points};
            this.functions.notice_gps(param);*/
            //this.functions.notice_gps(data);
            this.executeMonitor(this.functions.notice_gps, data);
        }
    }

    notice_query_gps = (data) => {
        //logger.debug('monitor notice_query_gps');
        if (this.functions.notice_query_gps) {
            /*let param = {'uid': data.uid, 'points': data.points};
            this.functions.notice_gps(param);*/
            //this.functions.notice_gps(data);
            this.executeMonitor(this.functions.notice_query_gps, data);
        }
    }

    notice_call_status = (data) => {
        //logger.debug('monitor notice_call_status');
        if (this.functions.notice_call_status) {
            /*let param = {
                'demander': data.demander,
                'target': data.target,
                'channel': data.channel,
                'call_type': data.call_type,
                'status': data.status
            };
            this.functions.notice_call_status(param);*/
            //this.functions.notice_call_status(data);
            this.executeMonitor(this.functions.notice_call_status, data);
        }
    }

    notice_ptt_status = (data) => {
        //logger.debug('monitor notice_ptt_status');
        if (this.functions.notice_ptt_status) {
            /*let param = {'tgid': data.tgid, 'status': data.status, 'callerid': data.callerid, 'reason': data.reason};
            this.functions.notice_ptt_status(param);*/
            //this.functions.notice_ptt_status(data);
            this.executeMonitor(this.functions.notice_ptt_status, data);
        }
    }

    notice_ptt_replay = (data) => {
        //logger.debug('monitor notice_ptt_replay');
        if (this.functions.notice_ptt_replay) {
            /*let param = {'tgid': data.tgid, 'state': data.state, 'refid': data.refid};
            this.functions.notice_ptt_replay(param);*/
            //this.functions.notice_ptt_replay(data);
            this.executeMonitor(this.functions.notice_ptt_replay, data);
        }
    }

    notice_im = (data) => {
        //logger.debug('monitor notice_im');
        if (this.functions.notice_im) {
            this.executeMonitor(this.functions.notice_im, data);
        }
    }

    notice_enter_group = (data) => {
        //logger.debug('monitor notice_enter_group');
        if (this.functions.notice_enter_group) {
            /*let param = {'demander': data.demander, 'tgid': data.tgid, 'mute': data.mute};
            this.functions.notice_enter_group(param);*/
            //this.functions.notice_enter_group(data);
            this.executeMonitor(this.functions.notice_enter_group, data);
        }
    }

    notice_leave_group = (data) => {
        //logger.debug('monitor notice_leave_group');
        if (this.functions.notice_leave_group) {
            /*let param = {'demander': data.demander, 'tgid': data.tgid};
            this.functions.notice_leave_group(param);*/
            //this.functions.notice_leave_group(data);
            this.executeMonitor(this.functions.notice_leave_group, data);
        }
    }

    notice_add_grp_mem = (data) => {
        //logger.debug('monitor notice_add_grp_mem');
        if (this.functions.notice_add_grp_mem) {
            /* let param = {'tgid': data.tgid, 'uids': data.uids};
             this.functions.notice_add_grp_mem(param);*/
            if (data.tgId) {
                data.tgid = data.tgId;
            }
            //this.functions.notice_add_grp_mem(data);
            this.executeMonitor(this.functions.notice_add_grp_mem, data);
        }
    }

    notice_rem_grp_mem = (data) => {
        //logger.debug('monitor notice_rem_grp_mem');
        if (this.functions.notice_rem_grp_mem) {
            /*let param = {'tgid': data.tgid, 'uids': data.uids};
            this.functions.notice_rem_grp_mem(param);*/
            if (data.tgId) {
                data.tgid = data.tgId;
            }
            //this.functions.notice_rem_grp_mem(data);
            this.executeMonitor(this.functions.notice_rem_grp_mem, data);
        }
    }

    //eceive: {"tgid":74753,"canPtt":0,"changedUsers":[{"uid":68508,"state":1}],
    //"msg_code":"group_mem_status_notice","cmd_type":2,"session":0,"cmd_status":0,"error_reason":null,"cbid":null}
    group_mem_status_notice = (data) => {
        //logger.debug('monitor group_mem_status_notice');
        if (this.functions.group_mem_status_notice) {
            /*let param = {'tgid': data.tgid, 'canPtt': data.canPtt, 'changedUsers': data.changedUsers};
            this.functions.group_mem_status_notice(param);*/
            if (data.tgId) {
                data.tgid = data.tgId;
            }
            //this.functions.group_mem_status_notice(data);
            this.executeMonitor(this.functions.group_mem_status_notice, data);
        }
    }

    notice_play_video = (data) => {
        //logger.debug('monitor notice_play_video');
        if (this.functions.notice_play_video) {
            /*let param = {
                'demander': data.demander,
                'target': data.target,
                'session': data.session,
                'channel': data.channel,
                'resolution': data.resolution,
                'camera': data.camera
            };
            this.functions.notice_play_video(param);*/
            //this.functions.notice_play_video(data);
            this.executeMonitor(this.functions.notice_play_video, data);
        }
    }

    notice_rsp_play_video = (data) => {
        //logger.debug('monitor notice_rsp_play_video');
        if (this.functions.notice_rsp_play_video) {
            this.executeMonitor(this.functions.notice_rsp_play_video, data);
        }
    }

    notice_stop_play_video = (data) => {
        //logger.debug('monitor notice_stop_play_video');
        if (this.functions.notice_stop_play_video) {
            /*let param = {
                'demander': data.demander,
                'target': data.target,
                'session': data.session,
                'channel': data.channel,
                'camera': data.camera
            };
            this.functions.notice_stop_play_video(param);*/
            //this.functions.notice_stop_play_video(data);
            this.executeMonitor(this.functions.notice_stop_play_video, data);
        }
    }

    notice_rsp_stop_play_video = (data) => {
        //logger.debug('monitor notice_rsp_stop_play_video');
        if (this.functions.notice_rsp_stop_play_video) {
            this.executeMonitor(this.functions.notice_rsp_stop_play_video, data);
        }
    }

    notice_update_video_set = (data) => {
        //logger.debug('monitor notice_update_video_set');
        if (this.functions.notice_update_video_set) {
            this.executeMonitor(this.functions.notice_update_video_set, data);
        }
    }

    notice_video_mute = (data) => {
        //logger.debug('monitor notice_video_mute');
        if (this.functions.notice_video_mute) {
            this.executeMonitor(this.functions.notice_video_mute, data);
        }
    }

    notice_start_video_conf = (data) => {
        //logger.debug('monitor notice_start_video_conf');
        if (this.functions.notice_start_video_conf) {
            this.executeMonitor(this.functions.notice_start_video_conf, data);
        }
    }

    notice_start_video_conf_status = (data) => {
        //logger.debug('monitor notice_start_video_conf_status');
        if (this.functions.notice_start_video_conf_status) {
            this.executeMonitor(this.functions.notice_start_video_conf_status, data);
        }
    }

    notice_stop_video_conf = (data) => {
        //logger.debug('monitor notice_stop_video_conf');
        if (this.functions.notice_stop_video_conf) {
            this.executeMonitor(this.functions.notice_stop_video_conf, data);
        }
    }

    notice_share_video_in_video_conf = (data) => {
        //logger.debug('monitor notice_share_video_in_video_conf');
        if (this.functions.notice_share_video_in_video_conf) {
            this.executeMonitor(this.functions.notice_share_video_in_video_conf, data);
        }
    }

    notice_stop_share_video_in_video_conf = (data) => {
        //logger.debug('monitor notice_stop_share_video_in_video_conf');
        if (this.functions.notice_stop_share_video_in_video_conf) {
            this.executeMonitor(this.functions.notice_stop_share_video_in_video_conf, data);
        }
    }

    ErrMsg = (data) => {
        if (data.cmd_status == 52001) { //service提示尚未登录，清空登录缓存
            logger.debug("monitor ErrMsg-52001, clear_login_cache");
            CacheTools.clear_login_cache();
        } else {
            logger.warn('monitor ErrMsg:{}', data);
        }
        if (this.functions.ErrMsg) {
            //this.functions.ErrMsg(data);
            this.executeMonitor(this.functions.ErrMsg, data);
        }
    }

    notice_dynamic = (data) => {
        //logger.debug('monitor notice_dynamic');
        let msg_code = data.msg_code;
        if (this.functions[msg_code]) {
            logger.debug("notice_dynamic:{}", data);
            this.executeMonitor(this.functions[msg_code], data);
        }
    }

}

export default Monitors;