import Core from './core/core';
import Request from "./client/request";
import Listeners from "./client/listeners";
import logger from "./core/logger";
import Result from "../../websdk-ui/src/tools/result";

class websdk {
    constructor() {
        this.core = new Core();
        this.request = new Request(this.core);
        this.listeners = new Listeners(this.core);
        this.vm = null;
        this.private_cache = {
            login_uid: null,
            login_user: {},
        };
        logger.debug('websdk_core_version: 2020.04.29.01');
    }

    /** @deprecated */
    demo = () => {
        let that = this;
        this.request.authRequest.logon('39.105.135.70', 80, 10, 'websdkcu1', '123456', null, function (rsp) {
            logger.debug('init logon result:{}', rsp);
        }, 'app_demo_logon');//test_req_logon
        that.listeners.userStateNotice(function (rsp) {
            logger.debug('userStateNotice result:{}', rsp);
        });
    }

    /** @deprecated */
    init = (callback) => {
        if (window.websdk.websdkui) { //兼容老版本的API：window.websdk.init();
            return window.websdk.websdkui.init(callback);
        } else {
            callback(this.core.processor.build_rsp_succ(Result.succ));
            return this;
        }
    }

}

// XXX init core, mount to window
window.websdk = new websdk();

export default websdk;
