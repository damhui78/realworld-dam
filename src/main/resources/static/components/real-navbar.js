import {realStore} from "../services/real-store.js";

const style = `<style>
           
</style>`;

const getTemplate = () => {
    return `
<!--        <link rel="stylesheet" href="//demo.productionready.io/main.css" />-->
        <link rel="stylesheet" href="/css/real.css" />
        ${style}
        
        <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" href="/">conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <!-- Add "active" class when you're on that page" -->
                        <a id="homeLink" class="nav-link active" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a id="loginLink" class="nav-link" href="/login">Sign in</a>
                    </li>
                    <li class="nav-item">
                        <a id="signupLink" class="nav-link" href="/register">Sign up</a>
                    </li>
                </ul>
            </div>
        </nav>
    `;
}
const getLoginTemplate = (username) => {
    return `
<!--        <link rel="stylesheet" href="//demo.productionready.io/main.css" />-->
        <link rel="stylesheet" href="/css/real.css" />
        ${style}
        
        <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" href="/">conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <!-- Add "active" class when you're on that page" -->
                        <a id="homeLink" class="nav-link active" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/editor"> <i class="ion-compose"></i>&nbsp;New Article </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/settings"> <i class="ion-gear-a"></i>&nbsp;Settings </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/profile/${username}">
                            <img src="" class="user-pic" />
                            ${username}
                        </a>
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
        console.log('real navbar  connectedCallback()');
    }

    findElements() {
        this.alinks = Array.from(this.shadowRoot.querySelectorAll('a'));
        this.router = document.querySelector('real-router');
        console.log('nav find router : ', this.router);
    }

    setEventHandler() {
        console.log('real-navbar::setEventHandler(): 1:', 1);
        this.alinks.forEach(item => item.addEventListener('click', this.clickAlink));
    }

    clickAlink = (evt) => {
        evt.preventDefault();

        console.log('test clickAlink ');
        console.log('clickAlink evt : ', evt);
        console.log('clickAlink target : ', evt.target);
        console.log('clickAlink target.href : ', evt.target.href);
        // console.log('test : ', evt.target.closest('a'));

        this.markCurrentNavigation(evt.target);
        this.sendRouter(evt.target);
    }

    sendRouter(evtTarget) {
        if (evtTarget.href.includes('login')) {
            this.router.render('login');
        } else if (evtTarget.href.includes('register')) {
            this.router.render('register');
        } else if (evtTarget.href.includes('editor')) {
            this.router.render('editor');
        } else if (evtTarget.href.includes('settings')) {
            this.router.render('settings');
        } else if (evtTarget.href.includes('profile')) {
            this.router.render('profile');
        } else {
            this.router.render('home');
        }
    }

    render() {
        const loginUser = realStore.getUser();
        console.log('real-navbar::render(): loginUser:', loginUser);
        this.shadowRoot.innerHTML = loginUser ? getLoginTemplate(loginUser.user.username) : getTemplate();

        this.findElements();
        this.setEventHandler();

        this.goHome();
    }

    goHome() {
        const homeLink = this.shadowRoot.querySelector('#homeLink');
        this.markCurrentNavigation(homeLink);
        this.router.render('home');
    }

    goLogin() {
        const loginLink = this.shadowRoot.querySelector('#loginLink');
        this.markCurrentNavigation(loginLink);
        this.router.render('login');
    }

    markCurrentNavigation(target) {
        this.alinks.forEach(item => item.classList.remove('active'));
        target.classList.add('active');
    }
}
customElements.define('real-navbar', RealNavbar);
