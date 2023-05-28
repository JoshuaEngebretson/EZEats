export default function DisplayShoppingListIngredients({foodCategories, combinedIngredients}) {
  return (
    <>
    {foodCategories.map(foodCategory => {
      // Capitalize the first character of each foodCategory before writing it to the DOM
      const capitalizedFoodCategory = foodCategory.charAt(0).toUpperCase() + foodCategory.slice(1);
      // Display Produce as the first food category on the shoppingList due to this being the
      //  area you enter into in most grocery stores.
      if (foodCategory === 'produce') {
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
      }
    })}
    {foodCategories.map(foodCategory => {
      // Capitalize the first character of each foodCategory before writing it to the DOM
      const capitalizedFoodCategory = foodCategory.charAt(0).toUpperCase() + foodCategory.slice(1);
      // Since produce has already been displayed, exclude that from this mapping.
      if (foodCategory !== 'produce') {
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
      }
    })}
    </>
  )
}