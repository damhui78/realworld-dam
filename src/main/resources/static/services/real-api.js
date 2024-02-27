class RealApi {

    constructor() {
    }

    postApi = (url, param) => {
        console.log('api::postApi(): url:', url);
        console.log('api::postApi(): param : ', param);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
            .then(response => response.json())
            .catch(console.error);
    }

    getApi = (url) => {
        console.log('api::getApi(): url:', url);

        return fetch(url)
            .then(response => response.json())
            .catch(console.error);
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

}

const realApi = new RealApi();

export {realApi}