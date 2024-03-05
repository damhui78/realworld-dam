import {iconCdn} from "../css/icon.js";
import {realStorage} from "../services/real-storage.js";

const style = `<style>
        
</style>`;

const getTemplate = (comment) => {
    return `
        ${iconCdn}
        <link rel="stylesheet" href="/css/real.css" />
        ${style}
        
        <div class="card">
          <div class="card-block">
            <p class="card-text">
              ${comment.body}
            </p>
          </div>
          <div class="card-footer">
            <a href="/profile/author" class="comment-author">
              <img src="https://api.realworld.io/images/demo-avatar.png" class="comment-author-img" />
            </a>
            &nbsp;
            <a href="/profile/jacob-schmidt" class="comment-author">${comment.author.username}</a>
            <span class="date-posted">${comment.createdAt}</span>
            <span class="mod-options">
              <i class="ion-trash-a"></i>
            </span>
          </div>
        </div>
    `;
}

class RealCommentCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.init();
        this.shadowRoot.innerHTML = getTemplate(this.comment);
    }

    init() {
        const id = this.getAttribute('id');
        this.comment = realStorage.getCommentById(id);
    }

    connectedCallback() {
    }
    disconnectedCallback() {
    }

}

customElements.define('real-comment-card', RealCommentCard);
export {RealCommentCard}