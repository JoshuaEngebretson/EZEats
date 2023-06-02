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

function* deleteCurrentRecipe({payload: currentRecipeId}) {
  try {
    const response = yield axios.delete(`/api/recipes/${currentRecipeId}`)
  } catch (error) {
    console.log('DELETE currentRecipe request failed:', error);
  }
}

function* increaseOnMenu(action) {
  try {
    const increaseNumber = {adjustment:'increaseNumber'} 
    const response = yield axios.put(`/api/recipes/adjust-on-menu/${action.payload}`, increaseNumber)
    yield put({type:'FETCH_CURRENT_RECIPE', payload: action.payload})
    yield put({type:'FETCH_SHOPPING_LIST'})
  } catch (error) {
    console.log('Error inside increaseOnMenu saga:', error);
  }
}

function* decreaseOnMenu(action) {
  try {
    const decreaseNumber = {adjustment:'decreaseNumber'}
    const response = yield axios.put(`/api/recipes/adjust-on-menu/${action.payload}`, decreaseNumber)
    yield put({type:'FETCH_CURRENT_RECIPE', payload: action.payload})
    yield put({type:'FETCH_SHOPPING_LIST'})
  } catch (error) {
    console.log('Error inside decreaseOnMenu saga:', error);
  }
}

function* removeRecipeFromMenu(action) {
  try {
    const removeRecipe = {adjustment:'removeRecipe'}
    const response = yield axios.put(`/api/recipes/adjust-on-menu/${action.payload}`, removeRecipe)
    yield put({type: 'FETCH_SHOPPING_LIST'})
  } catch (error) {
    console.log('Error inside removeRecipeFromMenu saga:', error);
  }
}

function* fetchShoppingList() {
  try {
    const {data:shoppingList} = yield axios.get('/api/recipes/shopping-list')
    console.log('shopping list inside saga:', shoppingList);
    yield put({type: 'SET_SHOPPING_LIST', payload: shoppingList})
  } catch (error) {
    console.log('Error inside fetchShoppingList saga:', error);
  }
}

function* increaseTimesCooked({payload: id}) {
  try {
    const response = yield axios.put(`/api/recipes/times-cooked/${id}`)
    yield put({type: 'FETCH_MOST_COOKED'})
    yield put({type: 'FETCH_CURRENT_RECIPE', payload: id})
  } catch (error) {
    console.log('Error inside increaseTimesCooked saga:', error);
  }
}

function* fetchUnitsOfMeasurement() {
  try {
    const { data: unitsOfMeasurement } = yield axios.get('/api/recipes/units-of-measurement')
    yield put({type: 'SET_UNITS_OF_MEASUREMENT', payload: unitsOfMeasurement})
  } catch (error) {
    console.log('Error inside fetchUnitsOfMeasurement saga:', error);
  }
}

function* fetchAllIngredients() {
  try {
    const { data: allIngredients } = yield axios.get('/api/recipes/all-ingredients')
    yield put({type: 'SET_ALL_INGREDIENTS', payload: allIngredients})
  } catch (error) {
    console.log('Error inside fetchAllIngredients saga:', error);
  }
}

export default function* recipesSaga() {
  yield takeLatest('FETCH_CURRENT_RECIPE', fetchCurrentRecipe)
  yield takeLatest('DELETE_CURRENT_RECIPE', deleteCurrentRecipe)

  yield takeLatest('FETCH_MOST_COOKED', fetchMostCooked)
  yield takeLatest('FETCH_RECIPES', fetchRecipes)

  yield takeLatest('FETCH_ALL_INGREDIENTS', fetchAllIngredients)
  yield takeLatest('FETCH_RECIPE_CATEGORIES', fetchRecipeCategories)
  yield takeLatest('FETCH_UNITS_OF_MEASUREMENT', fetchUnitsOfMeasurement)

  yield takeLatest('FETCH_SHOPPING_LIST', fetchShoppingList)
  yield takeLatest('INCREASE_ON_MENU', increaseOnMenu)
  yield takeLatest('DECREASE_ON_MENU', decreaseOnMenu)

  yield takeLatest('REMOVE_RECIPE_FROM_MENU', removeRecipeFromMenu)

  yield takeLatest('INCREASE_TIMES_COOKED', increaseTimesCooked)
  
}