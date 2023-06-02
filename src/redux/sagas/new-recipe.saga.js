import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import logger from 'redux-logger';

function* createNewRecipe({payload: newRecipe}) {
  try {
    console.log('newRecipe within saga:', {...newRecipe});
    if(isNaN(newRecipe.categoryInput)) {
      const {data: newCategory} = yield axios.post('/api/recipes/recipe-categories', {data: newRecipe.categoryInput})
      console.log('newCategory:', newCategory);
      newRecipe.categoryInput = newCategory.id
    }
    for (let ingredient of newRecipe.recipeIngredients) {
      if(isNaN(ingredient.unit.id)) {
        console.log('ingredient.units.name:', ingredient.unit.unit);
        const {data: newUnit} = yield axios.post('/api/recipes/units-of-measurement', {data: ingredient.unit.unit})
        console.log('newUnit:', newUnit);
        ingredient.unit.id = newUnit.id
      }
    }
    console.log('newRecipe within post creations saga:', {...newRecipe});
    const response = yield axios.post('/api/recipes/', newRecipe)
    // yield put({type: 'FETCH_RECIPES'})
    // yield put({type: 'FETCH_NEW_RECIPE'})
  } catch (error) {
    console.log('Error within createNewRecipe saga:', error);
  }
}

function* fetchNewRecipe() {
  try {
    const {data:newRecipeId} = yield axios.get('/api/recipes/new-recipe-id')
    yield put({type: 'SET_NEW_RECIPE', payload: newRecipeId})
  } catch (error) {
    console.log('Error within fetchNewRecipeId saga:', error);
  }
}

function* createNewIngredient({payload: newIngredient}) {
  try {
    if(isNaN(newIngredient.foodCategory)) {
      const {data: newFoodCategory} = yield axios.post('/api/recipes/food-categories', {data: newIngredient.foodCategory})
      console.log('newFoodCategoryId:', newFoodCategory);
      newIngredient.foodCategory = newFoodCategory.id
    }
    const response = yield axios.post('/api/recipes/ingredients', {data: newIngredient})
    yield put({type: 'FETCH_ALL_INGREDIENTS'})
  } catch (error) {
    console.log('Error within createNewIngredient saga:', error);
  }
}

export default function* recipesSaga() {
  yield takeLatest('CREATE_NEW_RECIPE', createNewRecipe)
  yield takeLatest('FETCH_NEW_RECIPE', fetchNewRecipe)
  yield takeLatest('CREATE_NEW_INGREDIENT', createNewIngredient)
}