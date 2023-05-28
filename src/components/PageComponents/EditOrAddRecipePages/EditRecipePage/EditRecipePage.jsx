import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import EditOrAddRecipePageTemplate from "../EditOrAddTemplate/EditOrAddTemplate";

export default function AddRecipePage() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const currentRecipe = useSelector(store => store.recipes.currentRecipe[0])
  
  useEffect(() => {
    if (Number(id)) {
      dispatch({
        type: 'FETCH_CURRENT_RECIPE',
        payload: id
      })
    }
  }, [])

  if(currentRecipe != undefined) {

    // console.log('currentRecipe inside EditRecipePage', currentRecipe);

    const inputs = {
      image: currentRecipe.image,
      recipeName: currentRecipe.name,
      timesCooked: currentRecipe.times_cooked,
      recipeText: currentRecipe.recipe_text,
      recipeIngredients: currentRecipe.ingredients,
    }

    return (
      <>
        <h1>Inside Edit Page view</h1>
        <h2>We would be editing the recipe with id = {id}</h2>
        <EditOrAddRecipePageTemplate 
          inputs={inputs}
          id={id}
        />
      </>
    )
  }
}