import {realApi} from "../services/real-api.js";

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

        this.findElements();
        this.setEventHandler();
    }

    connectedCallback() {
        console.log('editor page  connectedCallback()');

        this.render();
    }

    findElements() {
        this.inputTag = this.shadowRoot.querySelector('#input-tag');
        this.btnPublish = this.shadowRoot.querySelector('button');
    }

    setEventHandler() {
        this.inputTag.addEventListener('keyup', this.addTag);
        this.btnPublish.addEventListener('click', this.saveArticle);
    }

    addTag = (evt) => {
        if (evt.key !== 'Enter') return;

        const divTagList = this.shadowRoot.querySelector('.tag-list');
        divTagList.innerHTML += `<span class="tag-default tag-pill"> <i class="ion-close-round"></i>${evt.target.value}</span>`;
        divTagList.querySelectorAll('span').forEach(item => item.addEventListener('click', this.delTag));

        evt.target.value = '';
    }
    delTag = (evt) => {
        console.log('editor-page::delTag(): evt.target():', evt.target);
        evt.target.remove();
    }

    saveArticle = async () => {
        const title = this.shadowRoot.querySelector('#title').value;
        const description = this.shadowRoot.querySelector('#description').value;
        const body = this.shadowRoot.querySelector('textarea').value;
        const tagList = Array.from(this.shadowRoot.querySelectorAll('span')).map(item => item.innerText);

        const article = {
            title,
            description,
            body,
            tagList
        };
        console.log('editor-page::saveArticle(): article:', article);
        await realApi.saveArticle(article);

        const realNavbar = document.querySelector('real-navbar');
        realNavbar.goHome();
    }

    render() {

    }
}

customElements.define('editor-page', EditorPage);
export {EditorPage}