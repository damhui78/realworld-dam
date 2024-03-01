import realActions from "../services/real-actions.js";

const style = `<style>
        
</style>`;

const getTemplate = (tags) => {
    console.log('real-sidebar::getTemplate(): tags:', tags);

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
    }

    connectedCallback() {
        console.log('real pagination  connectedCallback()');

        this.shadowRoot.innerHTML = getTemplate();

        this.findElements();
        this.setEventHandler();
    }

    findElements() {
        this.ulPagination = this.shadowRoot.querySelector('.pagination');
    }

    setEventHandler() {
    }

    setPagination = (totalPages, currentPageNo) => {
        const arr = Array.from({length: totalPages}, (v, index) => index);
        this.ulPagination.innerHTML = arr.map(i => `<li class="page-item ${currentPageNo===i ? 'active' : ''}"><a class="page-link" href="">${i + 1}</a></li>`).join('');

        const aPageLink = this.shadowRoot.querySelectorAll('.page-link');
        aPageLink.forEach(item => item.addEventListener('click', this.movePage));
    }
    movePage = (evt) => {
        evt.preventDefault();

        const pageNo = evt.target.innerText - 1;
        realActions.addAction('articlePaging', pageNo);
    }

}

customElements.define('real-pagination', RealPagination);
export {RealPagination}