class Callbacks {
    constructor(processor) {
        this.processor = processor;
    }

    rsp_logon = (data, callback) => {
        //logger.debug('rsp_logon:{}', data);
        if (callback) {
            /*let param = {'cmd_status': data.cmd_status, 'console_name': data.console_name, 'error_reason': data.error_reason};
            callback(this.processor.build_response(param));*/
            callback(this.processor.build_response(data));
        }
    }

    rsp_logout = (data, callback) => {
        //logger.debug('rsp_logout:{}', data);
        if (callback) {
            /*let param = {'reason': data.reason};
            callback(this.processor.build_response(param));*/
            callback(this.processor.build_response(data));
        }
    }

    rsp_change_passwd = (data, callback) => {
        //logger.debug('rsp_change_passwd:{}', data);
        if (callback) {
            /*let param = {'reason': data.reason};
            callback(this.processor.build_response(param));*/
            callback(this.processor.build_response(data));
        }
    }

    rsp_user_profile = (data, callback) => {
        //logger.debug('rsp_user_profile:{}', data);
        if (callback) {
            /*let param = {'cmd_status': data.cmd_status, 'error_reason': data.error_reason, 'user_info': data.user_info};
            callback(this.processor.build_response(param));*/
            callback(this.processor.build_response(data));
        }
    }

    rsp_grp_profile = (data, callback) => {
        //logger.debug('rsp_grp_profile:{}', data);
        if (callback) {
            /*let param = {'cmd_status': data.cmd_status, 'cmd_error': data.cmd_error, 'group_info': data.group_info};
            callback(this.processor.build_response(param));*/
            callback(this.processor.build_response(data));
        }
    }

    rsp_params_set = (data, callback) => {
        //logger.debug('rsp_params_set:{}', data);
        if (callback) {
            /*let param = {
                'cmd_status': data.cmd_status,
                'cmd_error': data.cmd_error,
                'uids': data.uids,
                'target': data.target,
                'paraminfo': data.paraminfo
            };
            callback(this.processor.build_response(param));*/
            callback(this.processor.build_response(data));
        }
    }

    rsp_user_state = (data, callback) => {
        //logger.debug('rsp_user_state:{}', data);
        if (callback) {
            /*let param = {'target': data.target, 'states': data.states};
            callback(this.processor.build_response(param));*/
            callback(this.processor.build_response(data));
        }
    }

    rsp_add_admin_users = (data, callback) => {
        //logger.debug('rsp_add_admin_users:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_create_grp = (data, callback) => {
        //logger.debug('rsp_create_grp:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_delete_grp = (data, callback) => {
        //logger.debug('rsp_create_grp:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_query_gps = (data, callback) => {
        //logger.debug('rsp_query_gps:{}', data);
        if (callback) {
            /*let param = {
                'uid': data.uid,
                'target': data.target,
                'status': data.status,
                'point': data.point
            };
            callback(this.processor.build_response(param));*/
            callback(this.processor.build_response(data));
        }
    }

    rsp_query_history_gps = (data, callback) => {
        //logger.debug('rsp_query_history_gps:{}', data);
        if (callback) {
            /*let param = {
                'uid': data.uid,
                'target': data.target,
                'status': data.status,
                'error': data.error,
                'total': data.total,
                'points': data.points
            };
            callback(this.processor.build_response(param));*/
            callback(this.processor.build_response(data));
        }
    }

    rsp_im_list = (data, callback) => {
        //logger.debug('rsp_im_list:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_play_video = (data, callback) => {
        //logger.debug('rsp_play_video:{}', data);
        if (callback) {
            /*let param = {
                'cmd_status': data.cmd_status,
                'target': data.target,
                'session': data.session,
                'channel': data.channel,
                'resolution': data.resolution,
                'camera': data.camera
            };
            callback(this.processor.build_response(param));*/
            callback(this.processor.build_response(data));
        }
    }

    rsp_stop_video = (data, callback) => {
        //logger.debug('rsp_stop_video:{}', data);
        if (callback) {
            /*let param = {
                'cmd_status': data.cmd_status,
                'target': data.target,
                'session': data.session
            };
            callback(this.processor.build_response(param));*/
            callback(this.processor.build_response(data));
        }
    }

    rsp_update_video_set = (data, callback) => {
        //logger.debug('rsp_update_video_set:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_start_video_conf = (data, callback) => {
        //logger.debug('rsp_start_video_conf:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_stop_video_conf = (data, callback) => {
        //logger.debug('rsp_stop_video_conf:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_share_video_in_video_conf = (data, callback) => {
        //logger.debug('rsp_share_video_in_video_conf:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_stop_share_video_in_video_conf = (data, callback) => {
        //logger.debug('rsp_stop_share_video_in_video_conf:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_get_video_list = (data, callback) => {
        //logger.debug('rsp_get_video_list:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_transform_video = (data, callback) => {
        //logger.debug('rsp_transform_video:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_get_push_video_users = (data, callback) => {
        //logger.debug('rsp_get_push_video_users:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_get_audio_list = (data, callback) => {
        //logger.debug('rsp_get_audio_list:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

    rsp_transform_audio = (data, callback) => {
        //logger.debug('rsp_transform_audio:{}', data);
        if (callback) {
            callback(this.processor.build_response(data));
        }
    }

}

export default Callbacks;