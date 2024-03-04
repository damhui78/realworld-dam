import {RealCommentCard} from "./real-comment-card.js";

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
            <real-comment-card id=""></real-comment-card>
          </div>
        </div>
    `;
}

class RealCommentList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();
    }

    connectedCallback() {
    }
    disconnectedCallback() {
    }

}

customElements.define('real-comment-list', RealCommentList);
export {RealCommentList}