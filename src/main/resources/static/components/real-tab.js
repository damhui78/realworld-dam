import {RealArticlePreview} from "./real-article-preview.js";
import {realStorage} from "../services/real-storage.js";
import {RealPagination} from "./real-pagination.js";
import {actionHandler} from "../services/action-handler.js";

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
        this.actions = ['getArticles', 'passTag', 'movePage'];
    }

    init() {
        this.terms = '';
        this.divYourFeed = this.shadowRoot.querySelector('#your-feed');
        this.divArticles = this.shadowRoot.querySelector('#article-preview-list');
        this.divSearch = this.shadowRoot.querySelector('#search-feed');
        this.pagination = this.shadowRoot.querySelector('real-pagination');

        const loginUser = realStorage.retrieve('user');

        if (loginUser) {
            this.divYourFeed.innerHTML = `<li class="nav-item"><a class="nav-link" href="" data-terms="author=${loginUser.user.username}">Your Feed</a></li>`;
        }
    }

    connectedCallback() {
        console.log('real-tab::connectedCallback(): 0:', 0);

        this.init();
        this.setTabEvent('.nav-link');

        actionHandler.addListener(this.actions, this);
        actionHandler.addAction({type: 'getArticles', data: {}, storeType: 'articles'});
    }
    disconnectedCallback() {
        console.log('real-tab::disconnectedCallback(): 0:', 0);

        actionHandler.removeListener(this.actions, this);
    }

    callbackAction(actionType, result) {
        console.log('real-tab::callbackAction(): actionType:', actionType);
        console.log('real-tab::callbackAction(): result:', result);

        const cbActions = {
            getArticles: this.getArticlesCallback,
            passTag: this.passTagCallback,
            movePage: this.movePageCallback,
        }
        cbActions[actionType] && cbActions[actionType](result);
    }
    getArticlesCallback = (result) => {
        console.log('real-tab::getArticlesCallback(): result:', result);

        this.setArticles(result);
    }
    passTagCallback = (tag) => {
        this.setTabUnderline();
        this.divSearch.innerHTML = `<li class="nav-item"><a class="nav-link active" href="" data-terms="tag=${tag}">#${tag}</a></li>`;
        this.setTabEvent('.nav-link.active');
        this.searchArticles(`tag=${tag}`);
    }
    movePageCallback = (pageNo) => {
        actionHandler.addAction({type: 'getArticles', data: {terms: this.terms, pageNo}, storeType: 'articles'});
    }

    setArticles(data) {
        this.divArticles.innerHTML = data.articles.map(article => `<real-article-preview slug="${article.slug}"></real-article-preview>`).join('');
        this.pagination.setPagination(data.totalPages, data.currentPageNo);
    }

    setTabEvent(selector) {
        this.shadowRoot.querySelectorAll(selector)
            .forEach(item => item.addEventListener('click', this.searchArticlesByTabClick));
    }
    searchArticlesByTabClick = (evt) => {
        evt.preventDefault();

        if (!evt.target.innerText.startsWith('#')) this.divSearch.innerHTML = '';

        this.setTabUnderline(evt.target);

        console.log('real-tab::searchArticlesByTabClick(): evt.target.dataset.terms:', evt.target.dataset.terms);
        this.searchArticles(evt.target.dataset.terms);
    }

    setTabUnderline(target) {
        this.shadowRoot.querySelector('.nav-link.active')
            ?.classList.remove('active');

        target?.classList.add('active');

        // const aLinks = this.shadowRoot.querySelectorAll('.nav-link');
        // aLinks.forEach(item => item.classList.remove('active'));
        // if(target) target.classList.add('active');
    }

    searchArticles(terms) {
        this.terms = terms;
        actionHandler.addAction({type: 'getArticles', data: {terms}, storeType: 'articles'});
    }

}

customElements.define('real-tab', RealTab);
export {RealTab}