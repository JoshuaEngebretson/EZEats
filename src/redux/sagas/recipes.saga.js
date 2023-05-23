import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRecipes() {
  try {
    const response = yield axios.get('/recipes')
    yield put({type: 'SET_RECIPES', payload: response.data});
  } catch (error) {
    console.log('Recipes get request failed:', error);
  }
}

export default function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes)
}