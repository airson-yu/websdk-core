import WS from './ws';
import Monitors from "../monitors";
import Callbacks from "../callbacks";
import config from "../config";
import Result from "../result";
import logger from "../logger";
import CacheTools from "../cache_tools";

class Processor {
    constructor() {
        logger.debug("processor construct");
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
        this.init_status = 1;//1未初始化，2初始化未完成，3初始化完成
        this.init_ws_alone_status = 1;//1未初始化，2初始化未完成，3初始化完成
    }

    replace_local_ip_for_ie = () => {
        let ip = window.ie_object_ip.GetLocalIpAddr();
        this.config.ws_url = this.config.ws_url.replace('localhost', ip);
        logger.debug('replace_local_ip_for_ie:{}', ip);
    }

    init = (vm, callback) => {
        logger.debug('start init');
        this.init_status = 2;// init ing
        setTimeout(function () {
            that.init_status = 3;//防止异常情况下始终提示尚未初始化完成
        }, 10000);
        let that = this;
        if (vm) {
            that.vm = vm;
        } else {
            logger.debug("init without vm");//core和ui都会执行init
            //callback && callback(that.build_rsp_fail(Result.view_init_error));
            //return;
        }

        let need_init_ws = false;
        if (CacheTools.check_login_from_cache()) {
            logger.debug("init need_init_ws");
            need_init_ws = true;
        } else if (CacheTools.check_login_from_local_storage()) {
            logger.debug("init need_init_ws and load_cache_from_local_storage");
            CacheTools.load_cache_from_local_storage();
            need_init_ws = true;
        } else {
            logger.debug("init no_need_init_ws");
        }

        if (need_init_ws && this.ws.established) {
            need_init_ws = false;
            logger.debug('ws.established, need_init_ws change to false');
        }

        need_init_ws && this.ws.init().start();

        // do callback
        if (callback) {
            that.config.init_callback = callback;
        } else {
            that.config.init_callback = null;
        }

        if (that.ws.received_first_pong) {
            that.init_status = 3;//init done
            logger.debug('init_done trigger callback');
            that.config.init_callback && that.config.init_callback(that.build_rsp_succ(Result.succ));
            that.config.init_callback = null;
        } else if (need_init_ws) {
            // wait first_pong then trigger init_callback
            logger.debug('wait first_pong then trigger init_callback');
        } else {
            // no need_init_ws
            that.init_status = 3;
            logger.debug('no_need_init_ws init_done');
        }
    }

    init_ws_alone = (callback) => {
        let that = this;
        that.init_ws_alone_status = 2;
        setTimeout(function () {
            that.init_ws_alone_status = 3;//防止异常情况下始终提示尚未初始化完成
        }, 10000);
        logger.debug("init_ws_alone start");
        that.ws = new WS(that.config, {'processor': that});
        that.ws.received_first_pong = false;
        if (callback) {
            that.config.logon_callback = callback;
        } else {
            that.config.logon_callback = null;
        }
        that.ws.init().start();
        logger.debug('init_ws_alone done, wait first_pong then trigger init_callback');
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

    clear_cache = (that, reset_ui, close_ws) => {
        if (reset_ui) {
            logger.debug('processor clear_cache reset_ui');
            let resetView = window.websdk.view && window.websdk.view.resetStateWhenLogout;
            // eslint-disable-next-line no-unused-vars
            resetView && window.websdk.view.resetStateWhenLogout(function (result) {
                logger.debug('logout websdk.view.resetState');
            });
        }

        CacheTools.clear_login_cache();

        if (close_ws) {
            logger.debug('processor clear_cache close_ws just_check');
            if (that.ws.socket) {
                logger.debug('processor clear_cache ws.destroy');
                that.ws.destroy()
            }
        }
    }

    handle_receive_logout = (that, data) => {
        if (data.msg_code === 'rsp_logout') { //req_logout 已经调用 resetStateWhenLogout
            data.msg_code = 'notice_logout';
            data.cmd_type = 2;
            logger.debug('processor rsp_logout handle_receive_logout will clear_cache');
            that.clear_cache(that, false, true);

        } else if (data.msg_code === 'notice_logout' || (data.msg_code === 'notice_logon' && data.cmd_status == 2)) {// 已在其他设备登录
            //logger.debug('monitor notice_logout');
            logger.debug('processor notice_logout handle_receive_logout will clear_cache');
            that.clear_cache(that, true, true);
        }
    }

    handle_receive_logon = (data) => {
        window.websdk.login_ing = false;
        if (data.cmd_status !== 0) {
            logger.warn('rsp_logon fail');

        } else if (data.uid && (null !== window.websdk || undefined !== window.websdk)) {
            window.websdk.login_ing = true;
            window.websdk.request.userRequest.getUserInfo([data.uid], null, function (rsp) {
                window.websdk.login_ing = false;
                if (!rsp.user_info) {
                    return;
                }

                CacheTools.save_login_cache(data, rsp);

            }, 'req_user_profile_processor_logon');//
        }
    }

    receive = (msg) => {
        //logger.info('receive:{}', msg);
        /*logger.debug('receive:{}', msg);
        this.output('<label style="color:orange;">receive:</label>' + msg);*/

        let that = this;

        let data = that.decode(msg);

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

        if (data.msg_code === 'rsp_logout') { //req_logout 已经调用 resetStateWhenLogout
            that.handle_receive_logout(that, data);

        } else if (data.msg_code === 'notice_logout' || (data.msg_code === 'notice_logon' && data.cmd_status == 2)) {// 已在其他设备登录
            that.handle_receive_logout(that, data);

        } else if (data.msg_code === 'rsp_logon') {
            that.handle_receive_logon(data);

        } else if (data.msg_code === 'rsp_send_im') {
            data.msg_code = 'notice_im';
            data.cmd_type = 2;
            data.sending = true;

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
        let that = this;
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

        if (that.init_status == 1) {
            logger.info('send fail:{}', data);
            logger.warn('{success: false, code: 10106, desc: "尚未执行初始化"}');
            callback && callback(that.build_rsp_fail(Result.no_init));
            return false;
        } else if (that.init_status == 2) {
            logger.info('send fail:{}', data);
            logger.warn('{success: false, code: 10107, desc: "初始化尚未完成"}');
            callback && callback(that.build_rsp_fail(Result.init_not_done));
            return false;
        }

        if (!CacheTools.check_login_from_cache() && !CacheTools.check_login_ing_from_cache() &&
            data.msg_code !== 'req_logon' && data.msg_code !== 'req_logout') {
            // 缓存中没有登录信息，再检查localStorage中是否有登录信息
            let cache_exist = CacheTools.load_cache_from_local_storage();
            if (!cache_exist) {
                logger.info('send fail:{}', data);
                logger.warn('{success: false, code: 10104, desc: "尚未登录"}');
                callback && callback(that.build_rsp_fail(Result.no_login));
                return false;
            }
        }

        if (cbid === that.empty_cbid_code) {
            data.cbid = cbid;
        } else if (callback && cbid) {
            data.cbid = cbid;
            that.client_callbacks[cbid] = callback;
        }

        let msg = that.encode(data);

        logger.info('send:{}', msg);
        /*logger.debug('send:{}', msg);
        this.output('<label style="color:#2bd42b;">send:</label>' + msg);*/

        that.ws.socket.send(msg);

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
        let that = this;

        if (that.init_status == 1) {
            logger.warn('{success: false, code: 10106, desc: "尚未执行初始化"}');
            callback && callback(that.build_rsp_fail(Result.no_init));
            return false;
        } else if (that.init_status == 2) {
            logger.warn('{success: false, code: 10107, desc: "初始化尚未完成"}');
            callback && callback(that.build_rsp_fail(Result.init_not_done));
            return false;
        }

        // XXX 重复logon的检查交由service来检查 2020年09月04日15:44:57
        if (msg_code == 'req_logout') {
            //logger.debug('req_logout destroy ui');
            logger.debug('processor req_logout will clear_cache');
            that.clear_cache(that, true, false);
        }
        if (that.ws.established) {
            return that.send(that.build_request(msg_code, param), callback, cbid, async);
        } else {
            logger.debug('start ws first, then send request');
            that.init_ws_alone(() => {
                that.send(that.build_request(msg_code, param), callback, cbid, async);
            });
        }

        /*if (msg_code == 'req_logon') {
            if (CacheTools.check_login_from_cache()) {
                logger.warn('{success: false, code: 10105, desc: "已经登录"}');
                callback && callback(this.build_rsp_fail(Result.already_login));
                return false;
            }
            logger.debug('processor req_logon will clear_cache');
            that.clear_cache(that, false, true); // 先注销ws，再创建新的
            // eslint-disable-next-line no-unused-vars
            that.init_login(ws_result => {
                that.send(that.build_request(msg_code, param), callback, cbid, async);
            });
        } else if (msg_code == 'req_logout') {
            //logger.debug('req_logout destroy ui');
            logger.debug('processor req_logout will clear_cache');
            that.clear_cache(that, true, false);
            return that.send(that.build_request(msg_code, param), callback, cbid, async);
        } else {
            if (that.ws.established) {
                return that.send(that.build_request(msg_code, param), callback, cbid, async);
            } else {
                logger.debug('start ws first, then send request');
                that.init_login(() => {
                    that.send(that.build_request(msg_code, param), callback, cbid, async);
                });
            }
        }*/
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