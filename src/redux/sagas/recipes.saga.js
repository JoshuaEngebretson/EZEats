import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRecipes() {
  try {
    const response = yield axios.get('/api/recipes')
    yield put({type: 'SET_RECIPES', payload: response.data});
  } catch (error) {
    console.log('Recipes get request failed:', error);
  }
}

function* fetchRecipeCategories() {
  try {
    const response = yield axios.get('/api/recipes/recipe-categories')
    yield put({type: 'SET_RECIPE_CATEGORIES', payload: response.data});
  } catch (error) {
    console.log('GET recipeCategories request failed:', error);
  }
}

function* fetchMostCooked() {
  try {
    const response = yield axios.get('/api/recipes/most-cooked')
    yield put({type: 'SET_MOST_COOKED', payload: response.data});
  } catch (error) {
    console.log('GET mostCooked request failed:', error);
  }
}

export default function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes)
  yield takeLatest('FETCH_RECIPE_CATEGORIES', fetchRecipeCategories)
  yield takeLatest('FETCH_MOST_COOKED', fetchMostCooked)
}