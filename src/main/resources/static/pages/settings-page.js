import {realStorage} from "../services/real-storage.js";
import {realApi} from "../services/real-api.js";

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
                      <input id="user-image-url" class="form-control" type="text" placeholder="URL of profile picture" />
                    </fieldset>
                    <fieldset class="form-group">
                      <input id="user-name" class="form-control form-control-lg" type="text" placeholder="Your Name" readonly />
                    </fieldset>
                    <fieldset class="form-group">
                      <textarea id="user-bio"
                        class="form-control form-control-lg"
                        rows="8"
                        placeholder="Short bio about you"
                      ></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                      <input id="user-email" class="form-control form-control-lg" type="text" placeholder="Email" readonly />
                    </fieldset>
                    <fieldset class="form-group">
                      <input id="user-password"
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

    async connectedCallback() {
        console.log('settings page  connectedCallback()');
        const data = await realApi.getLoginUser();
        const loginUser = data?.user;
        this.userImageUrl.value = loginUser?.image;
        this.userName.value = loginUser?.username;
        this.userBio.value = loginUser?.bio;
        this.userEmail.value = loginUser?.email;
    }

    findElements() {
        this.userImageUrl = this.shadowRoot.querySelector('#user-image-url');
        this.userName = this.shadowRoot.querySelector('#user-name');
        this.userBio = this.shadowRoot.querySelector('#user-bio');
        this.userEmail = this.shadowRoot.querySelector('#user-email');
        this.userPassword = this.shadowRoot.querySelector('#user-password');
        this.btnUpdateSettings = this.shadowRoot.querySelector('#update-settings');
        this.btnLogout = this.shadowRoot.querySelector('#logout');
    }

    setEventHandler() {
        this.btnUpdateSettings.addEventListener('click', this.updateSettings);
        this.btnLogout.addEventListener('click', this.logout);
    }

    updateSettings = async (evt) => {
        evt.preventDefault();

        const user = {
            image: this.userImageUrl.value,
            bio: this.userBio.value,
            password: this.userPassword.value,
        };
        console.log('settings-page::updateSettings(): user:', user);

        await realApi.updateUser(user);

        const realNavbar = document.querySelector('real-navbar');
        realNavbar.goHome();
    }

    logout = (evt) => {
        evt.preventDefault();

        realStorage.deleteUser();

        const realNavbar = document.querySelector('real-navbar');
        realNavbar.render();
    }

    render() {

    }
}

customElements.define('settings-page', SettingsPage);
export {SettingsPage}