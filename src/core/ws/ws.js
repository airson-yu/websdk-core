import Result from "../result";
import logger from "../logger";

class WS {
    constructor(config, options) {
        this.config = config;
        this.url = null;
        //this.url = config.get_next_ws_url();
        this.options = options;
        this.socket = null;
        this.heartId = null;
        this.callbacks = {
            connect: [],
            data: []
        }
        this.reconnectInterval = options.reconnectInterval !== undefined ? options.reconnectInterval : 5;
        this.shouldAttemptReconnect = !!this.reconnectInterval;
        this.completed = false;
        this.established = false;
        this.progress = 0;
        this.reconnectTimeoutId = 0;
        this.processor = options.processor;
    }

    connect(processor) {
        this.processor = processor
    }

    destroy() {
        clearTimeout(this.reconnectTimeoutId);
        this.shouldAttemptReconnect = false;
        this.socket.close()
    }

    init() {
        this.config.reset_port_array_index();
        this.url = this.config.get_next_ws_url();
        this.shouldAttemptReconnect = true;
        this.progress = 0;
        this.established = false;
        return this;
    }

    start() {
        this.shouldAttemptReconnect = !!this.reconnectInterval;
        this.progress = 0;
        this.established = false;
        //this.socket = new WebSocket(this.url, this.options.protocols || null);
        this.socket = new WebSocket(this.url);
        this.socket.binaryType = "arraybuffer";
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onclose = this.onClose.bind(this);
    }

    // eslint-disable-next-line no-unused-vars
    resume(secondsHeadroom) {
    }

    heartbeat() {
        // TODO FIXME FOR TEST
        //return false;
        let that = this;

        if (that.heartId) {
            clearInterval(this.heartId);
            that.heartId = null;
        }
        let socket = that.socket;
        //socket.send("{msg_code:\"heartbeat\"}");
        that.heartId = setInterval(function () {
            if (that.established) {
                logger.debug('ping');
                socket.send("{msg_code:\"heartbeat\"}");
            } else {
                logger.info('not_logon_stop_heart_beat');
                clearInterval(that.heartId);
                that.heartId = null;
            }
        }, 10000);
    }

    onOpen() {
        logger.info('ws onOpen');
        this.progress = 1;
        this.established = true;
        this.heartbeat();
        this.config.reset_port_array_index();

        //XXX TODO FIXME 如果socket断开重连后又会执行init的回调函数，可能不合理，需要考虑 2019年3月22日12:47:22
        /*this.config.init_callback && this.config.init_callback(this.processor.build_rsp_succ(Result.succ));
        this.config.init_callback = null;*/

        this.config.logon_callback && this.config.logon_callback(this.processor.build_rsp_succ(Result.succ));
        this.config.logon_callback = null;


    }

    onClose() {
        clearInterval(this.heartId);
        this.heartId = null;
        this.established = false;
        logger.info('ws onClose');
        if (this.shouldAttemptReconnect && window.websdk.private_cache.login_uid) {
            clearTimeout(this.reconnectTimeoutId);
            this.reconnectTimeoutId = setTimeout(function () {
                this.start()
            }.bind(this), this.reconnectInterval * 1e3)
        }
    }

    onError(event) {
        logger.warn("ws onError:{}", event);
        if (event.target.readyState === 3) { // 换端口重新连接
            this.url = this.config.get_next_ws_url();
            if (!this.url) {
                if (this.config.init_callback) {
                    this.config.init_callback(this.processor.build_rsp_fail(Result.ws_init_error));
                    this.config.init_callback = null;
                }
                this.shouldAttemptReconnect = false;
                return false;
            }
            this.onClose();
        }

    }

    onMessage(ev) {
        this.processor.receive(ev.data)
    }

}

export default WS;