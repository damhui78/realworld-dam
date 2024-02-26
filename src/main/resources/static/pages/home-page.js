import {RealArticlePreview} from "../components/real-article-preview.js";
import {realApi} from "../services/real-api.js";
import {realStore} from "../services/real-store.js";


const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        ${style}
        
        <div class="home-page">
          <div class="banner">
            <div class="container">
              <h1 class="logo-font">conduit</h1>
              <p>A place to share your knowledge.</p>
            </div>
          </div>
        
          <div class="container page">
            <div class="row">
              <div class="col-md-9">
                <div class="feed-toggle">
                  <ul class="nav nav-pills outline-active">
                    <li class="nav-item">
                      <a class="nav-link" href="">Your Feed</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" href="">Global Feed</a>
                    </li>
                  </ul>
                </div>
        
                
                <div id="article-preview-list"></div>                
        
                <ul class="pagination">
                  <li class="page-item active">
                    <a class="page-link" href="">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="">2</a>
                  </li>
                </ul>
              </div>
        
              <div class="col-md-3">
                <div class="sidebar">
                  <p>Popular Tags</p>
        
                  <div class="tag-list">
                    <a href="" class="tag-pill tag-default">programming</a>
                    <a href="" class="tag-pill tag-default">javascript</a>
                    <a href="" class="tag-pill tag-default">emberjs</a>
                    <a href="" class="tag-pill tag-default">angularjs</a>
                    <a href="" class="tag-pill tag-default">react</a>
                    <a href="" class="tag-pill tag-default">mean</a>
                    <a href="" class="tag-pill tag-default">node</a>
                    <a href="" class="tag-pill tag-default">rails</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
}

class HomePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();

        this.findElements();
        this.setEventHandler();
    }

    async connectedCallback() {
        console.log('home page  connectedCallback()')

        const data = await realApi.getArticles();
        realStore.saveArticles(data.articles);
        this.articles = data.articles;

        console.log('home-page::connectedCallback(): this.articles:', this.articles);

        this.render();
    }

    findElements() {
        this.divArticles = this.shadowRoot.querySelector('#article-preview-list');
    }

    setEventHandler() {

    }

    render() {
        this.divArticles.innerHTML = this.articles.map(article => `<real-article-preview slug="${article.slug}"></real-article-preview>`).join('');
    }
}

customElements.define('home-page', HomePage);
export {HomePage}
