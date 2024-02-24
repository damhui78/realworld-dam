import {HomePage} from "../pages/home-page.js";
import {LoginPage} from "../pages/login-page.js";
import {RegisterPage} from "../pages/register-page.js";

const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        ${style}
        
        <div>
            <home-page></home-page>
        </div>
    `;
}

class realRouter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();

        this.findElements();
        this.setEventHandler();
    }

    connectedCallback() {
        console.log('real router  connectedCallback()')
    }

    findElements() {
        this.divTag = this.shadowRoot.querySelector('div');
    }

    setEventHandler() {

    }

    render(page_name) {
        console.log('test param : ', page_name);
        this.divTag.innerHTML = `<${page_name}-page></${page_name}-page>`;
    }
}

customElements.define('real-router', realRouter);
export {realRouter}
