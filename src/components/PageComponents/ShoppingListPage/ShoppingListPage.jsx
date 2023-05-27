import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import RecipeImageCard from "../../ReusableComponents/RecipeImageCard/RecipeImageCard"

export default function ShoppingListPage() {
  const dispatch = useDispatch();
  const shoppingList = useSelector(store => store.recipes.shoppingList)
  console.log('shoppingList inside ShoppingListPage:', shoppingList);

  useEffect(() => {
    dispatch({
      type: 'FETCH_SHOPPING_LIST'
    })
  }, [])

  if (shoppingList.recipeCards != undefined){
    const recipeCards = shoppingList.recipeCards
    console.log('recipeCards inside ShoppingListPage:', recipeCards);
    const combinedIngredients = shoppingList.combinedIngredients
    console.log('combinedIngredients inside ShoppingListPage:', combinedIngredients);
    const foodCategories = shoppingList.foodCategories
    return (
      <>
        <h2>Planned Meals</h2>
        <div className='grid'>
          {recipeCards.map(recipe => {
            return (
              <RecipeImageCard
                key={recipe.id}
                recipe={recipe}
              />
            ) 
          })}
        </div>
        <h2>Shopping List</h2>
        {foodCategories.map(foodCategory => {
          // Capitalize the first character of each foodCategory before writing it to the DOM
          const capitalizedFoodCategory = foodCategory.charAt(0).toUpperCase() + foodCategory.slice(1);
          return (
            <div>
            <h4>{capitalizedFoodCategory}</h4>
            {combinedIngredients.map(ingredient => {
              if (ingredient.foodCategory === foodCategory){
                const shoppingListQuantity = ingredient.shoppingListQuantity
                return (
                  <li key={ingredient.ingredientAndConversionCategory}>
                    {shoppingListQuantity.quantity} {shoppingListQuantity.unit} {ingredient.ingredient}
                  </li>
                ) 
              }
            })}
            </div>
          )

        })}

        
      </>
    )
  }
}