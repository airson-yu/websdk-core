import Core from './core/core';
import Request from "./client/request";
import Listeners from "./client/listeners";
import logger from "./core/logger";

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
        logger.debug('websdk_core_version: R08.00.38,date: 20201218');

        //replace_local_ip_for_ie: append activeX node @see processor.js constructor
        window.is_ie = false;
        if (!!window.ActiveXObject || "ActiveXObject" in window) { //ie
            window.is_ie = true;
            logger.debug('append activeX node for ie');
            //let dom = '<OBJECT id="object_ip" classid="CLSID:E5677E67-EE60-49F1-B5E9-54CBF1C3178E"></OBJECT>';
            let node = document.createElement('OBJECT');
            node.setAttribute('id', 'ie_object_ip');
            node.setAttribute('classid', 'CLSID:E5677E67-EE60-49F1-B5E9-54CBF1C3178E');
            node.style.visibility = 'hidden';
            node.style.position = 'absolute';
            node.style.top = '-200px';
            document.body.appendChild(node);
        }
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
        let that = this;
        if (window.websdk.websdkui) { //兼容老版本的API：window.websdk.init();
            logger.debug("websdkui.init");
            return window.websdk.websdkui.init(callback);
        } else {
            if (window.is_ie) {
                logger.debug('websdkcore init delay for ie');
                setTimeout(function () {
                    that.core.processor.replace_local_ip_for_ie();//replace_local_ip_for_ie
                    //callback(that.core.processor.build_rsp_succ(Result.succ));
                    that.core.processor.init(null, callback);
                }, 0);// 0 is necessary

            } else {
                //callback(that.core.processor.build_rsp_succ(Result.succ));
                that.core.processor.init(null, callback);
            }
            return that;
        }
    }

}

// XXX init core, mount to window
window.websdk = new websdk();

export default websdk;
