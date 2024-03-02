import {realApi} from "../services/real-api.js";
import realActions from "../services/real-actions.js";
import {RealCommentCard} from "./real-comment-card.js";
import {iconCdn} from "../css/icon.js";
import {realStore} from "../services/real-store";

const style = `<style>
        
</style>`;

const getTemplate = (comments) => {
    console.log('real-comment-list::getTemplate(): comments:', comments);

    return `
        ${iconCdn}
        <link rel="stylesheet" href="/css/real.css" />
        ${style}
        
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <form class="card comment-form">
              <div class="card-block">
                <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
              </div>
              <div class="card-footer">
                <img src="https://api.realworld.io/images/demo-avatar.png" class="comment-author-img" />
                <button class="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>
            <div id="article-comment-list"></div>
            <real-comment-card id=""></real-comment-card>
          </div>
        </div>
    `;
}

class RealCommentList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        console.log('real comment list  connectedCallback()');

        this.shadowRoot.innerHTML = getTemplate();

        this.findElements();
        this.setEventHandler();
    }

    findElements() {
        this.aLinks = this.shadowRoot.querySelectorAll('a');
    }

    setEventHandler() {
        this.aLinks.forEach(item => item.addEventListener('click', this.searchTag));
    }

    setArticles(data) {
        realStore.saveArticles(data.articles);
        this.divArticles.innerHTML = data.articles.map(article => `<real-article-preview slug="${article.slug}"></real-article-preview>`).join('');
        this.pagination.setPagination(data.totalPages, data.currentPageNo);
    }
}

customElements.define('real-comment-list', RealCommentList);
export {RealCommentList}