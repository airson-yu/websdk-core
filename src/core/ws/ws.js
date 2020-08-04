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

    heartbeat_core(that, socket) {
        if (that.established) {
            //logger.debug('ping');
            let heartbeat_msg = "{msg_code:\"heartbeat\"}";
            let clientid = null;
            if (window.websdk.private_cache) {
                clientid = window.websdk.private_cache.clientid;// session key
            }
            if (clientid) {
                heartbeat_msg = "{msg_code:\"heartbeat\",clientid:" + clientid + "}";
            } else {
                if (window.localStorage) {
                    let login_cache_str = window.localStorage.getItem("websdk_private_cache");
                    if (login_cache_str) {
                        window.websdk.private_cache = JSON.parse(login_cache_str);
                        logger.debug('heartbeat get websdk_private_cache from localStorage');
                        clientid = window.websdk.private_cache.clientid;// session key
                        if (clientid) {
                            heartbeat_msg = "{msg_code:\"heartbeat\",clientid:\"" + clientid + "\"}";
                        }
                    }
                }
            }
            clientid ? logger.debug('ping-' + clientid) : logger.debug('ping');
            socket.send(heartbeat_msg);

        } else {
            logger.info('not_logon_stop_heart_beat');
            clearInterval(that.heartId);
            that.heartId = null;
        }
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
        that.heartbeat_core(that, socket); // XXX 打开连接就先发一次心跳，确保service收到clientid，从而保持登录状态 2020年8月4日11:57:14
        //socket.send("{msg_code:\"heartbeat\"}");
        that.heartId = setInterval(function () {
            that.heartbeat_core(that, socket);
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