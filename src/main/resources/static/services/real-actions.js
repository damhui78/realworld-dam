const callbackMap = new Map();

class RealActions {
    constructor() {
    }

    addAction(type, value) {
        console.log('real-actions::addAction(): type:', type);
        console.log('real-actions::addAction(): value:', value);
        const cb = callbackMap.get(type);
        cb && cb(value);
    }

    addCallback(type, cb) {
        console.log('real-actions::addCallback(): type:', type);
        console.log('real-actions::addCallback(): cb:', cb);
        callbackMap.set(type, cb);
    }
}

// const realAction = new RealActions();
export default new RealActions();

