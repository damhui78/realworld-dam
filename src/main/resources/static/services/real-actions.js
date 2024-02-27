class RealActions {
    constructor() {
    }

    addAction(action) {
        console.log('real-actions::addAction(): action:', action);
        this.tagCallback(action);
    }

    addTagCallback(cb) {
        console.log('real-actions::addTagCallback(): cb:', cb);
        this.tagCallback = cb;
    }
}

// const realAction = new RealActions();
export default new RealActions();

