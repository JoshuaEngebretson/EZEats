import { useState } from "react";
import EditOrAddRecipePageTemplate from "../EditOrAddTemplate/EditOrAddTemplate";

export default function AddRecipePage() {
  const [imageInput, setImageInput] = useState('')
  const [recipeNameInput, setRecipeNameInput] = useState('')
  const [recipeTextInput, setRecipeTextInput] = useState('')
  const initialIngredientObj = {
    quantity: '',
    units: '',
    ingredient: '',
    method: '',
    forWhichPart: '',
  }
  const [recipeIngredientsArray, setRecipeIngredientsArray] = useState([initialIngredientObj])

  let inputs = {
    image: {
      imageInput,
      setImageInput
    },
    recipeName: {
      recipeNameInput,
      setRecipeNameInput
    },
    recipeText: {
      recipeTextInput,
      setRecipeTextInput
    },
    recipeIngredients: {
      recipeIngredientsArray,
      setRecipeIngredientsArray
    }

  }

  return (
    <>
      <h1>Inside Add Recipe Page view</h1>
      <EditOrAddRecipePageTemplate
        inputs={inputs}
      />
    </>
  )
}