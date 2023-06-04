import './EditOrAddTemplate.css'
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import IngredientsInput from "./IngredientsInput/IngredientsInput";
import Swal from 'sweetalert2';

export default function EditOrAddRecipePageTemplate(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const deletedIngredientsArray = []

  const {
    inputs, id, handleImageChange, handleRecipeNameChange,
    handleRecipeTextChange, handleRecipeIngredientsChange,
    handleCategoryIdChange, handleSaveRecipe
  } = props;

  useEffect(() => {
    dispatch({type: 'FETCH_RECIPE_CATEGORIES'});
    dispatch({ type: 'FETCH_UNITS_OF_MEASUREMENT' });
    dispatch({ type: 'FETCH_ALL_INGREDIENTS' });
    setIngredientsInputArray(inputs.recipeIngredients)
  }, [id, inputs.recipeIngredients])

  // Functions to deal with the whole page
    // Save Recipe, Delete Recipe, Cancel Add, Reset Cooked Count
  const saveRecipeButton = () => {
    if (id && deletedIngredientsArray.length > 0) {
      // If we are editing a recipe, we want to capture what
      //  recipe_ingredients have been deleted so we can remove those
      //  from the database
        // The id that is associated with each deleted ingredient in
        //  the array should be the recipe_ingredients id that we want
        //  to delete
      console.log(deletedIngredientsArray);
      return (
        <div
        className='stacked-buttons add'
        onClick={() => handleSaveRecipe(deletedIngredientsArray)}
        >
          <p className='center'>Save Recipe</p>
        </div>
      )
    } else {
      return (
        <div
        className='stacked-buttons add'
        onClick={handleSaveRecipe}
        >
          <p className='center'>Save Recipe</p>
        </div>
      )
    }
  }
  const cancelButton = () => {
    if (id) {
      // If an id is present, we are editing a recipe and want to 'Cancel Edit'
      //  This will take us back to that recipe's view-recipe page
      return (
        <div className='stacked-buttons cancel' onClick={() => history.push(`/view-recipe/${id}`)}>
          <p className='center'>Cancel Edit</p>
        </div>
      )
    }
    else {
      // Else we are adding a recipe and want to 'Cancel Add'
      //  Which would take us back to the home page
      return (
        <div className='stacked-buttons cancel' onClick={() => history.push(`/home`)}>
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
        // Confirm with the user they want to delete this recipe
        Swal.fire({
          icon: 'warning',
          title: 'Delete Recipe Confirmation',
          text: `Are you sure you want to remove ${inputs.recipeName} from the database?`,
          showCancelButton: true,
          confirmButtonText: `Yes, Delete ${inputs.recipeName}.`,
          cancelButtonText: `No, I want to cancel!`,
        }).then((result) => {
          if (result.isConfirmed) {
            // If confirmed, delete the recipe and let the user know it's been deleted
            dispatch({type: 'DELETE_CURRENT_RECIPE', payload: id})
            Swal.fire({
              icon: 'success',
              title: 'Deletion Complete',
              text: `${inputs.recipeName} has been deleted from the database.`
            })
            // On successful delete, route the user to the home page
            history.push('/home')
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Else if cancelled, let the user know the recipe still exists
            Swal.fire({
              icon: 'warning',
              title: 'Deletion Cancelled',
              text: `That was close, ${inputs.recipeName} is still in the database.`
            })
          }
        })
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
    else {
      return ''
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
          <p className='center' >Reset Cooked Count</p>
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
  const categoryChange = (value) => {
    if (value === 'other') {
      setToggleCategoryInput(true)
      setCategoryInput(value)
      handleCategoryIdChange(value)
    } else {
      setToggleCategoryInput(false)
      handleCategoryIdChange(Number(value))
    } 
  }
  const handleCategoryInputChange = (value) => {
    setCategoryInput(value);
    handleCategoryIdChange(value);
  }
  const otherCategory = () => {
    if (toggleCategoryInput) {
      return (
        <input
        type='text'
        placeholder='Enter new category'
        value={categoryInput}
        onChange={e => handleCategoryInputChange(e.target.value)}
        />
      )
    }
  }
  // End functions to deal with selecting a category

  // Functions to deal with with entering ingredients
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
      deletedIngredientsArray.push(thing);
      console.log(newIngredients);
    }
  }
  // End functions to deal with with entering ingredients

  if(
    inputs!== undefined
    && 
    categories && 
    ingredientsInputArray && 
    ingredientsInputArray.length > 0
  ) {
    return (
    <div className='page-margin'>
      <div className='center'>
        {/* Show the Recipe name across the top of the page */}
        <h1>{inputs.recipeName}</h1>
        {/* Recipe Image Input */}
        <label>Recipe Image Url:</label>
        <input 
          type='text'
          placeholder='Image Url'
          value={inputs.image}
          onChange={e => handleImageChange(e.target.value)}
        />
        <img src={inputs.image} className='square-image-small'/>
        {/*Recipe Name Input */}
        <label>Recipe Name:</label>
        <input 
          type='text'
          placeholder='Recipe Name'
          value={inputs.recipeName}
          onChange={e => handleRecipeNameChange(e.target.value)}
        />
        {/* Category Input */}
        <label htmlFor='category-select'>Select a category: </label>
        <select
          name='category-select'
          id='category-select'
          onChange={e => categoryChange(e.target.value)}
          value={inputs.categoryId}>
          <option value='' default>--Please select a category--</option>
          {categories.map(category => {
            return (
              <option key={category.id} value={category.id}>{category.name}</option>
            )
          })}
          <option value='other'>Other</option>
        </select>
        {otherCategory()}
      </div>
      <br />
      <div className='ingredients-form'>
        <h3 className='table-title center'>Enter Ingredients</h3>
        <table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Units of Measurement</th>
              <th>Ingredient Name</th>
              <th>Optional:<br/> Prepared Method (e.g., sliced, minced)</th>
              <th>
                Optional: <br/> For which part of the recipe? (e.g., sauce, garnish)
              </th>
              <th>Delete</th>
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
        <button onClick={addNewIngredientLine} className='add'>Add New Line</button>
      </div>
      <div className='bottom-container'>
        <div className='textarea-container'>
          <textarea
            placeholder='Enter Recipe Here'
            value={inputs.recipeText}
            onChange={(e) => handleRecipeTextChange(e.target.value)}
          />
        </div>
        <div className='button-container'>
        {resetCookedCountButton()}
        {deleteRecipeButton()}
        {cancelButton()}
        {saveRecipeButton()}
        </div>
      </div>
    </div>
  )}

}