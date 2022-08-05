import { async } from 'regenerator-runtime';
import { API_URL, RECIPES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RECIPES_PER_PAGE,
  },
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.error(`${error} 💥💥💥💥`);
    throw error;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes?.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
      };
    });
  } catch (error) {
    console.error(`${error} 💥💥💥💥`);
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultPerPage; // 0;
  const end = page * state.search.resultPerPage; // 9;

  return state.search.results.slice(start, end);
};

export const updateServings = (servingsNum) => {
  state.recipe.ingredients.forEach((item) => {
    item.quantity = (item.quantity * servingsNum) / state.recipe.servings;
    // newQt = oldQt + servingsNum / oldServingsNum
  });
  state.recipe.servings = servingsNum;
};
