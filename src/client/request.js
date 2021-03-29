import VideoRequest from './request/videoRequest';
import GPSRequest from './request/gpsRequest';
import AuthRequest from "./request/authRequest";
import UserRequest from "./request/userRequest";
import GroupRequest from "./request/groupRequest";
import VoiceRequest from "./request/voiceRequest";
import IMRequest from "./request/imRequest";
import BaseRequest from "./request/baseRequest";

class Request {
    constructor(core) {
        //this.core = core;
        this.baseRequest = new BaseRequest(core);
        this.authRequest = new AuthRequest(core);
        this.userRequest = new UserRequest(core);
        this.groupRequest = new GroupRequest(core);
        this.gpsRequest = new GPSRequest(core);
        this.videoRequest = new VideoRequest(core);
        this.voiceRequest = new VoiceRequest(core);
        this.imRequest = new IMRequest(core);
    }

    abc = () => {
        //logger.debug('client request');
    }

}

export default Request;