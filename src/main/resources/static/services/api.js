const postApi = async (url, param) => {
    console.log('postApi param : ', param);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
    });
    // .then(response => response.json())
    // .catch(console.error);

    return await response.json();
}

const registerUserApi = (user) => {
    return postApi('/api/users', user);
}

const loginApi = (user) => {
    return postApi('/api/users/login', {user});
}

export {registerUserApi, loginApi}