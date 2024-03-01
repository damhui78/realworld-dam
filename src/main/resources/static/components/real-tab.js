import {RealArticlePreview} from "./real-article-preview.js";
import {realStore} from "../services/real-store.js";
import {realApi} from "../services/real-api.js";
import realActions from "../services/real-actions.js";
import {RealPagination} from "./real-pagination.js";

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
        
        <real-pagination></real-pagination>
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

        this.terms = '';
        const data = await realApi.getArticles();
        console.log('real-tab::connectedCallback(): data:', data);
        
        realStore.saveArticles(data.articles);

        this.render(data.articles);
        this.pagination = this.shadowRoot.querySelector('real-pagination');
        this.pagination.setPagination(data.totalPages, data.currentPageNo);
        this.setTabEvent('.nav-link');

        realActions.addCallback('tag', this.callbackTag);
        realActions.addCallback('articlePaging', this.callbackArticlePaging);
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
        this.terms = terms;
        const data = await realApi.getArticles(terms);
        console.log('real-tab::searchArticles(): data:', data);
        
        this.setArticles(data);
    }

    setArticles(data) {
        realStore.saveArticles(data.articles);
        this.divArticles.innerHTML = data.articles.map(article => `<real-article-preview slug="${article.slug}"></real-article-preview>`).join('');
        this.pagination.setPagination(data.totalPages, data.currentPageNo);
    }


    render(articles) {
        const loginUser = realStore.getUser();

        if (loginUser) {
            console.log('real-tab::render(): loginUser.user.username:', loginUser.user.username);
            this.divYourFeed.innerHTML = `<li class="nav-item"><a class="nav-link" href="" data-terms="author=${loginUser.user.username}">Your Feed</a></li>`;
        }

        this.divArticles.innerHTML = articles.map(article => `<real-article-preview slug="${article.slug}"></real-article-preview>`).join('');
    }

    callbackTag = (value) => {
        this.setTabUnderline();
        this.divSearch.innerHTML = `<li class="nav-item"><a class="nav-link active" href="" data-terms="tag=${value}">#${value}</a></li>`;
        this.setTabEvent('.nav-link.active');
        this.searchArticles(`tag=${value}`);
    }

    callbackArticlePaging = async (value) => {
        const data = await realApi.getArticles(this.terms, value);
        this.setArticles(data);
    }
}

customElements.define('real-tab', RealTab);
export {RealTab}