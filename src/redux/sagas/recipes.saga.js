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

function* fetchCurrentRecipe(action) {
  try {
    const currentRecipeId = action.payload
    const response = yield axios.get(`/api/recipes/${currentRecipeId}`);
    yield put({type: 'SET_CURRENT_RECIPE', payload: response.data})
  } catch (error) {
    console.log('GET currentRecipe request failed:', error);
  }
}

export default function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes)
  yield takeLatest('FETCH_RECIPE_CATEGORIES', fetchRecipeCategories)
  yield takeLatest('FETCH_MOST_COOKED', fetchMostCooked)
  yield takeLatest('FETCH_CURRENT_RECIPE', fetchCurrentRecipe)
}