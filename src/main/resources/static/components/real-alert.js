
const style = `<style>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>`;

const getTemplate = () => {
    return `
        ${style}
        
        <div id="divModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <p></p>
          </div>
        </div>
    `;
}

class RealAlert extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();
    }

    init() {
        this.divModal = this.shadowRoot.querySelector('#divModal');
        this.pContent = this.shadowRoot.querySelector('p');
        this.spanClose = this.shadowRoot.querySelector('.close');
        this.shadowRoot.addEventListener('click', this.closeModal);
    }

    connectedCallback() {
        console.log('real-alert::connectedCallback(): 0:', 0);

        this.init();
    }

    open = (message) => {
        this.pContent.innerText = message;
        this.divModal.style.display = 'block';
    }

    closeModal = (evt) => {
        evt.preventDefault();

        if (evt.target === this.divModal || evt.target === this.spanClose) {
            this.divModal.style.display = 'none';
        }
    }
}

customElements.define('real-alert', RealAlert);
export {RealAlert}
