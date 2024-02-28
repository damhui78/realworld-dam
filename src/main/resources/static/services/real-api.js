import {realStore} from "./real-store.js";

class RealApi {

    constructor() {
    }

    postApi = (url, param) => {
        console.log('api::postApi(): url:', url);
        console.log('api::postApi(): param : ', param);
        const headers = this.makeHeaders();
        headers['Content-Type'] = 'application/json';

        return fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(param)
        })
            .then(response => response.json())
            .catch(console.error);
    }

    getApi = (url) => {
        console.log('api::getApi(): url:', url);
        const headers = this.makeHeaders();

        return fetch(url, {
            headers
        })
            .then(response => response.json())
            .catch(console.error);
    }

    makeHeaders = () => {
        const token = realStore.getUser()?.user.token;
        return token ? {Authorization: 'Token ' + token} : {};
    }


    registerUserApi = (user) => {
        return this.postApi('/api/users', {user});
    }

    loginApi = (user) => {
        return this.postApi('/api/users/login', {user});
    }

    getArticles = (terms) => {
        const url = terms ? '/api/articles?' + terms : '/api/articles';
        return this.getApi(url);
    }

    getTags = () => {
        return this.getApi('/api/tags');
    }

    saveArticle = (article) => {
        return this.postApi('/api/articles', {article})
    }

}

const realApi = new RealApi();

export {realApi}