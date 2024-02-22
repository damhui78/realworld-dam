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
                  <li>That email is already taken</li>
                </ul>
        
                <form>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="text" placeholder="Email" />
                  </fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="password" placeholder="Password" />
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

        this.findElements();
        this.setEventHandler();
    }

    connectedCallback() {
        console.log('login page  connectedCallback()')

        this.render();
    }

    findElements() {

    }

    setEventHandler() {

    }

    render() {
    }
}

customElements.define('login-page', LoginPage);
export {LoginPage}
