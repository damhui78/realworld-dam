import {RealArticlePreview} from "./real-article-preview.js";
import {realStore} from "../services/real-store.js";
import {realApi} from "../services/real-api.js";

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
        this.articles = data.articles;

        console.log('home-page::connectedCallback(): this.articles:', this.articles);

        this.render();
    }

    findElements() {
        this.divYourFeed = this.shadowRoot.querySelector('#your-feed');
        this.divArticles = this.shadowRoot.querySelector('#article-preview-list');
        this.divSearch = this.shadowRoot.querySelector('#search-feed');
    }

    setEventHandler() {
    }

    render() {
        const loginUser = realStore.getUser();

        if (loginUser) {
            this.divYourFeed.innerHTML = `<li class="nav-item"><a class="nav-link" href="">Your Feed</a></li>`;
        }

        this.divArticles.innerHTML = this.articles.map(article => `<real-article-preview slug="${article.slug}"></real-article-preview>`).join('');
    }
}

customElements.define('real-tab', RealTab);
export {RealTab}