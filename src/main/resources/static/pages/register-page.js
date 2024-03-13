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
                <h1 class="text-xs-center">Sign up</h1>
                <p class="text-xs-center">
                  <a href="/login">Have an account?</a>
                </p>
        
                <ul class="error-messages">
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
        this.actions = ['registerUser'];
    }

    connectedCallback() {
        console.log('register-page::connectedCallback(): 0:', 0);

        this.setEvent();

        actionHandler.addListener(this.actions, this);
    }
    disconnectedCallback() {
        console.log('register-page::disconnectedCallback(): 0:', 0);

        actionHandler.removeListener(this.actions, this);
    }

    setEvent() {
        this.shadowRoot.querySelector('a').addEventListener('click', this.goSignin);
        this.shadowRoot.querySelector('button').addEventListener('click', this.signup);
    }
    goSignin = (evt) => {
        evt.preventDefault();

        const realNavbar = document.querySelector('real-navbar');
        realNavbar.goLogin();
    }
    signup = (evt) => {
        evt.preventDefault();

        const username = this.shadowRoot.querySelector('#username').value;
        const email = this.shadowRoot.querySelector('#email').value;
        const password = this.shadowRoot.querySelector('#password').value;
        const user = {username, email, password};
        console.log('register-page::signup(): user:', user);

        actionHandler.addAction({type: 'registerUser', data: {user}});
    }

    callbackAction(actionType, result) {
        console.log('register-page::callbackAction(): actionType:', actionType);
        console.log('register-page::callbackAction(): result:', result);

        const cbActions = {
            registerUser: this.registerUserCallback,
        }
        cbActions[actionType] && cbActions[actionType](result);
    }
    registerUserCallback = (result) => {
        if (result.errorMessage) {

            return;
        }

        const realNavbar = document.querySelector('real-navbar');
        realNavbar.goHome();
    }
}

customElements.define('register-page', RegisterPage);
export {RegisterPage}
