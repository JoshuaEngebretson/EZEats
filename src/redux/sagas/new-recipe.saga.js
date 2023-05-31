import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import logger from 'redux-logger';

function* createNewRecipe({payload: newRecipe}) {
  try {
    console.log('newRecipe within saga:', {...newRecipe});
    if(isNaN(newRecipe.categoryInput)) {
      const {data: newCategoryId} = yield axios.post('/api/recipes/recipe-categories', {data: newRecipe.categoryInput})
      newRecipe.categoryInput = newCategoryId
    }
    for (let ingredient of newRecipe.recipeIngredients) {
      if(isNaN(ingredient.unit.id)) {
        console.log('ingredient.units.name:', ingredient.unit.name);
        // const {data: newUnitId} = yield axios.post('/api/recipes/units-of-measurement', {data: ingredient.units.name})
        // ingredient.units.id = newUnitId
      }
      if(isNaN(ingredient.ingredient.id)) {
        console.log('ingredient.ingredient.name:', ingredient.ingredient.name);
        // const {data: newIngredientId} = yield axios.post('/api/recipes/ingredients', {data: ingredient.ingredient.name})
        // ingredient.ingredient.id = newIngredientId
      }
      if(isNaN(ingredient.ingredient.foodCategory)) {
        console.log('ingredient.ingredient.foodCategory:', ingredient.ingredient.foodCategory);
        // const {data: newFoodCategoryId} = yield axios.post('/api/recipes/food-categories', {data: ingredient.ingredient.foodCategory})
      }
    }
    console.log('newRecipe within post creations saga:', {...newRecipe});
    // const response = yield axios.post('/api/recipes/', newRecipe)
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

export default function* recipesSaga() {
  yield takeLatest('CREATE_NEW_RECIPE', createNewRecipe)
  yield takeLatest('FETCH_NEW_RECIPE', fetchNewRecipe)
}