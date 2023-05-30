import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createNewRecipe({payload: newRecipe}) {
  try {
    console.log('newRecipe within saga:', newRecipe);
    if(isNaN(newRecipe.categoryInput)) {
      const {data: newCategoryId} = yield axios.post('/api/recipes/recipe-categories', newRecipe.categoryInput)
      newRecipe.categoryInput = newCategoryId
    }
    newRecipe.recipeIngredients.map((ingredient, index) => {
      if(isNaN(ingredient.units)) {
        const {data: newUnitId} = yield axios.post('/api/recipes/units-of-measurement', ingredient.units)
        ingredient.units = newUnitId
      }
      if(isNaN(ingredient.ingredient)) {
        const {data: newIngredientId} = yield axios.post('/api/recipes/ingredients', ingredient.ingredient)
        ingredient.ingredient = newIngredientId
      }
    })


    const response = yield axios.post('/api/recipes/', newRecipe)
    yield put({type: 'FETCH_RECIPES'})
    // yield put({type: 'FETCH_NEW_RECIPE_ID'})
  } catch (error) {
    console.log('Error within createNewRecipe saga:', error);
  }
}

function* fetchNewRecipeId() {
  try {
    const {data:newRecipeId} = yield axios.get('/api/recipes/new-recipe-id')
    yield put({type: 'SET_NEW_RECIPE_ID', payload: newRecipeId})
  } catch (error) {
    console.log('Error within fetchNewRecipeId saga:', error);
  }
}

export default function* recipesSaga() {
  yield takeLatest('CREATE_NEW_RECIPE', createNewRecipe)
  yield takeLatest('FETCH_NEW_RECIPE_ID', fetchNewRecipeId)
}