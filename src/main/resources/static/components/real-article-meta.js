import {iconCdn} from "../css/icon.js";
import {realStorage} from "../services/real-storage.js";
import {actionHandler} from "../services/action-handler.js";

const style = `<style>
        
</style>`;

const getTemplate = (article, isMyArticle) => {
    const authorname = article.author.username;
    return `
        ${iconCdn}
        <link rel="stylesheet" href="/css/real.css" />
        ${style}
        
        <div class="article-meta">
          <a href="/profile/${authorname}"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
          <div class="info">
            <a href="/profile/${authorname}" class="author">${authorname}</a>
            <span class="date">${article.createdAt}</span>
          </div>
          ${
            isMyArticle
            ?
              `<button id="edit-article" class="btn btn-sm btn-outline-secondary">
                <i class="ion-edit"></i> Edit Article
              </button>
              &nbsp;&nbsp;
              <button id="delete-article" class="btn btn-sm btn-outline-danger">
                <i class="ion-trash-a"></i> Delete Article
              </button>`
            :
              `<button id="follow-author" class="btn btn-sm btn-outline-secondary ${article.author.following ? 'active' : ''}">
                <i class="ion-plus-round"></i>
                &nbsp; Follow ${authorname}
              </button>
              &nbsp;&nbsp;
              <button id="favorite-article" class="btn btn-sm btn-outline-primary ${article.favorited ? 'active' : ''}">
                <i class="ion-heart"></i>
                &nbsp; Favorite Post <span class="counter">(${article.favoritesCount})</span>
              </button>`
          }
        </div>
    `;
}

class RealArticleMeta extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.init();
        this.shadowRoot.innerHTML = getTemplate(this.article, this.isMyArticle);
        this.actions = ['followUser', 'unfollowUser', 'favoriteArticle', 'unfavoriteArticle', 'deleteArticle'];
    }

    init() {
        this.router = document.querySelector('real-router');
        this.slug = this.getAttribute('slug');
        this.article = realStorage.getArticleBySlug(this.slug);
        this.authorName = this.article.author.username;
        this.loginUser = realStorage.retrieve('user');
        this.isMyArticle = this.authorName === this.loginUser?.username;
    }

    connectedCallback() {
        console.log('real-article-meta::connectedCallback(): 0:', 0);

        if (this.isMyArticle) {
            this.shadowRoot.querySelector('#edit-article')
                .addEventListener('click', this.moveEditorPage);
            this.shadowRoot.querySelector('#delete-article')
                .addEventListener('click', this.deleteArticle);
        } else {
            this.shadowRoot.querySelector('#follow-author')
                .addEventListener('click', this.followUser);
            this.shadowRoot.querySelector('#favorite-article')
                .addEventListener('click', this.favoriteArticle);
        }
        this.shadowRoot.querySelectorAll('a')
            .forEach(item => item.addEventListener('click', this.moveProfilePage));

        actionHandler.addListener(this.actions, this);
    }
    disconnectedCallback() {
        console.log('real-article-meta::disconnectedCallback(): 0:', 0);

        actionHandler.removeListener(this.actions, this);
    }

    moveEditorPage = (evt) => {
        evt.preventDefault();

        this.router.render('editor', this.slug);
    }

    moveProfilePage = (evt) => {
        evt.preventDefault();

        this.router.render('profile', this.article.author.username);
    }

    deleteArticle = (evt) => {
        evt.preventDefault();

        actionHandler.addAction({type: 'deleteArticle', data: {slug: this.slug}});
    }

    followUser = (evt) => {
        evt.preventDefault();

        if (!this.loginUser) {
            this.router.render('login');
            return;
        }

        evt.target.classList.contains('active')
            ? actionHandler.addAction({type: 'unfollowUser', data: {username: this.authorName}})
            : actionHandler.addAction({type: 'followUser', data: {username: this.authorName}});
    }
    favoriteArticle = (evt) => {
        evt.preventDefault();

        if (!this.loginUser) {
            this.router.render('login');
            return;
        }

        evt.target.classList.contains('active')
            ? actionHandler.addAction({type: 'unfavoriteArticle', data: {slug: this.slug}})
            : actionHandler.addAction({type: 'favoriteArticle', data: {slug: this.slug}});
    }

    callbackAction(actionType, result) {
        console.log('real-tab::callbackAction(): actionType:', actionType);
        console.log('real-tab::callbackAction(): result:', result);

        const cbActions = {
            followUser: this.followUserCallback,
            unfollowUser: this.unfollowUserCallback,
            favoriteArticle: this.favoriteArticleCallback,
            unfavoriteArticle: this.unfavoriteArticleCallback,
            deleteArticle: this.deleteArticleCallback,
        }
        cbActions[actionType] && cbActions[actionType](result);
    }
    followUserCallback = (result) => {
        const btn = this.shadowRoot.querySelector('#follow-author');
        btn.classList.toggle('active');
        btn.innerHTML = `<i class="ion-plus-round"></i>
                &nbsp; Unfollow ${result.profile.username}`;
    }
    unfollowUserCallback = (result) => {
        const btn = this.shadowRoot.querySelector('#follow-author');
        btn.classList.toggle('active');
        btn.innerHTML = `<i class="ion-plus-round"></i>
                &nbsp; Follow ${result.profile.username}`;
    }
    favoriteArticleCallback = (result) => {
        const btn = this.shadowRoot.querySelector('#favorite-article');
        console.log('real-article-meta::favoriteArticleCallback(): btn:', btn);

        btn.classList.toggle('active');
        console.log('real-article-meta::favoriteArticleCallback(): btn.innerHTML:', btn.innerHTML);

        btn.innerHTML = `<i class="ion-heart"></i>
                &nbsp; Unfavorite Post <span class="counter">(${result.article.favoritesCount})</span>`;
    }
    unfavoriteArticleCallback = (result) => {
        const btn = this.shadowRoot.querySelector('#favorite-article');
        console.log('real-article-meta::unfavoriteArticleCallback(): btn:', btn);

        btn.classList.toggle('active');
        console.log('real-article-meta::favoriteArticleCallback(): btn.innerHTML:', btn.innerHTML);
        btn.innerHTML = `<i class="ion-heart"></i>
                &nbsp; Favorite Post <span class="counter">(${result.article.favoritesCount})</span>`;
    }
    deleteArticleCallback = (result) => {
        this.router.render('home');
    }

}

customElements.define('real-article-meta', RealArticleMeta);
export {RealArticleMeta}