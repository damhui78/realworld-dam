class RealStorage extends Map {

    constructor() {
        super();
    }

    saveUser = (user) => {
        this.set('user', user);
    }
    getUser = () => {
        return this.get('user');
    }
    deleteUser = () => {
        this.delete('user');
    }

    saveArticles = (articles) => {
        this.set('articles', articles);
    }
    getArticles = () => {
        return this.get('articles');
    }
    getArticleBySlug = (slug) => {
        return this.getArticles().find(article => article.slug === slug);
    }

}

const realStorage = new RealStorage();

export {realStorage}