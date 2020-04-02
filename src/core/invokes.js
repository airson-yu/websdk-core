import logger from "../core/logger";

class Invokes {
    constructor(processor) {
        this.processor = processor;
        this.empty_cbid_code = processor.empty_cbid_code;
    }

    /** --------------sync requests-------------- */

    req_logon = (param, callback, cbid) => {
        //logger.debug('req_logon:{}', param.logon_name);
        this.processor.build_req_send('req_logon', param, callback, cbid);
    }

    req_logout = (param, callback, cbid) => {
        //logger.debug('req_logout:{}', param);
        this.processor.build_req_send('req_logout', param, callback, cbid);
    }

    req_change_passwd = (param, callback, cbid) => {
        //logger.debug('req_change_passwd:{}', param.demander);
        this.processor.build_req_send('req_change_passwd', param, callback, cbid);
        //callback && callback(true);
    }

    req_user_profile = (param, callback, cbid) => {
        //logger.debug('req_user_profile:{}', param.targets);
        !callback && (cbid = this.empty_cbid_code);
        this.processor.build_req_send('req_user_profile', param, callback, cbid);
    }

    req_params_set = (param, callback, cbid) => {
        //logger.debug('req_params_set:{}', param.targets);
        !callback && (cbid = this.empty_cbid_code);
        this.processor.build_req_send('req_params_set', param, callback, cbid);
    }

    req_grp_profile = (param, callback, cbid) => {
        //logger.debug('req_grp_profile:{}', param.target);
        !callback && (cbid = this.empty_cbid_code);
        this.processor.build_req_send('req_grp_profile', param, callback, cbid);
    }

    req_query_history_gps = (param, callback, cbid) => {
        //logger.debug('req_query_history_gps:{}', param.demander);
        !callback && (cbid = this.empty_cbid_code);
        this.processor.build_req_send('req_query_history_gps', param, callback, cbid);
    }

    req_send_im = (param, callback, cbid) => {
        //logger.debug('req_send_im:{}', param.demander);
        !callback && (cbid = this.empty_cbid_code);
        this.processor.build_req_send('req_send_im', param, callback, cbid);
    }

    req_send_file_done = (param, callback, cbid) => {
        //logger.debug('req_send_file_done:{}', param.demander);
        !callback && (cbid = this.empty_cbid_code);
        this.processor.build_req_send('req_send_file_done', param, callback, cbid);
    }

    req_im_list = (param, callback, cbid) => {
        !callback && (cbid = this.empty_cbid_code);
        this.processor.build_req_send('req_im_list', param, callback, cbid);
    }

    req_create_grp = (param, callback, cbid) => {
        !callback && (cbid = this.empty_cbid_code);
        this.processor.build_req_send('req_create_grp', param, callback, cbid);
    }

    req_delete_grp = (param, callback, cbid) => {
        !callback && (cbid = this.empty_cbid_code);
        this.processor.build_req_send('req_delete_grp', param, callback, cbid);
    }

    req_update_video_set = (param, callback, cbid) => {
        //logger.debug('req_update_video_set:{}', param.demander);
        this.processor.build_req_send('req_update_video_set', param, callback, cbid);
        //callback && callback(true);
    }

    req_start_video_conf = (param, callback, cbid) => {
        //logger.debug('req_start_video_conf:{}', param.demander);
        this.processor.build_req_send('req_start_video_conf', param, callback, cbid);
        //callback && callback(true);
    }

    req_stop_video_conf = (param, callback, cbid) => {
        //logger.debug('req_stop_video_conf:{}', param.demander);
        this.processor.build_req_send('req_stop_video_conf', param, callback, cbid);
        //callback && callback(true);
    }

    req_share_video_in_video_conf = (param, callback, cbid) => {
        //logger.debug('req_share_video_in_video_conf:{}', param.demander);
        this.processor.build_req_send('req_share_video_in_video_conf', param, callback, cbid);
        //callback && callback(true);
    }

    req_stop_share_video_in_video_conf = (param, callback, cbid) => {
        //logger.debug('req_stop_share_video_in_video_conf:{}', param.demander);
        this.processor.build_req_send('req_stop_share_video_in_video_conf', param, callback, cbid);
        //callback && callback(true);
    }

    req_get_video_list = (param, callback, cbid) => {
        //logger.debug('req_get_video_list:{}', param.demander);
        this.processor.build_req_send('req_get_video_list', param, callback, cbid);
        //callback && callback(true);
    }

    req_transform_video = (param, callback, cbid) => {
        //logger.debug('req_transform_video:{}', param.demander);
        this.processor.build_req_send('req_transform_video', param, callback, cbid);
        //callback && callback(true);
    }

    /** --------------async requests-------------- */

    /*req_logout = (param, callback, cbid) => {
        //logger.debug('req_emergency_handled:{}', param);
        // XXX XXX 由于目前console不会返回异步消息的ack，web为了做得更通用，直接模拟发送消息发送成功的ack 2019年3月22日11:5:55
        this.processor.build_req_send('req_logon', param);
        callback && callback(true);
    }*/

    /**
     * 仅仅当call type==1 且命令为 req_call时有效。同时web client应该需要设置一个随机的session值，
     * console service会将该session 与 callback id 做个绑定，
     * 当server 回ack 后，会根据ack 中的session id 找到相应的callback id
     * 备注：当 call_type==1时， web client 发起请求（req_call），应该填上session，
     * @param param
     * @param callback
     * @param cbid
     */
    req_call = (param, callback, cbid) => {
        //logger.debug('req_call:', param.demander);
        /*if (param.call_type == 1) {
            !callback && (cbid = this.empty_cbid_code);
            this.processor.build_req_send('req_call', param, callback, cbid);
        } else {
            this.processor.build_req_send('req_call', param);
            callback && callback(true);
        }*/

        this.processor.build_req_send('req_call', param, callback, null, true);
        //callback && callback(true);
    }

    req_emergency_handled = (param, callback, cbid) => {
        //logger.debug('req_emergency_handled:{}', param);
        // XXX XXX 由于目前console不会返回异步消息的ack，web为了做得更通用，直接模拟发送消息发送成功的ack 2019年3月22日11:5:55
        this.processor.build_req_send('req_emergency_handled', param, callback, null, true);
        //callback && callback(true);
    }

    req_query_gps = (param, callback, cbid) => {
        //logger.debug('req_query_gps:{}', param.demander);
        this.processor.build_req_send('req_query_gps', param, callback, null, true);
        //callback && callback(true);
    }

    req_enter_group = (param, callback, cbid) => {
        //logger.debug('req_enter_group:{}', param.demander);
        this.processor.build_req_send('req_enter_group', param, callback, null, true);
        //callback && callback(true);
    }

    req_leave_group = (param, callback, cbid) => {
        //logger.debug('req_leave_group:{}', param.demander);
        this.processor.build_req_send('req_leave_group', param, callback, null, true);
        //callback && callback(true);
    }

    req_force_enter_group = (param, callback, cbid) => {
        //logger.debug('req_force_enter_group:{}', param.demander);
        this.processor.build_req_send('req_force_enter_group', param, callback, null, true);
        //callback && callback(true);
    }

    req_force_leave_group = (param, callback, cbid) => {
        //logger.debug('req_force_leave_group:{}', param.demander);
        this.processor.build_req_send('req_force_leave_group', param, callback, null, true);
        //callback && callback(true);
    }

    req_add_grp_mem = (param, callback, cbid) => {
        //logger.debug('req_add_grp_mem:{}', param.demander);
        this.processor.build_req_send('req_add_grp_mem', param, callback, null, true);
        //callback && callback(true);
    }

    req_rem_grp_mem = (param, callback, cbid) => {
        //logger.debug('req_rem_grp_mem:{}', param.demander);
        this.processor.build_req_send('req_rem_grp_mem', param, callback, null, true);
        //callback && callback(true);
    }

    req_user_state = (param, callback, cbid) => {
        //logger.debug('req_user_state:{}', param.uids);
        // XXX XXX 由于目前console不会返回异步消息的ack，web为了做得更通用，直接模拟发送消息发送成功的ack 2019年3月22日11:5:55
        this.processor.build_req_send('req_user_state', param, callback, null, true);
        //callback && callback(true);
    }

    req_call_status = (param, callback, cbid) => {
        //logger.debug('req_call_status:{}', param.demander);
        this.processor.build_req_send('req_call_status', param, callback, null, true);
        //callback && callback(true);
    }

    req_ptt_on = (param, callback, cbid) => {
        //logger.debug('req_ptt_on:{}', param.demander);
        this.processor.build_req_send('req_ptt_on', param, callback, null, true);
        //callback && callback(true);
    }

    req_ptt_off = (param, callback, cbid) => {
        //logger.debug('req_ptt_off:{}', param.demander);
        this.processor.build_req_send('req_ptt_off', param, callback, null, true);
        //callback && callback(true);
    }

    req_ptt_replay = (param, callback, cbid) => {
        //logger.debug('req_ptt_replay:{}', param.demander);
        this.processor.build_req_send('req_ptt_replay', param, callback, null, true);
        //callback && callback(true);
    }

    req_play_video = (param, callback, cbid) => {
        //logger.debug('req_play_video:{}', param.demander);
        this.processor.build_req_send('req_play_video', param, callback, null, true);
        //callback && callback(true);
    }

    req_stop_play_video = (param, callback, cbid) => {
        //logger.debug('req_stop_video:{}', param.demander);
        this.processor.build_req_send('req_stop_play_video', param, callback, null, true);
        //callback && callback(true);
    }

    req_switch_camera = (param, callback, cbid) => {
        //logger.debug('req_switch_camera:{}', param.demander);
        this.processor.build_req_send('req_switch_camera', param, callback, null, true);
        //callback && callback(true);
    }

    req_video_mute = (param, callback, cbid) => {
        //logger.debug('req_video_mute:{}', param.demander);
        this.processor.build_req_send('req_video_mute', param, callback, null, true);
        //callback && callback(true);
    }

}


export default Invokes;