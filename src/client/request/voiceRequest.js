import BaseRequest from './baseRequest';
import logger from "../../core/logger";

class VoiceRequest extends BaseRequest {
    constructor(core) {
        super(core);
        this.core = core;
    }

    call = (demander, target, extdemander, exttarget, channel, call_type, priority, start, callback, cbid) => {
        //logger.debug('requestCall:{}', target);
        let param = {
            /*'demander': demander,
            'target': target,*/
            'extdemander': extdemander,
            'exttarget': exttarget,
            'channel': channel,
            'call_type': call_type,
            'priority': priority,
            'start': start
        };
        if (demander) {
            param.demander = demander;
        }
        if (target) {
            param.target = target;
        }
        this.core.invokes.req_call(param, callback, cbid);
    }

    callStatus = (demander, target, extdemander, exttarget, channel, call_type, status, callback, cbid) => {
        //logger.debug('callStatus:{}', target);
        let param = {
            /*'demander': demander,
            'target': target,*/
            'extdemander': extdemander,
            'exttarget': exttarget,
            'channel': channel,
            'call_type': call_type,
            'status': status
        };
        if (demander) {
            param.demander = demander;
        }
        if (target) {
            param.target = target;
        }
        this.core.invokes.req_call_status(param, callback, cbid);
    }

    pttOn = (tgid, callback, cbid) => {
        //logger.debug('pttOn:{}', tgid);
        let param = {'tgid': tgid};
        this.core.invokes.req_ptt_on(param, callback, cbid);
    }

    pttOff = (tgid, callback, cbid) => {
        //logger.debug('pttOff:{}', tgid);
        let param = {'tgid': tgid};
        this.core.invokes.req_ptt_off(param, callback, cbid);
    }

    pttReplay = (tgid, refid, state, callback, cbid) => {
        //logger.debug('pttReplay:{}', tgid);
        let param = {'tgid': tgid, 'refid': refid, 'state': state};
        this.core.invokes.req_ptt_replay(param, callback, cbid);
    }

}

export default VoiceRequest;