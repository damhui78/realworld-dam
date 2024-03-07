import {realApi} from "../services/real-api.js";
import {realStorage} from "../services/real-storage.js";

const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        ${style}
        
        <div class="editor-page">
          <div class="container page">
            <div class="row">
              <div class="col-md-10 offset-md-1 col-xs-12">
                <ul class="error-messages">
                  <li>That title is required</li>
                </ul>
        
                <form>
                  <fieldset>
                    <fieldset class="form-group">
                      <input id="title" type="text" class="form-control form-control-lg" placeholder="Article Title" />
                    </fieldset>
                    <fieldset class="form-group">
                      <input id="description" type="text" class="form-control" placeholder="What's this article about?" />
                    </fieldset>
                    <fieldset class="form-group">
                      <textarea
                        class="form-control"
                        rows="8"
                        placeholder="Write your article (in markdown)"
                      ></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                      <input id="input-tag" type="text" class="form-control" placeholder="Enter tags" />
                      <div class="tag-list">
                      </div>
                    </fieldset>
                    <button class="btn btn-lg pull-xs-right btn-primary" type="button">
                      Publish Article
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
    `;
}

class EditorPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();
    }

    init() {
        this.inputTitle = this.shadowRoot.querySelector('#title');
        this.inputDesc = this.shadowRoot.querySelector('#description');
        this.textareaBody = this.shadowRoot.querySelector('textarea');
        this.divTagList = this.shadowRoot.querySelector('.tag-list');

        this.shadowRoot.querySelector('#input-tag')
            .addEventListener('keyup', this.addTag);
        this.shadowRoot.querySelector('button')
            .addEventListener('click', this.saveArticle);

        this.slug = this.getAttribute('param');
        if (!this.slug) return;

        const article = realStorage.getArticleBySlug(this.slug);
        this.inputTitle.value = article.title;
        this.inputDesc.value = article.description;
        this.textareaBody.value = article.body;
        this.divTagList.innerHTML = article.tagList.map(tag => `<span class="tag-default tag-pill"> <i class="ion-close-round"></i>${tag}</span>`).join('');
    }

    connectedCallback() {
        console.log('editor page  connectedCallback()');

        this.init();
    }

    addTag = (evt) => {
        if (evt.key !== 'Enter') return;

        this.divTagList.innerHTML += `<span class="tag-default tag-pill"> <i class="ion-close-round"></i>${evt.target.value}</span>`;
        this.divTagList.querySelectorAll('span').forEach(item => item.addEventListener('click', this.delTag));

        evt.target.value = '';
    }
    delTag = (evt) => {
        console.log('editor-page::delTag(): evt.target():', evt.target);
        evt.target.remove();
    }

    saveArticle = async () => {
        const title = this.inputTitle.value;
        const description = this.inputDesc.value;
        const body = this.textareaBody.value;
        const tagList = Array.from(this.shadowRoot.querySelectorAll('span')).map(item => item.innerText);

        const article = {
            title,
            description,
            body,
            tagList
        };
        console.log('editor-page::saveArticle(): article:', article);
        console.log('editor-page::saveArticle(): this.slug:', this.slug);
        
        this.slug
            ? await realApi.updateArticle(this.slug, article)
            : await realApi.saveArticle(article);

        const realNavbar = document.querySelector('real-navbar');
        realNavbar.goHome();
    }
}

customElements.define('editor-page', EditorPage);
export {EditorPage}