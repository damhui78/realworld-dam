import {iconCdn} from "../css/icon.js";
import {realStorage} from "../services/real-storage.js";
import {actionHandler} from "../services/action-handler.js";

const style = `<style>
        
</style>`;

const getTemplate = (comment, isMyComment) => {
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
              ${isMyComment ? '<i class="ion-trash-a"></i>' : ''}
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
        this.shadowRoot.innerHTML = getTemplate(this.comment, this.isMyComment);
    }

    init() {
        this.loginUser = realStorage.retrieve('user');
        this.slug = this.getAttribute('slug');
        const id = this.getAttribute('id');
        this.comment = realStorage.getCommentById(id);
        this.isMyComment = this.comment.author.username === this.loginUser?.user.username;
    }

    connectedCallback() {
        console.log('real-comment-card::connectedCallback(): 0:', 0);

        this.shadowRoot.querySelector('i')
            .addEventListener('click', this.deleteComment);
    }
    disconnectedCallback() {
    }

    deleteComment = (evt) => {
        evt.preventDefault();

        actionHandler.addAction({type: 'deleteComment', data: {slug: this.slug, id: this.comment.id}});
    }

}

customElements.define('real-comment-card', RealCommentCard);
export {RealCommentCard}