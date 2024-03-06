import {RealArticleMeta} from "../components/real-article-meta.js";
import {RealCommentList} from "../components/real-comment-list.js";
import {actionHandler} from "../services/action-handler.js";
import {realStorage} from "../services/real-storage.js";

const style = `<style>
        
</style>`;

const getTemplate = (article) => {
    return `
        <link rel="stylesheet" href="/css/real.css" />
        ${style}
        
        <div class="article-page">
          <div class="banner">
            <div class="container">
              <h1>
                ${article.title}
              </h1>
              
              <real-article-meta slug="${article.slug}"></real-article-meta>
            </div>
          </div>
        
          <div class="container page">
            <div class="row article-content">
              <div class="col-md-12">
                <p>
                  ${article.body}
                </p>
                <ul class="tag-list">
                  ${article.tagList.map(tag => `<li class="tag-default tag-pill tag-outline">${tag}</li>`).join('')}
                </ul>
              </div>
            </div>
        
            <hr />
        
            <div class="article-actions">
              <real-article-meta slug="${article.slug}"></real-article-meta>
            </div>
        
            <real-comment-list slug="${article.slug}"></real-comment-list>
          </div>
        </div>
    `;
}

class ArticlePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.init();
        this.shadowRoot.innerHTML = getTemplate(this.article);
    }

    init() {
        const slug = this.getAttribute('param');
        this.article = realStorage.getArticleBySlug(slug);
    }

    connectedCallback() {
        console.log('article-page::connectedCallback(): 0:', 0);

        this.init();
    }
}

customElements.define('article-page', ArticlePage);
export {ArticlePage}