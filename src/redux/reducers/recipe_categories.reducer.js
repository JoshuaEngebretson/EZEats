const recipeCategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPE_CATEGORIES':
      return action.payload;
    default:
      return state;
  }
}

// recipeCategories will be on the redux state at:
// state.recipeCategories
export default recipeCategoriesReducer