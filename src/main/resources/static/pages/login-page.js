import {actionHandler} from "../services/action-handler.js";

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
                <h1 class="text-xs-center">Sign in</h1>
                <p class="text-xs-center">
                  <a href="/register">Need an account?</a>
                </p>
        
                <ul class="error-messages">
                </ul>
        
                <form>
                  <fieldset class="form-group">
                    <input id="email" class="form-control form-control-lg" type="text" placeholder="Email" value="dam@dam.dam" />
                  </fieldset>
                  <fieldset class="form-group">
                    <input id="password" class="form-control form-control-lg" type="password" placeholder="Password" value="damdam" />
                  </fieldset>
                  <button class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    `;
}

class LoginPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();
        this.actions = ['login'];
    }

    connectedCallback() {
        console.log('login-page::connectedCallback(): 0:', 0);

        this.setEvent();

        actionHandler.addListener(this.actions, this);
    }
    disconnectedCallback() {
        console.log('profile-page::disconnectedCallback(): 0:', 0);

        actionHandler.removeListener(this.actions, this);
    }

    setEvent() {
        this.shadowRoot.querySelector('a').addEventListener('click', this.goSignup);
        this.shadowRoot.querySelector('button').addEventListener('click', this.signin);
    }
    goSignup = (evt) => {
        evt.preventDefault();

        const realNavbar = document.querySelector('real-navbar');
        realNavbar.goSignup();
    }
    signin = (evt) => {
        evt.preventDefault();

        const email = this.shadowRoot.querySelector('#email').value;
        const password = this.shadowRoot.querySelector('#password').value;
        const user = {email, password};
        actionHandler.addAction({type: 'login', data: {user}, storeType: 'user'})
    }

    callbackAction(actionType, result) {
        console.log('profile-page::callbackAction(): actionType:', actionType);
        console.log('profile-page::callbackAction(): result:', result);

        const cbActions = {
            login: this.loginCallback,
        }
        cbActions[actionType] && cbActions[actionType](result);
    }
    loginCallback = (result) => {
        if (result.errorMessage) {

            return;
        }

        const realNavbar = document.querySelector('real-navbar');
        realNavbar.render();
    }
}

customElements.define('login-page', LoginPage);
export {LoginPage}
