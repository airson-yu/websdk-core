import logger from "../../core/logger";

class BaseRequest {
    constructor(core) {
        this.core = core;
    }

    baseRequestMethod = () => {
        //logger.debug('baseRequestMethod');
    };

}

export default BaseRequest;