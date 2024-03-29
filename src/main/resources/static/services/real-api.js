import {realStorage} from "./real-storage.js";

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

const getOrDeletetApi = (method, url) => {
    const headers = makeHeaders();

    return fetch(url, {
        method,
        headers
    })
        .then(response => response.json())
        .catch(console.error);
}
const deleteApi = (url) => {
    return getOrDeletetApi('DELETE', url);
}
const getApi = (url) => {
    return getOrDeletetApi('GET', url);
}

const makeHeaders = () => {
    const token = realStorage.retrieve('user')?.token;
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

    getArticles = (terms, pageNo = 0) => {
        console.log('real-api::getArticles(): terms:', terms);
        console.log('real-api::getArticles(): pageNo:', pageNo);
        
        const paging = `limit=2&offset=${pageNo*2}`;
        const url = terms ? `/api/articles?${paging}&${terms}` : `/api/articles?${paging}`;
        console.log('real-api::getArticles(): url:', url);
        
        return getApi(url);
    }
    getFeedArticles = (pageNo = 0) => {
        console.log('real-api::getFeedArticles(): pageNo:', pageNo);

        const url = `/api/articles/feed?limit=2&offset=${pageNo*2}`;
        console.log('real-api::getArticles(): url:', url);

        return getApi(url);
    }

    getTags = () => {
        return getApi('/api/tags');
    }

    saveArticle = (article) => {
        return postApi('/api/articles', {article});
    }

    updateArticle = (slug, article) => {
        return putApi(`/api/articles/${slug}`, {article});
    }

    deleteArticle = (slug) => {
        return deleteApi(`/api/articles/${slug}`);
    }

    favoriteArticle = (slug) => {
        return postApi(`/api/articles/${slug}/favorite`);
    }

    unfavoriteArticle = (slug) => {
        return deleteApi(`/api/articles/${slug}/favorite`);
    }

    getComments = (slug) => {
        return getApi(`/api/articles/${slug}/comments`);
    }

    addComment = (slug, comment) => {
        return postApi(`/api/articles/${slug}/comments`, {comment});
    }

    deleteComment = (slug, id) => {
        return deleteApi(`/api/articles/${slug}/comments/${id}`);
    }

    getProfile = (username) => {
        return getApi(`/api/profiles/${username}`);
    }

    followUser = (username) => {
        return postApi(`/api/profiles/${username}/follow`);
    }

    unfollowUser = (username) => {
        return deleteApi(`/api/profiles/${username}/follow`);
    }

}

const realApi = new RealApi();

export {realApi}