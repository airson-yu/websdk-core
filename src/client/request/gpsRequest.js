import BaseRequest from './baseRequest';
import logger from "../../core/logger";

class GPSRequest extends BaseRequest {
    constructor(core) {
        super(core);
        this.core = core;
    }

    queryGPS = (target, exttarget, callback, cbid) => {
        //logger.debug('queryGPS:{}', target);
        let param = {/*'target': target, */'exttarget': exttarget};
        if (target) {
            param.target = target;
        }
        this.core.invokes.req_query_gps(param, callback, cbid);
    }

    queryHistoryGPS = (target, exttarget, starttime, endtime, callback, cbid) => {
        //logger.debug('queryHistoryGPS:{}', target);
        let param = {/*'target': target, */'exttarget': exttarget, 'starttime': starttime, 'endtime': endtime};
        if (target) {
            param.target = target;
        }
        this.core.invokes.req_query_history_gps(param, callback, cbid);
    }
}

export default GPSRequest;