import VideoWebsocket from './videoWebsocket';
import VideoPlayer from "./videoPlayer";
import logger from "../logger";

class VideoProcessor {
    constructor(url, dom_id) {
        this.canvas = null;
        if (dom_id) {
            this.canvas = document.getElementById(dom_id);
        }
        this.canvas_default_w = 384; //640 * 0.6 微调一点，不能小于窗口footer的最小宽度;
        this.canvas_default_h = 288; //480 * 0.6; 294/480*640 = 392
        this.canvas_last_fix_w = this.canvas_default_w;
        this.canvas_last_fix_h = this.canvas_default_h;
        this.video_real_w = 640;
        this.video_real_h = 480;
        this.fullscreen_w = 0;
        this.fullscreen_h = 0;
        this.fullscreen = false;
        this.fresh_canvas_scale(this.canvas_default_w, this.canvas_default_h, false);
        this.videoPlayer = new VideoPlayer();
        this.renderContext = this.videoPlayer.createRenderContext(this.canvas);
        this.videoWebsocket = new VideoWebsocket(url, {'processor': this});
        this.videoWebsocket.start();


        //FIXME FOR TEST
        /*this.videoPlayer2 = new VideoPlayer();
        this.renderContext2 = this.videoPlayer2.createRenderContext(document.getElementById('c1'));
        this.videoPlayer3 = new VideoPlayer();
        this.renderContext3 = this.videoPlayer3.createRenderContext(document.getElementById('c2'));
        this.videoPlayer4 = new VideoPlayer();
        this.renderContext4 = this.videoPlayer4.createRenderContext(document.getElementById('c3'));
        this.videoPlayer5 = new VideoPlayer();
        this.renderContext5 = this.videoPlayer5.createRenderContext(document.getElementById('c4'));
        this.videoPlayer6 = new VideoPlayer();
        this.renderContext6 = this.videoPlayer6.createRenderContext(document.getElementById('c5'));
        this.videoPlayer7 = new VideoPlayer();
        this.renderContext7 = this.videoPlayer7.createRenderContext(document.getElementById('c6'));
        this.videoPlayer8 = new VideoPlayer();
        this.renderContext8 = this.videoPlayer8.createRenderContext(document.getElementById('c7'));*/
        /*this.videoPlayer9 = new VideoPlayer();
        this.renderContext9 = this.videoPlayer9.createRenderContext(document.getElementById('c8'));*/

    }


    fresh_canvas_toggle_fullscreen(fullscreen) {
        this.fullscreen = fullscreen;
        if (fullscreen) {
            let collection = document.getElementsByClassName('sdk-fullscreen-toggle-modal');
            let modal = collection.item(0);
            this.fullscreen_w = modal.clientWidth - 6;
            this.fullscreen_h = modal.clientHeight - 99;
            let max_h = Math.ceil(this.fullscreen_w / this.canvas_last_fix_w * this.canvas_last_fix_h);
            let max_w = Math.ceil(this.fullscreen_h / this.canvas_last_fix_h * this.canvas_last_fix_w);
            // XXX 要保持比例不拉伸
            if (max_h >= this.fullscreen_h) {
                this.canvas.height = this.fullscreen_h;
                this.canvas.width = max_w;
            } else {
                this.canvas.height = max_h;
                this.canvas.width = this.fullscreen_w;
            }
        } else {
            this.canvas.width = this.canvas_last_fix_w;
            this.canvas.height = this.canvas_last_fix_h;
        }
        this.renderContext.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    fresh_canvas_scale(width, height, fresh_context) {
        if (this.fullscreen) {
            let max_h = Math.ceil(this.fullscreen_w / width * height);
            let max_w = Math.ceil(this.fullscreen_h / height * width);
            if (max_h >= this.fullscreen_h) {
                this.canvas.height = this.fullscreen_h;
                this.canvas.width = max_w;
            } else {
                this.canvas.height = max_h;
                this.canvas.width = this.fullscreen_w;
            }
            if (width >= height) {
                this.canvas_last_fix_w = this.canvas_default_w;
                this.canvas_last_fix_h = this.canvas_default_h;
            } else {
                this.canvas_last_fix_w = this.canvas_default_h;
                this.canvas_last_fix_h = this.canvas_default_w;
            }
        } else {
            if (width >= height) {
                this.canvas.width = this.canvas_default_w;
                this.canvas.height = this.canvas_default_h;
                this.canvas_last_fix_w = this.canvas_default_w;
                this.canvas_last_fix_h = this.canvas_default_h;
            } else {
                this.canvas.width = this.canvas_default_h;
                this.canvas.height = this.canvas_default_w;
                this.canvas_last_fix_w = this.canvas_default_h;
                this.canvas_last_fix_h = this.canvas_default_w;
            }
        }
        fresh_context && this.renderContext.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    decode(data) {
        return data;
    }

    receive(msg) {
        //let data = this.decode(msg);
        let data = msg;
        let uint8View = new Uint8Array(data);

        // header total len: 28 byte
        let header_len = 28;
        /**
         magic          int     M    0x1391915b
         Version        byte    M    1-
         Head_length    byte    M    He10000101ad的长度，包括magic
         type           byte    M    1 --video
         reserve0       byte    M    保留，这里主要为了字节对齐
         playid         int64   M    视频ID。 0保留给自己的摄像头
         Width          short   M    视频的宽
         height         short   M    视频的高
         Format         byte    M    视频数据格式。1—YV12
         Reserve        3 byte  M    保留
         Data length    int     M    有效数据的长度，不包括head
         */
        /**
         * first 28 byte:
         * 19 145 145 91 (magic)
         * 1 28 1 0 (Version, Head_length, type, reserve0)
         * 0 0 0 0 (playid)
         * 1 11 153 0 (playid)
         * 1 224 2 128 (Width, height)
         * 1 123 167 119 (Format, Reserve)
         * 0 7 8 0 (Data length)
         */

        let w1 = uint8View[16];
        let w2 = uint8View[17];
        let h1 = uint8View[18];
        let h2 = uint8View[19];
        let width = (w1 << 8) | w2;
        let height = (h1 << 8) | h2;

        if (width !== this.real_width || height !== this.real_height) {
            this.real_width = width;
            this.real_height = height;
            this.fresh_canvas_scale(width, height, true);
        }

        //Width & height must be same as resolution of YUV frame
        //let width = 640, height = 480;
        let ylen = (width) * (height);
        let uvlen = (width / 2) * (height / 2);


        /*if (data.byteLength == width * height * 3 / 2 + header_len) {
            return;
        }*/

        // XXX magic: 1391915b -> 10011100100011001000101011011 -> 01011011 -> 91
        //if (uint8View[0] !== 91) {
        if (uint8View[0] !== 19) {
            return;
        }

        let final_data = uint8View.subarray(header_len);
        this.videoPlayer.renderFrame(this.renderContext, final_data, width, height, ylen, uvlen);
        //logger.debug(Date.now() - s);

        //FIXME FOR TEST
        /*this.videoPlayer2.renderFrame(this.renderContext2, final_data, width, height, ylen, uvlen);
        this.videoPlayer3.renderFrame(this.renderContext3, final_data, width, height, ylen, uvlen);
        this.videoPlayer4.renderFrame(this.renderContext4, final_data, width, height, ylen, uvlen);
        this.videoPlayer5.renderFrame(this.renderContext5, final_data, width, height, ylen, uvlen);
        this.videoPlayer6.renderFrame(this.renderContext6, final_data, width, height, ylen, uvlen);
        this.videoPlayer7.renderFrame(this.renderContext7, final_data, width, height, ylen, uvlen);
        this.videoPlayer8.renderFrame(this.renderContext8, final_data, width, height, ylen, uvlen);*/
        // this.videoPlayer9.renderFrame(this.renderContext9, final_data, width, height, ylen, uvlen);

    }

}

export default VideoProcessor;