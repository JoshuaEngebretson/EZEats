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

const currentRecipe = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_RECIPE':
      return action.payload;
    default:
      return state;
  }
}

const shoppingList = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SHOPPING_LIST':
      return action.payload;
    default:
      return state;
  }
}

const unitsOfMeasurement = (state = [], action) => {
  switch (action.type) {
    case 'SET_UNITS_OF_MEASUREMENT':
      return action.payload;
    default:
      return state;
  }
}

/*
  Make one object that has the following keys
    allRecipes, recipeCategories, mostCooked,
    currentRecipe, shoppingList, and unitsOfMeasurement
  these will be on the redux state at:
    state.recipes.allRecipes,
    state.recipes.recipeCategories,
    state.recipes.mostCooked,
    state.recipes.currentRecipe,
    state.recipes.shoppingList,
    state.recipes.unitsOfMeasurement,
*/
export default combineReducers({
  allRecipes,
  recipeCategories,
  mostCooked,
  currentRecipe,
  shoppingList,
  unitsOfMeasurement,
});