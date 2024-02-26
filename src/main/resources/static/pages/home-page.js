import {RealTab} from "../components/real-tab.js";
import {RealSidebar} from "../components/real-sidebar.js";


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
                <real-tab></real-tab>
              </div>
        
              <div class="col-md-3">
                <real-sidebar></real-sidebar>
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

    connectedCallback() {
        console.log('home page  connectedCallback()')

        this.render();
    }

    findElements() {

    }

    setEventHandler() {

    }

    render() {

    }
}

customElements.define('home-page', HomePage);
export {HomePage}
