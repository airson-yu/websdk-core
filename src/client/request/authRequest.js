import BaseRequest from './baseRequest';
import logger from "../../core/logger";

class AuthRequest extends BaseRequest {
    constructor(core) {
        super(core);
        this.core = core;
    }

    logon = (ipaddr, port, orgid, logon_name, password, console_name, client_alive_time, callback, cbid) => {
        //logger.debug('logon:{}', logon_name);
        if (!client_alive_time) {
            client_alive_time = 0;
        } else if (client_alive_time > 120) {
            logger.warn('client_alive_time > 120 minutes, use 120');
            client_alive_time = 120;
        }
        let param = {
            'ipaddr': ipaddr,
            'port': port,
            'orgid': orgid,
            'logon_name': logon_name,
            'passwd': password,
            'console_name': console_name,
            'client_alive_time': client_alive_time,
            'clientid': new Date().getTime() >>> 5
        };
        this.core.invokes.req_logon(param, callback, cbid);
    }

    logout = (callback) => {
        //logger.debug('logout');
        this.core.invokes.req_logout(null, callback);
    }

    emergencyHandled = (uid, extUid, processor, timestamp, ack_type, callback, cbid) => {
        //logger.debug('emergencyHandled:{}', uid);
        let param = {'uid': uid, 'extUid': extUid, 'processor': processor, 'timestamp': timestamp, 'ack_type': ack_type};
        this.core.invokes.req_emergency_handled(param, callback, cbid);
    }

    changePasswd = (username, oldpasswd, newpasswd, callback, cbid) => {
        //logger.debug('changePasswd:{}', uid);
        let param = {'username': username, 'oldpasswd': oldpasswd, 'newpasswd': newpasswd};
        this.core.invokes.req_change_passwd(param, callback, cbid);
    }

}

export default AuthRequest;