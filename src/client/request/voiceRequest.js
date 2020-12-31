import BaseRequest from './baseRequest';
import logger from "../../core/logger";

class VoiceRequest extends BaseRequest {
    constructor(core) {
        super(core);
        this.core = core;
    }

    call = (demander, target, extdemander, exttarget, channel, call_type, priority, start, telno, callback, cbid) => {
        //logger.debug('requestCall:{}', target);
        let param = {
            /*'demander': demander,
            'target': target,*/
            'extdemander': extdemander,
            'exttarget': exttarget,
            'channel': channel,
            'call_type': call_type,
            'priority': priority,
            'start': start,
            'telno': telno
        };
        if (demander) {
            param.demander = demander;
        }
        if (target) {
            param.target = target;
        }
        this.core.invokes.req_call(param, callback, cbid);
    }

    callStatus = (demander, target, extdemander, exttarget, channel, call_type, status, telno, callback, cbid) => {
        //logger.debug('callStatus:{}', target);
        let param = {
            /*'demander': demander,
            'target': target,*/
            'extdemander': extdemander,
            'exttarget': exttarget,
            'channel': channel,
            'call_type': call_type,
            'status': status,
            'telno': telno
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

    dtmf = (telno, subno, callback, cbid) => {
        //logger.debug('dtmf:{}-{}', telno, subno);
        let param = {'telno': telno, 'value': subno};
        this.core.invokes.req_dtmf(param, callback, cbid);
    }

    getAudioList = (start, count, starttime, endtime, callerlike, calleelike, tglike, type, callback, cbid) => {
        logger.debug('getAudioList,start:{},count:{}', start, count);
        //startDate endDate userCamNameLike start length
        start = start >= 0 ? start : 0;
        count = count > 0 ? count : 100;
        //let consoleId = window.websdk.private_cache.login_uid;
        let param = {
            'starttime': starttime,
            'endtime': endtime,
            'callerlike': callerlike,
            'calleelike': calleelike,
            'tglike': tglike,
            'type': type,
            'start': start,
            'length': count,
            //'consoleId': consoleId,
        }
        this.core.invokes.req_get_audio_list(param, callback, cbid);
    }

    transformAudio = (audioid, suffix, path, callback, cbid) => {
        let result = {
            msg_code: 'transformAudio',
            cbid: cbid,
            cmd_type: 1
        }
        if (!audioid) {
            result.cmd_status = 2;
            result.error_reason = 'audioid empty';
            callback(result);
            return;
        }
        if (!suffix) {
            result.cmd_status = 3;
            result.error_reason = 'suffix empty';
            callback(result);
            return;
        }
        if (!path) {
            result.cmd_status = 4;
            result.error_reason = 'path empty';
            callback(result);
            return;
        }
        let param = {
            'id': audioid,
            'suffix': suffix,
            'path': path
        }
        this.core.invokes.req_transform_audio(param, callback, cbid);
    }

}

export default VoiceRequest;