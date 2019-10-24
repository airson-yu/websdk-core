import BaseRequest from './baseRequest';
import logger from "../../core/logger";

class UserRequest extends BaseRequest {
    constructor(core) {
        super(core);
        this.core = core;
    }

    getUserInfo = (targets, exttargets, callback, cbid) => {
        //logger.debug('getUserProfile:{}', targets);
        let param = {'targets': targets, 'exttargets': exttargets, 'user_type': 0};
        this.core.invokes.req_user_profile(param, callback, cbid);
    }

    getConsoleInfo = (targets, callback, cbid) => {
        //logger.debug('getConsoleInfo:{}', targets);
        let param = {'targets': targets, 'exttargets': null, 'user_type': 1};
        this.core.invokes.req_user_profile(param, callback, cbid);
    }

    setUserParams = (targets, exttargets, paraminfo, callback, cbid) => {
        //logger.debug('setUserParams:{}', targets);
        let param = {'targets': targets, 'exttargets': exttargets, 'paraminfo': paraminfo};
        this.core.invokes.req_params_set(param, callback, cbid);
    }

    noticeUserState = (uids, extuids, callback, cbid) => {
        //logger.debug('getUserState:{}', uids);
        let param = {'uids': uids, 'extuids': extuids};
        this.core.invokes.req_user_state(param, callback, cbid);
    }

}

export default UserRequest;