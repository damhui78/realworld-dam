const registerUserApi = async (user) => {
    console.log('registerUserApi user : ', user);

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
    });
        // .then(response => response.json())
        // .catch(console.error);

    return await response.json();
}

const loginApi = async (user) => {
    console.log('loginApi user : ', user);

    const resnose = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
    });
        // .then(response => response.json())
        // .catch(console.error);

    return await resnose.json();
}

export {registerUserApi, loginApi}