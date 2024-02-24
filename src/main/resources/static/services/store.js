const store = new Map();

const saveUser = (user) => {
    store.set('user', user);
    console.log('store : ', store);
}

const getUser = () => {
    return store.get('user');
}

export {saveUser, getUser}