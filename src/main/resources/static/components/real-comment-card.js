import {realApi} from "../services/real-api.js";
import realActions from "../services/real-actions.js";
import {iconCdn} from "../css/icon.js";

const style = `<style>
        
</style>`;

const getTemplate = (comment) => {
    console.log('real-comment-card::getTemplate(): comment:', comment);

    return `
        ${iconCdn}
        <link rel="stylesheet" href="/css/real.css" />
        ${style}
        
        <div class="card">
          <div class="card-block">
            <p class="card-text">
              With supporting text below as a natural lead-in to additional content.
            </p>
          </div>
          <div class="card-footer">
            <a href="/profile/author" class="comment-author">
              <img src="https://api.realworld.io/images/demo-avatar.png" class="comment-author-img" />
            </a>
            &nbsp;
            <a href="/profile/jacob-schmidt" class="comment-author">Jacob Schmidt</a>
            <span class="date-posted">Dec 29th</span>
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
    }

    async connectedCallback() {
        console.log('real comment card  connectedCallback()');

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

    searchTag(evt) {
        evt.preventDefault();

        console.log('real-comment-card::searchTag(): evt.target.innerText:', evt.target.innerText);
        realActions.addAction('tag', evt.target.innerText);
    }
}

customElements.define('real-comment-card', RealCommentCard);
export {RealCommentCard}