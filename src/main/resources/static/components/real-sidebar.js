import {actionHandler} from "../services/action-handler.js";

const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        ${style}
        
        <div class="sidebar">
            <p>Popular Tags</p>
    
            <div class="tag-list">
            </div>
        </div>
    `;
}

class RealSidebar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();
        this.actions = ['getTags'];
    }

    connectedCallback() {
        console.log('real-sidebar::connectedCallback(): 0:', 0);

        actionHandler.addListener(this.actions, this);
        actionHandler.addAction({type: 'getTags', data: {}});
    }
    disconnectedCallback() {
        console.log('real-sidebar::disconnectedCallback(): 0:', 0);

        actionHandler.removeListener(this.actions, this);
    }

    callbackAction(actionType, result) {
        console.log('real-tab::callbackAction(): actionType:', actionType);
        console.log('real-tab::callbackAction(): result:', result);

        const cbActions = {
            getTags: this.getTagsCallback,
        }
        cbActions[actionType](result);
    }
    getTagsCallback = (result) => {

        this.setTags(result);
    }

    setTags(data) {
        console.log('real-sidebar::setTags(): data:', data);

        const divTags = this.shadowRoot.querySelector('.tag-list');
        divTags.innerHTML = data.tags.map(tag => `<a href="" class="tag-pill tag-default">${tag}</a>`).join('');

        this.setEvent();
    }

    setEvent() {
        const aLinks = this.shadowRoot.querySelectorAll('a');
        aLinks.forEach(item => item.addEventListener('click', this.passTag));
    }

    passTag(evt) {
        evt.preventDefault();

        console.log('real-sidebar::passTag(): evt.target.innerText:', evt.target.innerText);
        actionHandler.addAction({type: 'passTag', data: {tag: evt.target.innerText}});
    }

}

customElements.define('real-sidebar', RealSidebar);
export {RealSidebar}