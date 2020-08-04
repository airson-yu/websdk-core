import logger from "./logger";

class CacheTools {
    constructor() {
    }

    static save_login_cache = (data, rsp) => {
        let target = rsp.user_info[0];
        window.websdk.private_cache.login_uid = data.uid;
        window.websdk.private_cache.login_user = target;
        window.websdk.private_cache.ipaddr = data.ipaddr;
        window.websdk.private_cache.port = data.port;
        window.websdk.private_cache.token = data.token;
        window.websdk.private_cache.clientid = data.clientid;// session key
        window.websdk.private_cache.client_alive_time = data.client_alive_time; // session alive time after close ws
        window.websdk.private_cache.client_login_time = new Date().getTime();
        let url_host = 'http://' + data.ipaddr + ':' + data.port;
        window.websdk.private_cache.upload_url_gfile =
            url_host + '/rtv/api/v1/file/chunk_upload?type=gfile&token=' + data.token + '&uid=' + data.uid;
        /*window.websdk.private_cache.upload_url_gfile =
            url_host + '/rtv/api/v1/gps/get_gps_trace?token=' + data.token + '&uid=' + data.uid;
        window.websdk.private_cache.get_remote_video_url =
            url_host + '/data/api/video/list?token=' + data.token + '&consoleId=' + data.uid;
        window.websdk.private_cache.transform_video_url =
            url_host + '/data/api/transformVideo?token=' + data.token + '&consoleId=' + data.uid;*/
        if (!data.ipaddr) {
            logger.warn('rsp_logon ipaddr empty');
        }

        // cache to localStorage
        if (window.localStorage) {
            logger.debug('save websdk_private_cache to localStorage');
            window.localStorage.setItem("websdk_private_cache", JSON.stringify(window.websdk.private_cache));
        }
    }

    static clear_login_cache = () => {
        if (null !== window.websdk || undefined !== window.websdk) {
            window.websdk.private_cache = {login_uid: 0, login_user: {}};
            window.websdk.login_ing = false;
            window.localStorage && window.localStorage.removeItem("websdk_private_cache");
        }
    }

    static check_login_ing_from_cache = () => {
        return window.websdk.login_ing;
    }

    static check_login_from_cache = () => {
        if (window.websdk.private_cache.login_uid) {
            return true;
        }
        return false;
    }

    static check_login_from_local_storage = () => {
        if (window.localStorage && window.localStorage.getItem("websdk_private_cache")) {
            return true;
        }
        return false;
    }

    static get_login_cache = () => {
        return window.websdk.private_cache;
    }

    static get_clientid = () => {
        return window.websdk.private_cache.clientid || 0;
    }

    static load_cache_from_local_storage = () => {
        let cache_exist = false;
        if (window.localStorage) {
            let login_cache_str = window.localStorage.getItem("websdk_private_cache");
            if (login_cache_str) {
                window.websdk.private_cache = JSON.parse(login_cache_str);
                cache_exist = true;
                logger.debug('get websdk_private_cache from localStorage');
            }
        }
        return cache_exist;
    }

}

export default CacheTools;