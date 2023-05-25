import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import RecipeImageCard from "../../ReusableComponents/RecipeImageCard/RecipeImageCard"

export default function ShoppingListPage() {
  const dispatch = useDispatch();
  const shoppingList = useSelector(store => store.recipes.shoppingList)

  useEffect(() => {
    dispatch({
      type: 'FETCH_SHOPPING_LIST'
    })
  }, [])

  return (
    <>
      <h2>Planned Meals</h2>
      {/* {shoppingList.map(recipe => {
        return (
          <RecipeImageCard
            key={recipe.id}
            recipe={recipe}
          />
        ) 
      })} */}
      <h2>Shopping List</h2>
      {/* {shoppingList.ingredients.map(ingredient => {
        return (
          <li key={ingredient.recipeIngredientId}>
            {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
          </li>
        ) 
      })} */}
      
    </>
  )
}