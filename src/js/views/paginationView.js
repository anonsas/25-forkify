import View from './View.js';
import icons from 'url:../../assets/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage);

    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', currPage);
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', currPage);
    }

    // Other page
    if (currPage < numPages) {
      return this._generateMarkupButton('both', currPage);
    }

    // Page 1, and there are NO other pages
    return ``;
  }

  _generateMarkupButton(type, currPage) {
    if (type === 'prev') {
      return `
        <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
    `;
    }

    if (type === 'next') {
      return `
        <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
    `;
    }

    if (type === 'both') {
      return `
          <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
  }
}

export default new PaginationView();
