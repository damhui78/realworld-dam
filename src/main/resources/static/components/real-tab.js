import {RealArticlePreview} from "./real-article-preview.js";
import {realStore} from "../services/real-store.js";
import {realApi} from "../services/real-api.js";
import realActions from "../services/real-actions.js";

const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        ${style}
        
        <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
                <div id="your-feed"></div>
                <li class="nav-item">
                    <a class="nav-link active" href="">Global Feed</a>
                </li>
                <div id="search-feed"></div>
            </ul>
        </div>
        
        <div id="article-preview-list"></div>
        
        <ul class="pagination">
            <li class="page-item active">
                <a class="page-link" href="">1</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="">2</a>
            </li>
        </ul>
    `;
}

class RealTab extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();

        this.findElements();
        this.setEventHandler();
    }

    async connectedCallback() {
        console.log('real tab  connectedCallback()');

        const data = await realApi.getArticles();
        realStore.saveArticles(data.articles);

        this.render(data.articles);
        this.setTabEvent('.nav-link');

        realActions.addTagCallback(this.callbackTag);
    }

    findElements() {
        this.divYourFeed = this.shadowRoot.querySelector('#your-feed');
        this.divArticles = this.shadowRoot.querySelector('#article-preview-list');
        this.divSearch = this.shadowRoot.querySelector('#search-feed');
    }

    setEventHandler() {

    }

    setTabEvent(selector) {
        const tabs = Array.from(this.shadowRoot.querySelectorAll(selector));
        tabs.forEach(item => item.addEventListener('click', this.searchArticlesByEvent));
    }

    searchArticlesByEvent = (evt) => {
        evt.preventDefault();

        this.divSearch.innerHTML = '';

        this.setTabUnderline(evt.target);

        console.log('real-tab::searchArticlesByEvent(): evt.target.dataset.terms:', evt.target.dataset.terms);
        this.searchArticles(evt.target.dataset.terms);
    }
    setTabUnderline(target) {
        const aLinks = this.shadowRoot.querySelectorAll('.nav-link');
        aLinks.forEach(item => item.classList.remove('active'));
        if(target) target.classList.add('active');
    }
    async searchArticles(terms) {
        const data = await realApi.getArticles(terms);
        realStore.saveArticles(data.articles);
        this.divArticles.innerHTML = data.articles.map(article => `<real-article-preview slug="${article.slug}"></real-article-preview>`).join('');
    }


    render(articles) {
        const loginUser = realStore.getUser();

        if (loginUser) {
            console.log('real-tab::render(): loginUser.user.username:', loginUser.user.username);
            this.divYourFeed.innerHTML = `<li class="nav-item"><a class="nav-link" href="" data-terms="author=${loginUser.user.username}">Your Feed</a></li>`;
        }

        this.divArticles.innerHTML = articles.map(article => `<real-article-preview slug="${article.slug}"></real-article-preview>`).join('');
    }

    callbackTag = (action) => {
        console.log('real-tab::callbackTag(): action:', action);
        this.setTabUnderline();
        this.divSearch.innerHTML = `<li class="nav-item"><a class="nav-link active" href="" data-terms="${action.type}=${action.value}">#${action.value}</a></li>`;
        this.setTabEvent('.nav-link.active');
        this.searchArticles(`${action.type}=${action.value}`);
    }
}

customElements.define('real-tab', RealTab);
export {RealTab}