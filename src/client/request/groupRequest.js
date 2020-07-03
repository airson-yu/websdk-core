import BaseRequest from './baseRequest';

class GroupRequest extends BaseRequest {
    constructor(core) {
        super(core);
        this.core = core;
    }

    getGroupInfo = (targets, callback, cbid) => {
        //logger.debug('getGroupInfo:{}', targets);
        let param = {'target': targets};
        this.core.invokes.req_grp_profile(param, callback, cbid);
    }

    enterGroup = (demander, extdemander, tgid, mute, callback, cbid) => {
        //logger.debug('enterGroup:{}', tgid);
        let param = {'demander': demander, 'extdemander': extdemander, 'tgid': tgid, 'mute': mute};
        this.core.invokes.req_enter_group(param, callback, cbid);
    }

    leaveGroup = (demander, extdemander, tgid, callback, cbid) => {
        //logger.debug('leaveGroup:{}', tgid);
        let param = {'demander': demander, 'extdemander': extdemander, 'tgid': tgid};
        this.core.invokes.req_leave_group(param, callback, cbid);
    }

    forceEnterGroup = (tgid, callback, cbid) => {
        //logger.debug('forceEnterGroup:{}', tgid);
        let param = {'tgid': tgid};
        this.core.invokes.req_force_enter_group(param, callback, cbid);
    }

    forceLeaveGroup = (tgid, callback, cbid) => {
        //logger.debug('forceLeaveGroup:{}', tgid);
        let param = {'tgid': tgid};
        this.core.invokes.req_force_leave_group(param, callback, cbid);
    }

    addGroupMember = (tgid, uids, extuids, callback, cbid) => {
        //logger.debug('addGroupMember:{}', uids);
        let param = {'tgid': tgid, 'uids': uids, 'extuids': extuids};
        this.core.invokes.req_add_grp_mem(param, callback, cbid);
    }

    removeGroupMember = (tgid, uids, extuids, callback, cbid) => {
        //logger.debug('removeGroupMember:{}', uids);
        let param = {'tgid': tgid, 'uids': uids, 'extuids': extuids};
        this.core.invokes.req_rem_grp_mem(param, callback, cbid);
    }

    createGroup = (name, uids, extuids, callback, cbid) => {
        //logger.debug('createGroup:{}', name);
        let param = {'name': name, 'uids': uids, 'extuids': extuids};
        this.core.invokes.req_create_grp(param, callback, cbid);
    }

    deleteGroup = (tgid, callback, cbid) => {
        //logger.debug('deleteGroup:{}', tgid);
        let param = {'tgid': tgid};
        this.core.invokes.req_delete_grp(param, callback, cbid);
    }

}

export default GroupRequest;