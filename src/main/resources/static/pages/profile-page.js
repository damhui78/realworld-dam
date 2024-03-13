import {RealTab} from "../components/real-tab.js";
import {actionHandler} from "../services/action-handler.js";
import {realStorage} from "../services/real-storage.js";

const style = `<style>
        
</style>`;

const getTemplate = (userName, loginUserName) => {
    return `
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        ${style}
        
        <div class="profile-page">
          <div class="user-info">
            <div class="container">
              <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                  <img src="" class="user-img" />
                  <h4>${userName}</h4>
                  <p>
                  </p>
                  ${
                    userName === loginUserName
                      ?
                        `<button id="btnEditSettings" class="btn btn-sm btn-outline-secondary action-btn">
                          <i class="ion-gear-a"></i>
                          &nbsp; Edit Profile Settings
                        </button>`
                      :
                        `<button id="btnFollow" class="btn btn-sm btn-outline-secondary action-btn">
                          <i class="ion-plus-round"></i>
                          &nbsp; Follow ${userName}
                        </button>`
                  }
                </div>
              </div>
            </div>
          </div>
        
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                <real-tab pageName="profile" userName="${userName}"></real-tab>
              </div>
            </div>
          </div>
          
        </div>
    `;
}

class ProfilePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.init();
        this.shadowRoot.innerHTML = getTemplate(this.userName, this.loginUser?.username);
        this.actions = ['getProfile', 'followUser', 'unfollowUser'];
    }

    init() {
        this.router = document.querySelector('real-router');
        this.loginUser = realStorage.retrieve('user');
        this.userName = this.getAttribute('param');
    }

    connectedCallback() {
        console.log('profile-page::connectedCallback(): 0:', 0);

        this.setEvent();

        actionHandler.addListener(this.actions, this);
        actionHandler.addAction({type: 'getProfile', data: {username: this.userName}});
    }
    disconnectedCallback() {
        console.log('profile-page::disconnectedCallback(): 0:', 0);

        actionHandler.removeListener(this.actions, this);
    }

    setEvent() {
        if (this.loginUser?.username === this.userName) {
            this.shadowRoot.querySelector('#btnEditSettings')
                .addEventListener('click', this.goEditSettings);
        } else {
            this.shadowRoot.querySelector('#btnFollow')
                .addEventListener('click', this.followUser);
        }
    }
    goEditSettings = (evt) => {
        evt.preventDefault();

        const realNavbar = document.querySelector('real-navbar');
        realNavbar.goSettings();
    }
    followUser = (evt) => {
        evt.preventDefault();

        if (!this.loginUser) {
            this.router.render('login');
            return;
        }

        evt.target.classList.contains('active')
            ? actionHandler.addAction({type: 'unfollowUser', data: {username: this.userName}})
            : actionHandler.addAction({type: 'followUser', data: {username: this.userName}});
    }

    callbackAction(actionType, result) {
        console.log('profile-page::callbackAction(): actionType:', actionType);
        console.log('profile-page::callbackAction(): result:', result);

        const cbActions = {
            getProfile: this.getProfileCallback,
            followUser: this.followUserCallback,
            unfollowUser: this.unfollowUserCallback,
        }
        cbActions[actionType] && cbActions[actionType](result);
    }
    getProfileCallback = (result) => {
        this.shadowRoot.querySelector('img')
            .src = result.profile.image;
        this.shadowRoot.querySelector('p')
            .innerHTML = result.profile.bio;

        if (this.loginUser?.username === this.userName) {
            this.shadowRoot.querySelector('#btnEditSettings')
        } else {
            if (result.profile.following) {
                const btn = this.shadowRoot.querySelector('#btnFollow');
                btn.classList.add('active');
                btn.innerHTML = `<i class="ion-plus-round"></i>
                &nbsp; Unfollow ${result.profile.username}`;
            }
        }
    }
    followUserCallback = (result) => {
        const btn = this.shadowRoot.querySelector('#btnFollow');
        btn.classList.toggle('active');
        btn.innerHTML = `<i class="ion-plus-round"></i>
                &nbsp; Unfollow ${result.profile.username}`;
    }
    unfollowUserCallback = (result) => {
        const btn = this.shadowRoot.querySelector('#btnFollow');
        btn.classList.toggle('active');
        btn.innerHTML = `<i class="ion-plus-round"></i>
                &nbsp; Follow ${result.profile.username}`;
    }
}

customElements.define('profile-page', ProfilePage);
export {ProfilePage}