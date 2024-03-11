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
            <ul id="tabs" class="nav nav-pills outline-active">
                <li class="nav-item">
                    <a class="nav-link active" href="">Global Feed</a>
                </li>
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
        this.actions = ['changeTab', 'changeActiveTab', 'getArticles', 'movePage'];
    }

    init() {
        this.terms = '';
        this.tabs = this.shadowRoot.querySelector('#tabs');
        this.divArticles = this.shadowRoot.querySelector('#article-preview-list');
        this.pagination = this.shadowRoot.querySelector('real-pagination');

        this.loginUser = realStorage.retrieve('user');
        const tabs = this.loginUser ?  ['Your Feed', 'Global Feed'] : ['Global Feed'];
        actionHandler.addAction({type: 'changeTab', data: {tabTitles: tabs, activeTabTitle: 'Global Feed'}, storeType: 'tabTitles'});
    }

    connectedCallback() {
        console.log('real-tab::connectedCallback(): 0:', 0);

        this.init();
        this.setTabEvent('.nav-link');

        actionHandler.addListener(this.actions, this);
    }
    disconnectedCallback() {
        console.log('real-tab::disconnectedCallback(): 0:', 0);

        actionHandler.removeListener(this.actions, this);
    }

    callbackAction(actionType, result) {
        console.log('real-tab::callbackAction(): actionType:', actionType);
        console.log('real-tab::callbackAction(): result:', result);

        const cbActions = {
            changeTab: this.changeTabCallback,
            changeActiveTab: this.changeActiveTabCallback,
            getArticles: this.getArticlesCallback,
            movePage: this.movePageCallback,
        }
        cbActions[actionType] && cbActions[actionType](result);
    }
    changeTabCallback = (result) => {
        console.log('real-tab::changeTabCallback(): result:', result);

        let terms = '';

        switch (result.activeTabTitle.startsWith('#') ? '#' : result.activeTabTitle) {
            case 'Global Feed':
                terms = '';
                break;
            case 'Your Feed':
                terms = `feed`;
                break;
            case '#':
                terms = `tag=${result.activeTabTitle.substring(1)}`;
                break;
            case 'My Articles':
                terms = `author=${this.loginUser?.user.username}`;
                break;
            case 'Favorited Articles':
                terms = `favorited=${this.loginUser?.user.username}`;
                break;
            default:
                terms = '';
        }
        this.tabs.innerHTML = result.tabTitles.map(item => `<li class="nav-item">
                <a class="nav-link ${item === result.activeTabTitle ? 'active' : ''}" data-terms="${terms}" href="">${item}</a>
            </li>`).join('');
        this.setTabEvent('.nav-link');
        this.searchArticles(terms);
    }
    changeActiveTabCallback = (result) => {
        console.log('real-tab::changeActiveTabCallback(): result:', result);

        const target = Array.from(this.shadowRoot.querySelectorAll('.nav-link'))
            .find(item => item.innerText === result.activeTabTitle);
        this.setTabUnderline(target);
        this.searchArticles(target.dataset.terms);
    }
    getArticlesCallback = (result) => {
        console.log('real-tab::getArticlesCallback(): result:', result);

        this.setArticles(result);
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

        console.log('real-tab::searchArticlesByTabClick(): evt.target.innerText:', evt.target.innerText);
        console.log('real-tab::searchArticlesByTabClick(): evt.target.dataset.terms:', evt.target.dataset.terms);

        if (evt.target.innerText.startsWith('#') || realStorage.retrieve('tabTitles').find(item => item.startsWith('#'))?.length < 1) {
            actionHandler.addAction({type: 'changeActiveTab', data: {activeTabTitle: evt.target.innerText}});
        } else {
            actionHandler.addAction({type: 'changeTab', data: {tabTitles: this.loginUser ? ['Your Feed', 'Global Feed'] : ['Global Feed'], activeTabTitle: evt.target.innerText}, storeType: 'tabTitles'});
        }
    }

    setTabUnderline(target) {
        this.shadowRoot.querySelector('.nav-link.active')
            ?.classList.remove('active');

        target?.classList.add('active');
    }

    searchArticles(terms) {
        this.terms = terms;
        actionHandler.addAction({type: 'getArticles', data: {terms}, storeType: 'articles'});
    }

}

customElements.define('real-tab', RealTab);
export {RealTab}