import {realApi} from "./real-api.js";
import {realStorage} from "./real-storage.js";

const eventQueue = [];
const listenerMap = new Map();

class ActionHandler {
    constructor() {
        setInterval(() => this.runAction(), 100);
    }

    addListener(actionTypes, listener) {
        for (const actionType of actionTypes) {
            const listeners = listenerMap.get(actionType) || [];
            listeners.push(listener);
            listenerMap.set(actionType, listeners);
        }
        console.log('action-handler::addListener(): listenerMap:', listenerMap);
    }

    removeListener(actionTypes, listener) {
        for (const actionType of actionTypes) {
            let listeners = listenerMap.get(actionType);
            if (!listeners) continue;

            listeners = listeners.filter(item => item !== listener);
            listenerMap.set(actionType, listeners);
        }
        console.log('action-handler::removeListener(): listenerMap:', listenerMap);
    }

    notifyListener(actionType, result) {
        console.log('action-handler::notifyListener(): actionType:', actionType);
        console.log('action-handler::notifyListener(): result:', result);

        const listeners = listenerMap.get(actionType);
        console.log('action-handler::notifyListener(): listeners :', listeners);

        for (const listener of listeners) {
            console.log('action-handler::notifyListener(): listener:', listener);
            listener.callbackAction(actionType, result);
        }
    }

    addAction(action) {
        eventQueue.push(action);
        console.log('action-handler::addEvent(): eventQueue:', eventQueue);

    }

    runAction = async () => {
        if (eventQueue.length < 1) return;
        const action = eventQueue.shift();
        console.log('action-handler::runAction(): action:', action);
        if (!action) return;

        const result = await this.executeAction(action);

        this.storeData(action.type, result);
        this.notifyListener(action.type, result);
    }

    executeAction({type, data}) {
        const actions = {
            getArticles: this.getArticles,
            getTags: this.getTags,
            passTag: this.passTag,
            movePage: this.movePage,
        };
        return actions[type](data);
    }
    getArticles(data) {
        return realApi.getArticles(data.terms, data.pageNo);
    }
    getTags() {
        return realApi.getTags();
    }
    passTag(data) {
        return data.tag;
    }
    movePage(data) {
        return data.pageNo;
    }

    storeData(actionType, data) {
        const actions = {
            getArticles: this.saveArticles,
        };

        if (!Object.keys(actions).includes(actionType)) return;

        actions[actionType](data);
    }
    saveArticles(data) {
        realStorage.saveArticles(data.articles);
    }

}

const actionHandler = new ActionHandler();
export {actionHandler}