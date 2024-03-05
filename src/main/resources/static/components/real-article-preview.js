import {realStorage} from "../services/real-storage.js";
import {realApi} from "../services/real-api.js";
import {iconCdn} from "../css/icon.js";


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
                <a href="/profile/${username}"><img src="${article.author.image}"></a>
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
        this.loginUser = realStorage.retrieve('user');
        this.slug = this.getAttribute('slug');
        const article = realStorage.getArticleBySlug(this.slug);

        this.shadowRoot.innerHTML = getTemplate(article);

        this.findElements();
        this.setEventHandler();
    }

    connectedCallback() {
        console.log('real article preview  connectedCallback()');
    }

    findElements() {
        this.btnFavorite = this.shadowRoot.querySelector('button');
        this.aArticleLink = this.shadowRoot.querySelector('.preview-link');
    }

    setEventHandler() {
        this.btnFavorite.addEventListener('click', this.clickFavoriteArticle);
        this.aArticleLink.addEventListener('click', this.moveArticlePage);
    }

    clickFavoriteArticle = async (evt) => {
        evt.preventDefault();

        if (!this.loginUser) {
            const realNavbar = document.querySelector('real-navbar');
            realNavbar.goLogin();
            return;
        }

        const evtTarget = evt.target;

        const result = evtTarget.classList.contains('active')
            ? await realApi.unFavoriteArticle(this.slug)
            : await realApi.favoriteArticle(this.slug);

        evtTarget.classList.toggle('active');

        const btnFavorite = this.shadowRoot.querySelector('button');
        btnFavorite.innerHTML = `<i class="ion-heart"></i> ${result.article.favoritesCount}`;
    }

    render() {
    }

    moveArticlePage = (evt) => {
        evt.preventDefault();
        console.log('real-article-preview::moveArticlePage(): evt.target:', evt.target);

        const realRouter = document.querySelector('real-router');
        realRouter.render('article');
    }
}

customElements.define('real-article-preview', RealArticlePreview);
export {RealArticlePreview}
