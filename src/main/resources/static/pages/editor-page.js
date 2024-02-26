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
                      <input type="text" class="form-control form-control-lg" placeholder="Article Title" />
                    </fieldset>
                    <fieldset class="form-group">
                      <input type="text" class="form-control" placeholder="What's this article about?" />
                    </fieldset>
                    <fieldset class="form-group">
                      <textarea
                        class="form-control"
                        rows="8"
                        placeholder="Write your article (in markdown)"
                      ></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                      <input type="text" class="form-control" placeholder="Enter tags" />
                      <div class="tag-list">
                        <span class="tag-default tag-pill"> <i class="ion-close-round"></i> tag </span>
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

    }

    setEventHandler() {

    }

    render() {

    }
}

customElements.define('editor-page', EditorPage);
export {EditorPage}