import BaseRequest from './baseRequest';

class IMRequest extends BaseRequest {
    constructor(core) {
        super(core);
        this.core = core;
    }

    sendIMText = (target, exttarget, im_type, content, time, callback, cbid) => {
        //logger.debug('sendIMText:{}', targets);
        let param = {/*'target': target, */'exttarget': exttarget, 'im_type': im_type, 'content': content, 'time': time};
        if (target) {
            param.target = target;
        }
        this.core.invokes.req_send_im(param, callback, cbid);
    }

    sendIMFile = (target, exttarget, im_type, content, time, filename, size, callback, cbid) => {
        //logger.debug('sendIMFile:{}', targets);
        let param = {/*'target': target, */'exttarget': exttarget, 'im_type': im_type, 'content': content, 'time': time, 'filename': filename, 'size': size};
        if (target) {
            param.target = target;
        }
        this.core.invokes.req_send_im(param, callback, cbid);
    }

    sendIMFileDone = (target, exttarget, im_type, time, fid, filename, size, ourl, surl, callback, cbid) => {
        //logger.debug('sendIMFileDone:{}', targets);
        let param = {'exttarget': exttarget, 'im_type': im_type, 'time': time, 'fid': fid, 'filename': filename, 'size': size, 'ourl': ourl, 'surl': surl};
        if (target) {
            param.target = target;
        }
        this.core.invokes.req_send_file_done(param, callback, cbid);
    }

    reqIMList = (target, exttarget, start, count, im_type, target_type, callback, cbid) => {
        let param = {/*'target': target, */'exttarget': exttarget, 'start': start, 'count': count, 'im_type': im_type, 'target_type': target_type};
        if (target) {
            param.target = target;
        }
        this.core.invokes.req_im_list(param, callback, cbid);
    }

}

export default IMRequest;