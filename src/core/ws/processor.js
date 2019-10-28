import WS from './ws';
import Monitors from "../monitors";
import Callbacks from "../callbacks";
import config from "../config";
import Result from "../result";
import logger from "../logger";

class Processor {
    constructor() {
        //this.config = new Config();
        this.config = config;
        /*this.callbackIndex = 0;
        this.callbackArray = new Array(this.config.callbackArraySize);*/
        this.client_callbacks = {};
        this.ws = new WS(this.config, {'processor': this});
        this.monitors = new Monitors(this);
        this.callbacks = new Callbacks(this);
        this.vm = null;
        //this.async_msg_code = '_async_';
        this.empty_cbid_code = '_empty_';
    }

    init = (vm, callback) => {
        this.vm = vm;
        if (!vm) {
            callback && callback(this.build_rsp_fail(Result.view_init_error));
            return;
        }
        if (callback) {
            this.config.init_callback = callback;
        } else {
            this.config.init_callback = null;
        }

        this.config.init_callback && this.config.init_callback(this.build_rsp_succ(Result.succ));
        this.config.init_callback = null;

        //this.ws.init().start();
    }

    init_login = (callback) => {
        this.ws = new WS(this.config, {'processor': this});
        if (callback) {
            this.config.logon_callback = callback;
        } else {
            this.config.logon_callback = null;
        }
        this.ws.init().start();
    }

    // --- xxx codec start ---

    decode = (data) => {
        // str -> json
        return JSON.parse(data);
    }

    encode = (data) => {
        // json -> str
        return JSON.stringify(data);
    }

    // --- xxx codec end ---
    // --- xxx receiver start ---

    receive = (msg) => {
        //logger.info('receive:{}', msg);
        /*logger.debug('receive:{}', msg);
        this.output('<label style="color:orange;">receive:</label>' + msg);*/

        let data = this.decode(msg);

        if (data.msg_code === 'heartbeat') {
            logger.debug('pong');
            return true;
        }

        if (msg.length > 400) {
            let content = msg.substring(0, 200) + ' ...... ' + msg.substring(msg.length - 200, msg.length);
            logger.info('receive:{}', content);
        } else {
            logger.info('receive:{}', msg);
        }

        /*// FIXME FOR TEST
        if (data.msg_code === 'rsp_logon') {
            data.cbid = 'test_req_logon';
        } else if (data.msg_code === 'rsp_user_profile') {
            data.cbid = 'test_req_user_profile';
        } else if (data.msg_code === 'rsp_grp_profile') {
            data.cbid = 'test_req_grp_profile';
        } else if (data.msg_code === 'rsp_logout') {
            data.cbid = 'test_req_logout';
        }*/

        if (data.msg_code === 'rsp_logout') {
            data.msg_code = 'notice_logout';
            data.cmd_type = 2;
            if (null !== window.websdk || undefined !== window.websdk) {
                window.websdk.private_cache.login_uid = 0;
                window.websdk.private_cache.login_user = {};
            }

        } else if (data.msg_code === 'notice_logout') {
            logger.debug('monitor notice_logout');
            websdk.view.resetStateWhenLogout(function (result) {
                logger.debug('notice_logout websdk.view.resetState');
            });

        } else if (data.msg_code === 'rsp_send_im') {
            data.msg_code = 'notice_im';
            data.cmd_type = 2;
            data.sending = true;

        } else if (data.msg_code === 'rsp_logon') {
            //XXX FIXME TEST
            if (data.uid && (null !== window.websdk || undefined !== window.websdk)) {
                window.websdk.login_ing = true;
                websdk.request.userRequest.getUserInfo([data.uid], null, function (rsp) {
                    window.websdk.login_ing = false;
                    if (!rsp.user_info) {
                        return;
                    }
                    let target = rsp.user_info[0];
                    window.websdk.private_cache.login_uid = data.uid;
                    window.websdk.private_cache.login_user = target;
                    window.websdk.private_cache.ipaddr = data.ipaddr;
                    window.websdk.private_cache.port = data.port;
                    window.websdk.private_cache.token = data.token;
                    window.websdk.private_cache.upload_url_gfile =
                        'http://' + data.ipaddr + ':' + data.port + '/rtv/api/v1/file/chunk_upload?' +
                        'type=gfile&token=' + data.token + '&uid=' + data.uid;
                    if (!data.ipaddr) {
                        logger.warn('rsp_logon ipaddr empty');
                    }

                }, 'req_user_profile_processor_logon');//
            }

        } else if (data.msg_code === 'rsp_query_gps') {
            data.msg_code = 'notice_gps';
            data.cmd_type = 2;

        } else if (data.msg_code === 'rsp_params_set') {
            data.msg_code = 'notice_params_set';
            data.cmd_type = 2;

        } else if (data.msg_code === 'rsp_play_video') {
            data.msg_code = 'notice_rsp_play_video';
            data.cmd_type = 2;

        } else if (data.msg_code === 'rsp_stop_play_video') {
            data.msg_code = 'notice_rsp_stop_play_video';
            data.cmd_type = 2;

        } else if (data.msg_code === 'rsp_share_video_in_video_conf' && !data.cbid) {
            logger.debug('ignore self rsp_share_video_in_video_conf:{}', data);
            return;
        }

        if (data.cmd_type === 1 && data.cbid) {
            // receive response

            /*// FIXME ME FOR TEST
            if (data.msg_code === 'rsp_user_profile') {
                data.cbid = 'test_get_user_profile';
            }*/

            //if (data.index || data.index === 0) {
            //if (data.session || data.index || data.session === 0 || data.index === 0) {
            if (data.cbid) {

                if (data.cbid === this.empty_cbid_code) {
                    logger.debug('rsp_no_cb');
                    return false;
                }

                //let index = data.session || data.index;
                /*let index = data.index;
                if (data.session || data.session === 0) {
                    index = data.session;
                }
                let callback = this.callbackArray[index];*/
                let callback = this.client_callbacks[data.cbid];
                // XXX 这里可以考虑封装一层，过滤一下数据再调用回调，目前是使用原始返回数据直接回调
                // XXX 创建一个receiver类，每个接口对应一个receive方法，处理数据后调用回调
                //callback && callback(data);
                let func = this.callbacks[data.msg_code];
                if (!func) {
                    //logger.warn('unknown response:{}', data);
                    logger.warn('unknown response:{}', data);
                    return false;
                }
                func(data, callback);
            }

        } else if (data.cmd_type === 2 || (data.cmd_type === 1 && !data.cbid)) {
            // receive notification
            //let func = this.monitors.functions[data.msg_code];
            let func = this.monitors[data.msg_code];
            if (!func) {
                //logger.warn('unknown notice:{}', data);
                logger.warn('unknown notice:{}', data);
                return false;
            }
            func(data);
        }

    }

    // --- xxx receiver end ---
    // --- xxx sender start ---

    send = (data, callback, cbid, async) => {
        if (null === data || undefined === data) {
            data = {};
        }
        /*if (callback) {
            let index = this.callbackIndex;
            if (index >= (this.config.callbackArraySize - 1)) {
                index = 0;
            }
            data.index = index;
            data.session = index;
            // callbackParam主要是用于请求操作中未处理完的逻辑，需要在回调中继续处理
            this.callbackArray[index] = callback;
            this.callbackIndex = ++index;
        }*/

        /*callback && callback(this.build_rsp_fail(Result.no_login));
        logger.warn('{success: false, code: 10104, desc: "尚未登录"}');
        return false;*/

        if (!window.websdk.private_cache.login_uid && data.msg_code !== 'req_logon' && !window.websdk.login_ing) {
            logger.warn('{success: false, code: 10104, desc: "尚未登录"}');
            callback && callback(this.build_rsp_fail(Result.no_login));
            return false;
        }

        if (cbid === this.empty_cbid_code) {
            data.cbid = cbid;
        } else if (callback && cbid) {
            data.cbid = cbid;
            this.client_callbacks[cbid] = callback;
        }

        let msg = this.encode(data);

        logger.info('send:{}', msg);
        /*logger.debug('send:{}', msg);
        this.output('<label style="color:#2bd42b;">send:</label>' + msg);*/

        this.ws.socket.send(msg);

        // 异步调用，先同步回ack然后再等通知
        async && callback && callback(true);

        return true;

        /*// XXX TEST
        let wsmock = this.ws;
        let that = this;
        setTimeout(function () {
            wsmock.onMessage({'data': msg});
            let data = that.decode(msg);
            data.cmd_type = 2;
            data.msg_code = 'notice_emergency';
            msg = that.encode(data);
            wsmock.onMessage({'data': msg});
        }, 1000);*/

    }

    // --- xxx sender end ---

    // --- xxx message start ---

    /**
     */
    build_req_send = (msg_code, param, callback, cbid, async) => {
        if (msg_code == 'req_logon') {
            let that = this;
            if (window.websdk.private_cache.login_uid) {
                logger.warn('{success: false, code: 10105, desc: "已经登录"}');
                callback && callback(this.build_rsp_fail(Result.already_login));
                return false;
            }
            that.init_login(function (ws_result) {
                that.send(that.build_request(msg_code, param), callback, cbid, async);
            });
        } else if (msg_code == 'req_logout') {
            logger.debug('req_logout destroy ui');
            websdk.view.resetStateWhenLogout(function (result) {
                logger.debug('req_logout websdk.view.resetState');
            });
            return this.send(this.build_request(msg_code, param), callback, cbid, async);
        } else {
            return this.send(this.build_request(msg_code, param), callback, cbid, async);
        }
        return true;
    }

    build_request = (msg_code, param) => {
        if (undefined === param || null === param) {
            return {'msg_code': msg_code, 'cmd_type': 0, 'session': 0};
        } else {
            param.msg_code = msg_code;
            param.cmd_type = 0;
            //param.index = 0;
            param.session = 0;
            return param;
        }
    }

    build_response = (data) => {
        //TODO transfer common fields
        if (data.cmd_status === 0) {
            data.success = true;
            data.code = Result.succ.code;
            data.desc = Result.succ.desc;
        } else {
            data.success = false;
            data.code = Result.fail.code;
            data.desc = data.error_reason;
        }
        return data;
    }

    build_rsp_succ = (data) => {
        if (undefined === data || null === data) {
            return {'success': true, 'code': Result.succ.code, 'desc': Result.succ.desc};
        } else {
            data.code = Result.succ.code;
            data.desc = Result.succ.desc;
            return data;
        }
    }

    build_rsp_fail = (obj) => {
        if (!obj) {
            obj = Result.fail;
        }
        return {'success': false, 'code': obj.code, 'desc': obj.desc};
    }

    build_notice() {

    }

    // --- xxx message end ---


}

export default Processor;