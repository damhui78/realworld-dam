import {ArticlePage} from "../pages/article-page.js";
import {LoginPage} from "../pages/login-page.js";
import {RegisterPage} from "../pages/register-page.js";

const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        ${style}
        
        <div>
            <article-page></article-page>
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
        if (page_name === 'login') {
            this.divTag.innerHTML = '<login-page></login-page>';
        } else if (page_name === 'register') {
            this.divTag.innerHTML = '<register-page></register-page>';
        } else {
            this.divTag.innerHTML = '<article-page></article-page>';
        }
    }
}

customElements.define('real-router', realRouter);
export {realRouter}
