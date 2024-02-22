// import {iconCdn} from "../services/icon-cdn.js";
// import {apiGetProfile} from "../services/api.js";
// import {store} from "../services/store.js";
import {realRouter} from "./real-router.js";


const style = `<style>
        
</style>`;

        // <link rel="stylesheet" href="/css/common.css" />
const getTemplate = () => {
    return `
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
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
        console.log('real navbar  connectedCallback()')

        this.render();
    }

    findElements() {
        // this.btn = this.shadowRoot.querySelector('.btn');
        this.alinks = Array.from(this.shadowRoot.querySelectorAll('a'));
        this.router = document.querySelector('real-router');
        console.log('nav find router : ', this.router);
    }

    setEventHandler() {
        console.log('real-navbar::setEventHandler(): 1:', 1);
        // this.btn.addEventListener('click', this.clickBtn);
        this.alinks.forEach(item => item.addEventListener('click', this.clickAlink));
    }

    clickBtn = (evt) => {
        console.log('clicked', evt);
    }

    clickAlink = (evt) => {
        console.log('test clickAlink ');
        console.log('evt : ', evt);
        console.log('target : ', evt.target);
        console.log('target.href : ', evt.target.href);
        // console.log('test : ', evt.target.closest('a'));


        evt.preventDefault();


        this.alinks.forEach(item => item.classList.remove('active'));
        evt.target.classList.add('active');

        if (evt.target.href.includes('login')) {
            this.router.render('login');
        } else if (evt.target.href.includes('register')) {
            this.router.render('register');
        } else {
            this.router.render('home');
        }
    }

    render() {
    }
}
customElements.define('real-navbar', RealNavbar);
export {RealNavbar}
