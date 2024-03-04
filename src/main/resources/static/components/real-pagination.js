import {actionHandler} from "../services/action-handler.js";

const style = `<style>
        
</style>`;

const getTemplate = () => {
    return `
        <link rel="stylesheet" href="/css/real.css" />
        ${style}
        
        <ul class="pagination">
            <li class="page-item active"><a class="page-link" href="">1</a></li>
        </ul>
    `;
}

class RealPagination extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = getTemplate();
    }

    connectedCallback() {
        console.log('real pagination  connectedCallback()');
    }
    disconnectedCallback() {
        console.log('real-sidebar::disconnectedCallback(): 0:', 0);
    }

    setPagination = (totalPages, currentPageNo) => {
        const arr = Array.from({length: totalPages}, (v, index) => index);
        const ulPagination = this.shadowRoot.querySelector('.pagination');
        ulPagination.innerHTML = arr.map(i => `<li class="page-item ${currentPageNo===i ? 'active' : ''}"><a class="page-link" href="">${i + 1}</a></li>`).join('');

        const aPageLink = this.shadowRoot.querySelectorAll('.page-link');
        aPageLink.forEach(item => item.addEventListener('click', this.movePage));
    }
    movePage = (evt) => {
        evt.preventDefault();

        const pageNo = evt.target.innerText - 1;
        actionHandler.addAction({type: 'movePage', data: {pageNo}});
    }

}

customElements.define('real-pagination', RealPagination);
export {RealPagination}