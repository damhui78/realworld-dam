import {RealCommentCard} from "./real-comment-card.js";
import {actionHandler} from "../services/action-handler.js";

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
        this.actions = ['getComments'];
    }
    
    init() {
        this.slug = this.getAttribute('slug');
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

    callbackAction(actionType, result) {
        console.log('real-comment-list::callbackAction(): actionType:', actionType);
        console.log('real-comment-list::callbackAction(): result:', result);

        const cbActions = {
            getComments: this.getCommentsCallback,
        }
        cbActions[actionType] && cbActions[actionType](result);
    }
    getCommentsCallback = (result) => {
        console.log('real-comment-list::getCommentsCallback(): result:', result);

        this.setComments(result);
    }

    setComments(data) {
        this.divComments.innerHTML = data.comments.map(comment => `<real-comment-card id="${comment.id}"></real-comment-card>`).join('');
    }

}

customElements.define('real-comment-list', RealCommentList);
export {RealCommentList}