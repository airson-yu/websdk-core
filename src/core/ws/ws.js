import Result from "../result";
import logger from "../logger";
import CacheTools from "../cache_tools";

class WS {
    constructor(config, options) {
        logger.debug("ws construct");
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
        this.received_first_pong = false;
    }

    connect(processor) {
        logger.debug("ws connect");
        this.processor = processor
    }

    destroy(event) {
        logger.debug("ws destroy:{}", event);
        clearTimeout(this.reconnectTimeoutId);
        this.shouldAttemptReconnect = false;
        this.socket.close()
    }

    init() {
        logger.debug("ws init");
        this.config.reset_port_array_index();
        this.url = this.config.get_next_ws_url();
        this.shouldAttemptReconnect = true;
        this.progress = 0;
        this.established = false;
        return this;
    }

    start(is_restart) {
        if (is_restart) {
            // XXX 在关闭retry的时候，不能去重置shouldAttemptReconnect，这样始终都会retry 2020年8月5日15:44:28
            logger.debug("ws restart");
        } else {
            logger.debug("ws start");
            this.shouldAttemptReconnect = !!this.reconnectInterval;
        }
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
        logger.debug("ws resume:{}", secondsHeadroom);
    }

    heartbeat_core(that, socket) {
        if (that.established) {
            //logger.debug('ping');
            let heartbeat_msg = "{msg_code:\"heartbeat\"}";
            let clientid = CacheTools.get_clientid();// session key
            if (clientid) {
                heartbeat_msg = "{msg_code:\"heartbeat\",clientid:" + clientid + "}";
            } else {
                let exists = CacheTools.load_cache_from_local_storage();
                if (exists) {
                    clientid = CacheTools.get_clientid();// session key
                    if (clientid) {
                        heartbeat_msg = "{msg_code:\"heartbeat\",clientid:\"" + clientid + "\"}";
                    }
                }
            }
            clientid ? logger.debug('ping-' + clientid) : logger.debug('ping');
            socket.send(heartbeat_msg);

        } else {
            logger.info('not_logon_stop_heart_beat');
            if (that.heartId) {
                clearInterval(that.heartId);
                that.heartId = null;
            }
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

        // XXX 打开连接就先发一次心跳，确保service收到clientid，从而保持登录状态 2020年8月4日11:57:14
        // XXX 连接上就立即多发几次消息，ws server有可能收不到第一条消息，尽快发了消息才能识别为已登录 2020.08.26.18.24
        that.heartbeat_core(that, socket);
        that.heartbeat_core(that, socket);
        setTimeout(function (){
            that.heartbeat_core(that, socket);
        }, 10);
        setTimeout(function (){
            that.heartbeat_core(that, socket);
        }, 50);
        setTimeout(function (){
            that.heartbeat_core(that, socket);
        }, 100);
        setTimeout(function (){
            that.heartbeat_core(that, socket);
        }, 200);
        setTimeout(function (){
            that.heartbeat_core(that, socket);
        }, 1000);
        setTimeout(function (){
            that.heartbeat_core(that, socket);
        }, 3000);
        //socket.send("{msg_code:\"heartbeat\"}");
        that.heartId = setInterval(function () {
            that.heartbeat_core(that, socket);
        }, 10000);
    }

    onOpen() {
        this.received_first_pong = false;
        logger.debug("ws onOpen");
        this.progress = 1;
        this.established = true;
        this.heartbeat();
        this.config.reset_port_array_index();

        //XXX TODO FIXME 如果socket断开重连后又会执行init的回调函数，可能不合理，需要考虑 2019年3月22日12:47:22
        /*this.config.init_callback && this.config.init_callback(this.processor.build_rsp_succ(Result.succ));
        this.config.init_callback = null;*/

        // XXX 这时虽然收到了onOpen，但是实际可能正在连接中，需要等到收到心跳返回后才能执行登录回调，这个逻辑在checkFirstPong方法中，2020年11月10日12:11:30
        /*this.config.logon_callback && this.config.logon_callback(this.processor.build_rsp_succ(Result.succ));
        this.config.logon_callback = null;*/

    }

    onClose(event) {
        this.received_first_pong = false;
        logger.info("ws onClose:{}", event);
        clearInterval(this.heartId);
        this.heartId = null;
        this.established = false;
        if (this.shouldAttemptReconnect && CacheTools.check_login_from_cache()) {
            clearTimeout(this.reconnectTimeoutId);
            this.reconnectTimeoutId = setTimeout(function () {
                this.start(true);
            }.bind(this), this.reconnectInterval * 1e3)
        } else {
            logger.debug("ws shouldAttemptReconnect false");
        }
    }

    onError(event) {
        this.received_first_pong = false;
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
        this.checkFirstPong();
        //logger.debug("m:{}", ev.data);
        this.processor.receive(ev.data)
    }

    checkFirstPong() {
        if (this.received_first_pong) {
            return;
        }
        let that = this;
        if (!that.received_first_pong) {
            logger.debug("received_first_pong");
            that.received_first_pong = true;
        }
        if (that.processor.init_status == 2) {
            that.processor.init_status = 3;// init done
            logger.debug("init_ws_done by ws");
        }
        if (that.processor.init_ws_alone_status == 2) {
            that.processor.init_ws_alone_status = 3;// init done
            logger.debug("init_ws_alone_done by ws");
        }
        if (that.config.init_callback) {
            logger.debug("trigger init_callback by ws");
            that.config.init_callback(that.processor.build_rsp_succ(Result.succ));
            that.config.init_callback = null
        }
        if (that.config.logon_callback) {
            logger.debug("trigger logon_callback(request_callback) by ws");
            that.config.logon_callback(that.processor.build_rsp_succ(Result.succ));
            that.config.logon_callback = null
        }
    }
}

export default WS;