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

function* increaseOnMenu(action) {
  try {
    const increaseNumber = {adjustment:'increaseNumber'} 
    const response = yield axios.put(`/api/recipes/adjust-on-menu/${action.payload}`, increaseNumber)
    yield put({type:'FETCH_CURRENT_RECIPE', payload: action.payload})
  } catch (error) {
    console.log('Error inside increaseOnMenu saga:', error);
  }
}

function* decreaseOnMenu(action) {
  try {
    const decreaseNumber = {adjustment:'decreaseNumber'}
    const response = yield axios.put(`/api/recipes/adjust-on-menu/${action.payload}`, decreaseNumber)
    yield put({type:'FETCH_CURRENT_RECIPE', payload: action.payload})
  } catch (error) {
    console.log('Error inside decreaseOnMenu saga:', error);
  }
}

function* fetchShoppingList() {
  try {
    const {data:shoppingList} = yield axios.get('/api/recipes/shopping-list')
    // console.log('shopping list inside saga:', shoppingList);
    // yield put({type: 'SET_SHOPPING_LIST', payload: shoppingList})
  } catch (error) {
    console.log('Error inside fetchShopping List saga:', error);
  }
}

export default function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes)
  yield takeLatest('FETCH_RECIPE_CATEGORIES', fetchRecipeCategories)
  yield takeLatest('FETCH_MOST_COOKED', fetchMostCooked)
  yield takeLatest('FETCH_CURRENT_RECIPE', fetchCurrentRecipe)
  yield takeLatest('INCREASE_ON_MENU', increaseOnMenu)
  yield takeLatest('DECREASE_ON_MENU', decreaseOnMenu)
  yield takeLatest('FETCH_SHOPPING_LIST', fetchShoppingList)
}