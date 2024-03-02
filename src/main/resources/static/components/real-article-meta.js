import {realApi} from "../services/real-api.js";
import realActions from "../services/real-actions.js";

const style = `<style>
        
</style>`;

const getTemplate = (meta) => {
    console.log('real-article-meta::getTemplate(): meta:', meta);

    return `
        <link rel="stylesheet" href="/css/real.css" />
        ${style}
        
        <div class="article-meta">
          <a href="/profile/eric-simons"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
          <div class="info">
            <a href="/profile/eric-simons" class="author">Eric Simons</a>
            <span class="date">January 20th</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons <span class="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(29)</span>
          </button>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-edit"></i> Edit Article
          </button>
          <button class="btn btn-sm btn-outline-danger">
            <i class="ion-trash-a"></i> Delete Article
          </button>
        </div>
    `;
}

class RealArticleMeta extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        console.log('real article meta  connectedCallback()');

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

        console.log('real-article-meta::searchTag(): evt.target.innerText:', evt.target.innerText);
        realActions.addAction('tag', evt.target.innerText);
    }
}

customElements.define('real-article-meta', RealArticleMeta);
export {RealArticleMeta}