import './ShoppingListPage.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import PlannedMealCard from "./PlannedMealCard/PlannedMealCard";
import DisplayShoppingListIngredients from "./DisplayShoppingListIngredients/DisplayShoppingListIngredients";

export default function ShoppingListPage() {
  const dispatch = useDispatch();
  const shoppingList = useSelector(store => store.recipes.shoppingList)
  console.log('shoppingList inside ShoppingListPage:', shoppingList);

  useEffect(() => {
    dispatch({type: 'FETCH_SHOPPING_LIST'})
  }, [])

  if (shoppingList.recipeCards != undefined){
    const recipeCards = shoppingList.recipeCards
    console.log('recipeCards inside ShoppingListPage:', recipeCards);
    const combinedIngredients = shoppingList.combinedIngredients
    console.log('combinedIngredients inside ShoppingListPage:', combinedIngredients);
    const foodCategories = shoppingList.foodCategories
    return (
      <div className='page-margin'>
        <h2>Planned Meals</h2>
        <div className='grid'>
          {recipeCards.map(recipe => {
            return (
              <PlannedMealCard
                key={recipe.id}
                recipe={recipe}
              />
            ) 
          })}
        </div>
        <div className='shopping-list-container'>
          <h2 className='center'>Shopping List</h2>
          <div className='shopping-list'>
            <DisplayShoppingListIngredients
              foodCategories={foodCategories}
              combinedIngredients={combinedIngredients}
            />
          </div>
        </div>
      </div>
    )
  }
}