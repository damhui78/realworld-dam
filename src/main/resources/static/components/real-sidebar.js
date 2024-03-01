import {realApi} from "../services/real-api.js";
import realActions from "../services/real-actions.js";

const style = `<style>
        
</style>`;

const getTemplate = (tags) => {
    console.log('real-sidebar::getTemplate(): tags:', tags);

    return `
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        ${style}
        
        <div class="sidebar">
            <p>Popular Tags</p>
    
            <div class="tag-list">
                ${tags.map(tag => `<a href="" class="tag-pill tag-default">${tag}</a>`).join('')}
            </div>
        </div>
    `;
}

class RealSidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        console.log('real sidebar  connectedCallback()');

        const data = await realApi.getTags();
        const tags = data.tags;
        console.log('real-sidebar::connectedCallback(): tags:', tags);
        this.shadowRoot.innerHTML = getTemplate(tags);

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

        console.log('real-sidebar::searchTag(): evt.target.innerText:', evt.target.innerText);
        realActions.addAction('tag', evt.target.innerText);
    }
}

customElements.define('real-sidebar', RealSidebar);
export {RealSidebar}