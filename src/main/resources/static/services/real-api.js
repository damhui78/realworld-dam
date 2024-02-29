import {realStore} from "./real-store.js";

const postOrPutApi = (method, url, param) => {
    const headers = makeHeaders();
    headers['Content-Type'] = 'application/json';

    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(param)
    })
        .then(response => response.json())
        .catch(console.error);
}
const postApi = (url, param) => {
    return postOrPutApi('POST', url, param);
}
const putApi = (url, param) => {
    return postOrPutApi('PUT', url, param);
}

const getApi = (url) => {
    const headers = makeHeaders();

    return fetch(url, {
        headers
    })
        .then(response => response.json())
        .catch(console.error);
}

const makeHeaders = () => {
    const token = realStore.getUser()?.user.token;
    return token ? {Authorization: 'Token ' + token} : {};
}

class RealApi {

    constructor() {
    }


    registerUserApi = (user) => {
        return postApi('/api/users', {user});
    }

    loginApi = (user) => {
        return postApi('/api/users/login', {user});
    }

    getLoginUser = () => {
        return getApi('/api/user');
    }

    updateUser = (user) => {
        return putApi('/api/user', {user});
    }

    getArticles = (terms) => {
        const url = terms ? '/api/articles?' + terms : '/api/articles';
        return getApi(url);
    }

    getTags = () => {
        return getApi('/api/tags');
    }

    saveArticle = (article) => {
        return postApi('/api/articles', {article})
    }

}

const realApi = new RealApi();

export {realApi}