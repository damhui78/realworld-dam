import {HomePage} from "../pages/home-page.js";
import {LoginPage} from "../pages/login-page.js";
import {RegisterPage} from "../pages/register-page.js";
import {EditorPage} from "../pages/editor-page.js";
import {SettingsPage} from "../pages/settings-page.js";
import {ProfilePage} from "../pages/profile-page.js";
import {ArticlePage} from "../pages/article-page.js";

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

class RealRouter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();
    }

    connectedCallback() {
        console.log('real router  connectedCallback()')
    }

    render(page_name, param) {
        console.log('page_name : ', page_name);

        this.shadowRoot.querySelector('div')
            .innerHTML = `<${page_name}-page ${param ? `param="${param}"` : ""}></${page_name}-page>`;
    }
}

customElements.define('real-router', RealRouter);
export {RealRouter}
