class RealStorage extends Map {

    constructor() {
        super();
    }

    store = (key, value) => {
        this.set(key, value);
    }
    retrieve = (key) => {
        return this.get(key);
    }
    remove = (key) => {
        this.delete(key);
    }

    getArticleBySlug = (slug) => {
        return this.retrieve('articles')?.find(article => article.slug === slug);
    }

}

const realStorage = new RealStorage();

export {realStorage}