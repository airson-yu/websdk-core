import Listener from './listener';
import Request from './request';
import logger from "../core/logger";

/**
 * @deprecated
 */
class Client {
    constructor(internal) {
        //this.internal = internal;
        this.listener = new Listener(internal);
        this.request = new Request(internal);
    }

    demo() {
        this.request.video.openVideo('param', function (message) {
            //logger.debug('openVideo result: {}', message);
        });
    }

}

export default Client;