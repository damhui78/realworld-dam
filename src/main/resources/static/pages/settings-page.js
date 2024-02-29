import {realStore} from "../services/real-store.js";

const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        ${style}
        
        <div class="settings-page">
          <div class="container page">
            <div class="row">
              <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Your Settings</h1>
        
                <ul class="error-messages">
                  <li>That name is required</li>
                </ul>
        
                <form>
                  <fieldset>
                    <fieldset class="form-group">
                      <input class="form-control" type="text" placeholder="URL of profile picture" />
                    </fieldset>
                    <fieldset class="form-group">
                      <input class="form-control form-control-lg" type="text" placeholder="Your Name" />
                    </fieldset>
                    <fieldset class="form-group">
                      <textarea
                        class="form-control form-control-lg"
                        rows="8"
                        placeholder="Short bio about you"
                      ></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                      <input class="form-control form-control-lg" type="text" placeholder="Email" />
                    </fieldset>
                    <fieldset class="form-group">
                      <input
                        class="form-control form-control-lg"
                        type="password"
                        placeholder="New Password"
                      />
                    </fieldset>
                    <button id="update-settings" class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                  </fieldset>
                </form>
                <hr />
                <button id="logout" class="btn btn-outline-danger">Or click here to logout.</button>
              </div>
            </div>
          </div>
        </div>
    `;
}

class SettingsPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();

        this.findElements();
        this.setEventHandler();
    }

    connectedCallback() {
        console.log('settings page  connectedCallback()');

        this.render();
    }

    findElements() {
        this.btnUpdateSettings = this.shadowRoot.querySelector('#update-settings');
        this.btnLogout = this.shadowRoot.querySelector('#logout');
    }

    setEventHandler() {
        this.btnUpdateSettings.addEventListener('click', this.updateSettings);
        this.btnLogout.addEventListener('click', this.logout);
    }

    updateSettings = () => {

    }

    logout = () => {
        realStore.deleteUser();

        const realNavbar = document.querySelector('real-navbar');
        realNavbar.render();
    }

    render() {

    }
}

customElements.define('settings-page', SettingsPage);
export {SettingsPage}