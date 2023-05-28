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

  return (
    <>
      <h1>Inside Edit Page view</h1>
      <h2>We would be editing the recipe with id = {id}</h2>
      <EditOrAddRecipePageTemplate 
        inputs={currentRecipe}
        id={id}
      />
    </>
  )
}