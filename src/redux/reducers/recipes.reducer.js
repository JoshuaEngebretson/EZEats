const recipesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      return action.payload;
    default:
      return state;
  }
}

// recipes will be on the redux state at:
// state.recipes
export default recipesReducer