import {RealCommentCard} from "./real-comment-card.js";
import {actionHandler} from "../services/action-handler.js";
import {realStorage} from "../services/real-storage.js";

const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
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
          </div>
        </div>
    `;
}

class RealCommentList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();
        this.actions = ['getComments', 'addComment', 'deleteComment'];
    }
    
    init() {
        this.router = document.querySelector('real-router');
        this.loginUser = realStorage.retrieve('user');
        this.slug = this.getAttribute('slug');
        this.textareaBody = this.shadowRoot.querySelector('textarea');
        this.shadowRoot.querySelector('button')
            .addEventListener('click', this.addComment);
        this.divComments = this.shadowRoot.querySelector('#article-comment-list');
    }

    connectedCallback() {
        console.log('real-comment-list::connectedCallback(): 0:', 0);

        this.init();

        actionHandler.addListener(this.actions, this);
        actionHandler.addAction({type: 'getComments', data: {slug: this.slug}, storeType: 'comments'});
    }
    disconnectedCallback() {
        console.log('real-comment-list::disconnectedCallback(): 0:', 0);

        actionHandler.removeListener(this.actions, this);
    }

    addComment = (evt) => {
        evt.preventDefault();

        if (!this.loginUser) {
            this.router.render('login');
            return;
        }

        const comment = {
            body: this.textareaBody.value
        };
        actionHandler.addAction({type: 'addComment', data: {slug: this.slug, comment}});
    }

    callbackAction(actionType, result) {
        console.log('real-comment-list::callbackAction(): actionType:', actionType);
        console.log('real-comment-list::callbackAction(): result:', result);

        const cbActions = {
            getComments: this.getCommentsCallback,
            addComment: this.addCommentCallback,
            deleteComment: this.deleteCommentCallback,
        }
        cbActions[actionType] && cbActions[actionType](result);
    }
    getCommentsCallback = (result) => {
        console.log('real-comment-list::getCommentsCallback(): result:', result);

        this.divComments.innerHTML = result.comments.map(comment => `<real-comment-card slug="${this.slug}" id="${comment.id}"></real-comment-card>`).join('');
    }
    addCommentCallback = (result) => {
        console.log('real-comment-list::addCommentCallback(): result:', result);

        this.textareaBody.value = '';
        actionHandler.addAction({type: 'getComments', data: {slug: this.slug}, storeType: 'comments'});
    }
    deleteCommentCallback = (result) => {
        console.log('real-comment-list::deleteCommentCallback(): result:', result);

        actionHandler.addAction({type: 'getComments', data: {slug: this.slug}, storeType: 'comments'});
    }

}

customElements.define('real-comment-list', RealCommentList);
export {RealCommentList}