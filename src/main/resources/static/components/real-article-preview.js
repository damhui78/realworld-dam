import {realStorage} from "../services/real-storage.js";
import {iconCdn} from "../css/icon.js";
import {actionHandler} from "../services/action-handler.js";


const style = `<style>
        
</style>`;

const getTemplate = (article) => {
    const username = article.author.username;

    return `
        ${iconCdn}
        <link rel="stylesheet" href="/css/real.css" />
        ${style}
        
        <div class="article-preview">
            <div class="article-meta">
                <a href="/profile/${username}" class="author"><img src="${article.author.image}"></a>
                <div class="info">
                    <a href="/profile/${username}" class="author">${username}</a>
                    <span class="date">${article.createdAt}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right ${article.favorited ? 'active' : ''}">
                    <i class="ion-heart"></i> ${article.favoritesCount}
                </button>
            </div>
            <a href="/article/how-to-build-webapps-that-scale" class="preview-link">
                <h1>${article.title}</h1>
                <p>${article.description}</p>
                <span>Read more...</span>
                <ul class="tag-list">
                    ${article.tagList.map(tag => `<li class="tag-default tag-pill tag-outline">${tag}</li>`).join('')}
                </ul>
            </a>
        </div>
    `;
}

class RealArticlePreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.init();
        this.shadowRoot.innerHTML = getTemplate(this.article);
        this.actions = ['favoriteArticle', 'unfavoriteArticle'];
    }

    init() {
        this.router = document.querySelector('real-router');
        this.loginUser = realStorage.retrieve('user');
        this.slug = this.getAttribute('slug');
        this.article = realStorage.getArticleBySlug(this.slug);
    }

    connectedCallback() {
        console.log('real-article-preview::connectedCallback(): 0:', 0);

        this.setEvent();

        actionHandler.addListener(this.actions, this);
    }
    disconnectedCallback() {
        console.log('real-article-preview::disconnectedCallback(): 0:', 0);

        actionHandler.removeListener(this.actions, this);
    }

    setEvent() {
        this.btnFavorite = this.shadowRoot.querySelector('button');
        this.aArticleLink = this.shadowRoot.querySelector('.preview-link');
        this.aAuthorLinks = this.shadowRoot.querySelectorAll('.author');

        this.btnFavorite.addEventListener('click', this.clickFavoriteArticle);
        this.aArticleLink.addEventListener('click', this.moveArticlePage);
        this.aAuthorLinks.forEach(item => item.addEventListener('click', this.moveProfilePage));
    }

    clickFavoriteArticle = (evt) => {
        evt.preventDefault();

        if (!this.loginUser) {
            const realNavbar = document.querySelector('real-navbar');
            realNavbar.goLogin();
            return;
        }

        evt.target.classList.contains('active')
            ? actionHandler.addAction({type: 'unfavoriteArticle', data: {slug: this.slug}})
            : actionHandler.addAction({type: 'favoriteArticle', data: {slug: this.slug}});
    }

    moveArticlePage = (evt) => {
        evt.preventDefault();

        this.router.render('article', this.slug);
    }

    moveProfilePage = (evt) => {
        evt.preventDefault();

        this.router.render('profile', this.article.author.username);
    }

    callbackAction(actionType, result) {
        console.log('real-tab::callbackAction(): actionType:', actionType);
        console.log('real-tab::callbackAction(): result:', result);

        const cbActions = {
            favoriteArticle: this.favoriteArticleCallback,
            unfavoriteArticle: this.favoriteArticleCallback,
        }
        cbActions[actionType] && cbActions[actionType](result);
    }
    favoriteArticleCallback = (result) => {
        console.log('real-article-preview::favoriteArticleCallback(): result:', result);
        if (result.article.slug !== this.slug) return;

        this.btnFavorite.classList.toggle('active');
        this.btnFavorite.innerHTML = `<i class="ion-heart"></i> ${result.article.favoritesCount}`;
    }

}

customElements.define('real-article-preview', RealArticlePreview);
export {RealArticlePreview}
