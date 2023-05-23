import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRecipeCategories() {
  console.log('inside fetchRecipeCategories');
  try {
    const response = yield axios.get('/recipes/recipe_categories')
    yield put({type: 'SET_RECIPE_CATEGORIES', payload: response.data});
  } catch (error) {
    console.log('Recipes get request failed:', error);
  }
}

export default function* recipesCategoriesSaga() {
  yield takeLatest('FETCH_RECIPE_CATEGORIES', fetchRecipeCategories)
}