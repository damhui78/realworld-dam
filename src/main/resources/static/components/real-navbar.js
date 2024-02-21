//import {iconCdn} from "../services/icon-cdn.js";
// import {apiGetProfile} from "../services/api.js";
// import {store} from "../services/store.js";

// import "//demo.productionready.io/main.css"

const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
        ${style}
        
        <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" href="/">conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <!-- Add "active" class when you're on that page" -->
                        <a class="nav-link active" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Sign in</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Sign up</a>
                    </li>
                </ul>
            </div>
        </nav>        
    `;
}

class RealNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();

        this.findElements();
        this.setEventHandler();
    }

    connectedCallback() {
        console.log('connectedCallback()')

        this.render();
    }

    findElements() {
        this.btn = this.shadowRoot.querySelector('.btn');
    }

    setEventHandler() {
        console.log('article-page::setEventHandler(): 1:', 1);
        this.btn.addEventListener('click', this.clickBtn);
    }

    clickBtn = (evt) => {
        console.log('clicked', evt)
    }


    render() {
    }
}
customElements.define('article-page', RealNavbar);
export {RealNavbar}
