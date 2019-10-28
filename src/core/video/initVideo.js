import VideoWebsocket from "./VideoWebsocket";
import logger from "../../core/logger";

class InitVideo {
    constructor() {
        let url = '';
        this.videoWebsocket = new VideoWebsocket(url, {});
    }

    init() {
        var timer;

        var url1 = 'ws://localhost:9081/console';
        var lockReconnect = false;  //����ws�ظ�����

        function init_all() {
            init_socket('sdk_video_canvas1', 1);
        }

        window.onload = function () {
            init_all();
        }

        function reconnect(url) {
            //û�����ϻ�һֱ�����������ӳٱ����������
            logger.debug("lockReconnect is true");
            if (lockReconnect) {
                logger.debug("lockReconnect is true");
                return;
            }

            lockReconnect = true;
            clearTimeout(timer);
            timer = setTimeout(function () {
                //window.onload();
                init_all();
                lockReconnect = false;
                /*
               if (ws.readyState == 2 || ws.readyState == 3) {
                  //  init_socket('video-canvas1');

                  window.onload();
                    lockReconnect = false;
               } else if (ws.readyState == 1) {
                   clearTimeout(timer);
               }
               */
            }, 5000);


        }

        function init_socket(dom, index) {
            //    ws = new ReconnectingWebSocket(url1); // new WebSocket(url1);
            var ws = new WebSocket(url1);// new WebSocket(url1);
            ws.onerror = function (event) {
                logger.debug("websocket.error");
                reconnect(url1);

            };
            ws.onclose = function (event) {
                logger.debug("websocket close");
                reconnect(url1);

            };

            ws.binaryType = 'arraybuffer';

            if (!GLOBAL_DATA[index]['renderContext']) {
                var canvas = document.getElementById(dom);
                canvas.width = 1280;
                canvas.height = 720;
                var renderContext = setupCanvas(canvas, {
                    preserveDrawingBuffer: false
                });
                GLOBAL_DATA[index]['renderContext'] = renderContext;
            }

            var renderContext = GLOBAL_DATA[index]['renderContext'];

            ws.addEventListener('message', function (event) {


                //Width & height must be same as resolution of YUV frame
                var width = 1280,
                    height = 720,
                    ylen = (width) * (height),
                    uvlen = (width / 2) * (height / 2);


                if (event.data.byteLength == width * height * 3 / 2 + 12) {

                    var s = Date.now();

                    var uint8View = new Uint8Array(event.data);

                    if (uint8View[0] !== 91) {
                        return;
                    }
                    var final_data = uint8View.subarray(12);
                    renderFrame(renderContext, final_data, width, height, ylen, uvlen);
                    logger.debug(Date.now() - s);
                }


            });
        }


    }


}

export default InitVideo;