import './EditOrAddTemplate.css'
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import IngredientsInput from "./IngredientsInput/IngredientsInput";

export default function EditOrAddRecipePageTemplate(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    inputs,
    id,
    handleImageChange,
    handleRecipeNameChange,
    handleRecipeTextChange,
    handleRecipeIngredientsChange,
    handleCategoryIdChange
  } = props;

  useEffect(() => {
    dispatch({type: 'FETCH_RECIPE_CATEGORIES'});
    if (id) {
      setIngredientsInputArray(inputs.recipeIngredients)
      setCategoryInput(inputs.categoryId)
    }
  }, [inputs])

  console.log('*****');
  console.log('inputs:', inputs);
  console.log('*****');

  // Functions to deal with the whole page
    // Save Recipe, Delete Recipe, Cancel Add, Reset Cooked Count
  const saveRecipeButton = () => {
    const handleSaveRecipe = () => {
      // If successful would push to that recipes page
        // Need to figure out how to grab the id of 
    }
    return (
      <div
      className='stacked-buttons add'
      onClick={handleSaveRecipe}
      >
        <p className='center'>Save Recipe</p>
      </div>
    )
  }
  const cancelButton = () => {
    const handleCancelButton = () => {
      // Maybe route to view recipe page if this was an edit?
        // Unsure how to implement
        // function could be passed down via the parent??
      history.push('/home')
    }
    // If an id is present, we are editing a recipe and want to 'Cancel Edit'
    if (id) {
      return (
        <div className='stacked-buttons cancel' onClick={handleCancelButton}>
          <p className='center'>Cancel Edit</p>
        </div>
      )
    }
    // Else we are adding a recipe and want to 'Cancel Add'
    else {
      return (
        <div className='stacked-buttons cancel' onClick={handleCancelButton}>
          <p className='center'>Cancel Add</p>
        </div>
      )
    }
  }
  // The following Buttons should only be visible if
  //  an id was passed into this template
  const deleteRecipeButton = () => {
    if (id) {
      const handleDeleteRecipe = () => {
        // On successful delete, route the user to the home page
        history.push('/home')
        dispatch({type: 'DELETE_CURRENT_RECIPE', payload: id})
      }
      return (
        <div
          className='stacked-buttons delete'
          onClick={handleDeleteRecipe}
        >
          <p className='center'>Delete Recipe</p>
        </div>
      )
    }
  }
  const resetCookedCountButton = () => {
    if (id) {
      const handleResetCookedCount = () => {
        dispatch({type: 'RESET_COOKED_COUNT', payload: id})
      }
      return (
        <div
          className='stacked-buttons subtract'
          onClick={handleResetCookedCount}
        >
          <p class='center' >Reset Cooked Count</p>
        </div>
      )
    }
  }
  // End Functions to deal with the whole page
    // Save Recipe, Delete Recipe, Cancel Add, Reset Cooked Count

  // functions to deal with selecting a category
  const categories = useSelector(store => store.recipes.recipeCategories)
  const [toggleCategoryInput, setToggleCategoryInput] = useState(false)
  const [categoryInput, setCategoryInput] = useState(inputs.categoryId)
  const handleCategorySelect = (e) => {
    let selectedCategory = e.target.value
    // console.log('value of category-select:', selectedCategory);
    if (selectedCategory === 'other') {
      setToggleCategoryInput(true)
    }
    else {
      setToggleCategoryInput(false)
      setCategoryInput(selectedCategory)
    }
  }
  const otherCategory = () => {
    if (toggleCategoryInput) {
      return (
        <input
        type='text'
        placeholder='Enter new category'
        value={categoryInput}
        onChange={e => setCategoryInput(e.target.value)}
        />
      )
    }
  }
  // End functions to deal with selecting a category

  // Functions to deal with with entering ingredients
  const initialIngredientObj = {
    quantity: '',
    units: '',
    ingredient: '',
    method: '',
    forWhichPart: '',
  }
  const [ingredientsInputArray, setIngredientsInputArray] = useState([initialIngredientObj]);
  const addNewIngredientLine = () => {
    setIngredientsInputArray([
      ...ingredientsInputArray,
      initialIngredientObj
    ])
  }
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredientsInputArray];
    newIngredients[index][field] = value;
    setIngredientsInputArray(newIngredients);
    handleRecipeIngredientsChange(newIngredients)
  }
  const handleDeleteLine = (index) => {
    const newIngredients = [...ingredientsInputArray];
    
    if (newIngredients.length > 1) {
      let thing = newIngredients.splice(index, 1);
      setIngredientsInputArray(newIngredients);
      handleRecipeIngredientsChange(newIngredients)
      console.log('thing deleted', thing);
      console.log(newIngredients);
    }
  }
  // End functions to deal with with entering ingredients

  console.log('ingredientsInputArray:', ingredientsInputArray);
  console.log('categories:', categories);

  if(
    inputs!== undefined
    && 
    categories && 
    ingredientsInputArray && 
    ingredientsInputArray.length > 0
  ) {
    return (
    <>
      <h2>This is the Edit Or Add Recipe Page Template</h2>
      <div>
        {/* Recipe Image Input */}
        <input 
          type='text'
          placeholder='image url'
          value={inputs.image}
        />
        <img src={inputs.image} className='square-image-small'/>
        {/*Recipe Name Input */}
        <input 
          type='text'
          placeholder='Recipe Name'
          value={inputs.recipeName}
        />
        {/* Category Input */}
        <label htmlFor='category-select'>Select a category: </label>
        <select name='category-select' id='category-select' onChange={handleCategorySelect} value={categoryInput}>
          <option value='' default>--Please select a category--</option>
          {categories.map(category => {
            return (
              <option key={category.id} value={category.id}>{category.name}</option>
            )
          })}
          <option value='other'>Other</option>
        </select>
        {otherCategory()}
        <br />
        {/*  */}
        <div className='ingredients-form'>
          <h3 className='table-title center'>Enter Ingredients</h3>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Units of Measurement</th>
                <th>Ingredient Name</th>
                <th>Optional: Prepared Method (optional)</th>
                <th>Optional: For which part of the recipe? (e.g., sauce, garnish)</th>
                <th>Remove Ingredient</th>
              </tr>
            </thead>
            <tbody>
            {ingredientsInputArray.map((recipeIngredient, index) => {
              // console.log('recipeIngredient during mapping in EditOrAddTemp:', recipeIngredient);
              return (
                <IngredientsInput 
                  key={index}
                  recipeIngredient={recipeIngredient}
                  index={index}
                  handleIngredientChange={handleIngredientChange}
                  handleDeleteLine={handleDeleteLine}
                />
              )
            })}
            </tbody>
          </table>
          {/* <br /> */}
          <button onClick={addNewIngredientLine} className='add'>Add New Line</button>
        </div>
        <div className='recipe-text inline'>
          <textarea
            placeholder='Enter Recipe Here'
            value={inputs.recipeText}
            onChange={(e) => handleRecipeTextChange(e.target.value)}

            // I want this to be dynamic, and stretch about 85% of the page if possible
            rows='5'
            cols='100'
          />
        </div>
        {resetCookedCountButton()}
        {deleteRecipeButton()}
        {cancelButton()}
        {saveRecipeButton()}
      </div>
    </>
  )}

}