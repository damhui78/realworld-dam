import {realApi} from "../services/real-api.js";

const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        ${style}
        
        <div class="auth-page">
          <div class="container page">
            <div class="row">
              <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign up</h1>
                <p class="text-xs-center">
                  <a href="/login">Have an account?</a>
                </p>
        
                <ul class="error-messages">
                  <li>That email is already taken</li>
                </ul>
        
                <form>
                  <fieldset class="form-group">
                    <input id="username" class="form-control form-control-lg" type="text" placeholder="Username" />
                  </fieldset>
                  <fieldset class="form-group">
                    <input id="email" class="form-control form-control-lg" type="text" placeholder="Email" />
                  </fieldset>
                  <fieldset class="form-group">
                    <input id="password" class="form-control form-control-lg" type="password" placeholder="Password" />
                  </fieldset>
                  <button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    `;
}

class RegisterPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();

        this.findElements();
        this.setEventHandler();
    }

    connectedCallback() {
        console.log('register page  connectedCallback()')

        this.render();
    }

    findElements() {

    }

    setEventHandler() {
        this.shadowRoot.querySelector('button').addEventListener('click', this.clickSignup);
    }

    clickSignup = (evt) => {
        evt.preventDefault();

        const username = this.shadowRoot.querySelector('#username').value;
        const email = this.shadowRoot.querySelector('#email').value;
        const password = this.shadowRoot.querySelector('#password').value;
        const user = {username, email, password};
        console.log('clickSighup user : ', user);

        realApi.registerUserApi(user);

        const realNavbar = document.querySelector('real-navbar');
        realNavbar.renderLogin();
    }

    render() {
    }
}

customElements.define('register-page', RegisterPage);
export {RegisterPage}
