import { combineReducers } from "redux";

const allRecipes = (state = [], action) => {
	switch (action.type) {
		case "SET_RECIPES":
			return action.payload;
		default:
			return state;
	}
};

const recipeCategories = (state = [], action) => {
	switch (action.type) {
		case "SET_RECIPE_CATEGORIES":
			return action.payload;
		default:
			return state;
	}
};

const mostCooked = (state = [], action) => {
	switch (action.type) {
		case "SET_MOST_COOKED":
			return action.payload;
		default:
			return state;
	}
};

const currentRecipe = (state = [], action) => {
	switch (action.type) {
		case "SET_CURRENT_RECIPE":
			return action.payload;
		case "MODIFY_CURRENT_RECIPE_IMAGE":
			return { ...state, image: action.payload };
		case "MODIFY_CURRENT_RECIPE_NAME":
			return { ...state, name: action.payload };
		case "MODIFY_CURRENT_RECIPE_TEXT":
			return { ...state, recipe_text: action.payload };
		case "MODIFY_CURRENT_RECIPE_INGREDIENTS":
			return { ...state, ingredients: action.payload };
		case "MODIFY_CURRENT_RECIPE_CATEGORY":
			return { ...state, categoryId: action.payload };
		default:
			return state;
	}
};

const newRecipe = (state = {}, action) => {
	switch (action.type) {
		case "SET_newRecipe":
			return action.payload;
		default:
			return state;
	}
};

const shoppingList = (state = {}, action) => {
	switch (action.type) {
		case "SET_SHOPPING_LIST":
			return action.payload;
		default:
			return state;
	}
};

const allIngredients = (state = {}, action) => {
	switch (action.type) {
		case "SET_ALL_INGREDIENTS":
			return action.payload;
		default:
			return state;
	}
};

const unitsOfMeasurement = (state = [], action) => {
	switch (action.type) {
		case "SET_UNITS_OF_MEASUREMENT":
			return action.payload;
		default:
			return state;
	}
};

/*
  Make one object that has the following keys
    allRecipes, recipeCategories, mostCooked,
    currentRecipe, shoppingList, unitsOfMeasurement,
    allIngredients, and newRecipe
  these will be on the redux state at:
    state.recipes.allRecipes,
    state.recipes.recipeCategories,
    state.recipes.mostCooked,
    state.recipes.currentRecipe,
    state.recipes.shoppingList,
    state.recipes.unitsOfMeasurement,
    state.recipes.allIngredients,
    state.recipes.newRecipe,
*/
export default combineReducers({
	allRecipes,
	recipeCategories,
	mostCooked,
	currentRecipe,
	shoppingList,
	unitsOfMeasurement,
	allIngredients,
	newRecipe,
});
