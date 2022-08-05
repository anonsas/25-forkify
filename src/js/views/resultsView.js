import View from './View.js';
import PreviewView from './PreviewView.js';
import icons from 'url:../../assets/icons.svg'; // Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map((result) => PreviewView.render(result, false)).join('');
  }
}

export default new ResultsView();
