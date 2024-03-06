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

        this.storeData(action, result);
        this.notifyListener(action.type, result);
    }

    executeAction({type, data}) {
        const actions = {
            getArticles: this.getArticles,
            getTags: this.getTags,
            passTag: this.passTag,
            movePage: this.movePage,
            getComments: this.getComments,
            followUser: this.followUser,
            unfollowUser: this.unfollowUser,
            favoriteArticle: this.favoriteArticle,
            unfavoriteArticle: this.unfavoriteArticle,
            deleteArticle: this.deleteArticle,
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
    getComments(data) {
        return realApi.getComments(data.slug);
    }
    followUser(data) {
        return realApi.followUser(data.username);
    }
    unfollowUser(data) {
        return realApi.unfollowUser(data.username);
    }
    favoriteArticle(data) {
        return realApi.favoriteArticle(data.slug);
    }
    unfavoriteArticle(data) {
        return realApi.unfavoriteArticle(data.slug);
    }
    deleteArticle(data) {
        return realApi.deleteArticle(data.slug)
    }

    storeData(action, data) {
        if (!action.storeType) return;

        realStorage.store(action.storeType, data[action.storeType]);
    }

}

const actionHandler = new ActionHandler();
export {actionHandler}