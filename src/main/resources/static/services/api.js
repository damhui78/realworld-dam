const postApi = (url, param) => {
    console.log('postApi param : ', param);

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

const registerUserApi = (user) => {
    return postApi('/api/users', {user});
}

const loginApi = (user) => {
    return postApi('/api/users/login', {user});
}

export {registerUserApi, loginApi}