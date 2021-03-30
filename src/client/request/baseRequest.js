import logger from "../../core/logger";

class BaseRequest {
    constructor(core) {
        this.core = core;
    }

    baseRequestMethod = () => {
        //logger.debug('baseRequestMethod');
    };

    setLogLevelAll = (callback) => {
        logger.setLevel(logger.level_list.all);
        return this.getCurLogLevel(callback);
    }

    setLogLevelDebug = (callback) => {
        logger.setLevel(logger.level_list.debug);
        return this.getCurLogLevel(callback);
    }

    setLogLevelWarn = (callback) => {
        logger.setLevel(logger.level_list.warn);
        return this.getCurLogLevel(callback);
    }

    setLogLevelNone = (callback) => {
        logger.setLevel(logger.level_list.none);
        return this.getCurLogLevel(callback);
    }

    getCurLogLevel = (callback) => {
        for (let i in logger.level_list) {
            let val = logger.level_list[i];
            if (val == logger.level) {
                callback && callback(i);
                return;
            }
        }
        callback && callback();
    }

}

export default BaseRequest;