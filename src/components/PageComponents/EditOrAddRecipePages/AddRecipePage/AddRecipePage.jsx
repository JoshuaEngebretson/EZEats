import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditOrAddRecipePageTemplate from "../EditOrAddTemplate/EditOrAddTemplate";
import { useHistory } from "react-router-dom";

export default function AddRecipePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [imageInput, setImageInput] = useState('')
  const [recipeNameInput, setRecipeNameInput] = useState('')
  const [recipeTextInput, setRecipeTextInput] = useState('')
  const initialIngredientObj = {
    quantity: '',
    unit: {
      id: 0,
      name: '',
      conversionCategory: ''
    },
    ingredient: {
      id: 0,
      name: '',
      foodCategory: ''
    },
    method: '',
    forWhichPart: '',
  }
  const [recipeIngredientsArray, setRecipeIngredientsArray] = useState([initialIngredientObj])
  const [categoryInput, setCategoryInput] = useState('')
  const newRecipeId = useSelector(store => store.newRecipeId)

  useEffect(() => {
    // When this page is loaded, clear out the most recent newRecipeId
    dispatch({type: 'CLEAR_NEW_RECIPE_ID'})
  }, [])

  let inputs = {
    image: imageInput,
    recipeName: recipeNameInput,
    recipeText: recipeTextInput,
    recipeIngredients: recipeIngredientsArray,
    categoryId: categoryInput 
  }
  console.log('inputs within AddRecipePage:', inputs);
  const handleImageChange = (value) => {
    setImageInput(value)
  }
  const handleRecipeNameChange = (value) => {
    setRecipeNameInput(value)
  }
  const handleRecipeTextChange = (value) => {
    setRecipeTextInput(value)
  }
  const handleRecipeIngredientsChange = (array) => {
    setRecipeIngredientsArray(array)
  }
  const handleCategoryIdChange = (value) => {
    setCategoryInput(value)
  }
  const handleSaveRecipe = () => {
    // Check to confirm the required fields are filled out before
    // attempting to create a newRecipe.
    if (
      recipeNameInput!== '' && 
      categoryInput !== '' && 
      recipeTextInput !== '' &&
      recipeIngredientsArray.length > 0
      ) {
      const newRecipe = {
        image: imageInput,
        recipeName: recipeNameInput,
        recipeText: recipeTextInput,
        recipeIngredients: recipeIngredientsArray,
        categoryInput 
      }
      dispatch({
        type: 'CREATE_NEW_RECIPE',
        payload: newRecipe
      })
      // If successful would push to that recipes page
          // Need to figure out how to grab the newRecipeId...
      // confirm we have received a newRecipeId from redux, then
      // the user to the newly created recipe
      
      if (newRecipeId !== undefined) {
        history.push(`/view-recipe/${newRecipeId}`)
      }
      else {
        history.push('/home')
      }
    }
    else {
      alert('please fill out the required fields')
    }
  }

  return (
    <>
      <EditOrAddRecipePageTemplate
        inputs={inputs}
        handleImageChange={handleImageChange}
        handleRecipeNameChange={handleRecipeNameChange}
        handleRecipeTextChange={handleRecipeTextChange}
        handleRecipeIngredientsChange={handleRecipeIngredientsChange}
        handleCategoryIdChange={handleCategoryIdChange}
        handleSaveRecipe={handleSaveRecipe}
      />
    </>
  )
}