import {realStore} from "../services/real-store.js";
import {realApi} from "../services/real-api.js";

const style = `<style>
        
</style>`;

const getTemplate = (article) => {
    const username = article.author.username

    return `
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
                    <i class="ion-heart"></i> 29
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
        this.loginUser = realStore.getUser();
        this.slug = this.getAttribute('slug');
        const article = realStore.getArticleBySlug(this.slug);

        this.shadowRoot.innerHTML = getTemplate(article);

        this.findElements();
        this.setEventHandler();
    }

    connectedCallback() {
        console.log('real article preview  connectedCallback()');
    }

    findElements() {
        this.btnFavorite = this.shadowRoot.querySelector('button');
    }

    setEventHandler() {
        this.btnFavorite.addEventListener('click', this.clickFavoriteArticle);
    }

    clickFavoriteArticle = async (evt) => {
        evt.preventDefault();

        if (!this.loginUser) {
            const realNavbar = document.querySelector('real-navbar');
            realNavbar.goLogin();
            return;
        }

        const evtTarget = evt.target;
        if (evtTarget.classList.contains('active')) {
            await realApi.unFavoriteArticle(this.slug);
        } else {
            await realApi.favoriteArticle(this.slug);
        }
        evtTarget.classList.toggle('active');
    }

    render() {
    }
}

customElements.define('real-article-preview', RealArticlePreview);
export {RealArticlePreview}
