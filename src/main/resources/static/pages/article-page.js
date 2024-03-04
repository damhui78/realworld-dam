import {RealArticleMeta} from "../components/real-article-meta.js";
import {RealCommentList} from "../components/real-comment-list.js";

const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
        <link rel="stylesheet" href="/css/real.css" />
        ${style}
        
        <div class="article-page">
          <div class="banner">
            <div class="container">
              <h1>How to build webapps that scale</h1>
        
              <real-article-meta></real-article-meta>
              
            </div>
          </div>
        
          <div class="container page">
            <div class="row article-content">
              <div class="col-md-12">
                <p>
                  Web development technologies have evolved at an incredible clip over the past few years.
                </p>
                <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                <p>It's a great solution for learning how other frameworks work.</p>
                <ul class="tag-list">
                  <li class="tag-default tag-pill tag-outline">realworld</li>
                  <li class="tag-default tag-pill tag-outline">implementations</li>
                </ul>
              </div>
            </div>
        
            <hr />
        
            <div class="article-actions">
              <real-article-meta></real-article-meta>
            </div>
        
            <real-comment-list></real-comment-list>
          </div>
        </div>
    `;
}

class ArticlePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();
    }

    connectedCallback() {
    }
    disconnectedCallback() {
    }
}

customElements.define('article-page', ArticlePage);
export {ArticlePage}