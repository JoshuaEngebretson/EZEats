import { combineReducers } from 'redux';

const allRecipes = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      return action.payload;
    default:
      return state;
  }
}

const recipeCategories = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPE_CATEGORIES':
      return action.payload;
    default:
      return state;
  }
}

const mostCooked = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOST_COOKED':
      return action.payload;
    default:
      return state;
  }
}

/*
  Make one object that has the following keys
    allRecipes, recipeCategories, and mostCooked
  these will be on the redux state at:
    state.recipes.allRecipes,
    state.recipes.recipeCategories,
    state.recipes.mostCooked
*/
export default combineReducers({
  allRecipes,
  recipeCategories,
  mostCooked,
});