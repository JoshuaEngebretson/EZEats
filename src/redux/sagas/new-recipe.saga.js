import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createNewRecipe({payload: newRecipe}) {
  try {
    const response = yield axios.post('/api/recipes/', newRecipe)
    yield put({type: 'FETCH_RECIPES'})
    yield put({type: 'FETCH_NEW_RECIPE_ID'})
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