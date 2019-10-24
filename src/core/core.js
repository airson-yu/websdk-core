import Invokes from './invokes';
import Processor from "./ws/processor";

class Core {
    constructor() {
        this.processor = new Processor();
        this.invokes = new Invokes(this.processor);
    }

}

export default Core;