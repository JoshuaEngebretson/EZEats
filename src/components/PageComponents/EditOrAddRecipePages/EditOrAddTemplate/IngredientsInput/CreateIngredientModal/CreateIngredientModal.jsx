import './CreateIngredientModal.css'
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";

export default function CreateIngredientModal() {
  const dispatch = useDispatch();
  const foodCategories = useSelector(store => store.recipes.allIngredients.foodCategories)
  const [showCreateIngredient, setShowCreateIngredient] = useState(false)
  const [ingredientInput, setIngredientInput] = useState('')
  const [showFoodCategoryInput, setShowFoodCategoryInput] = useState(false)
  const [foodCategoryInput, setFoodCategoryInput] = useState('')

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        toggleModal()
      }
    }
    if (showCreateIngredient) {
      document.addEventListener('keydown', handleKeyDown)
    }
    else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showCreateIngredient])

  if (showCreateIngredient) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const toggleModal = () => {
    // Flip to true if currently false
    // OR
    // Flip to false if currently true
    setShowCreateIngredient(!showCreateIngredient)
    setIngredientInput('')
    setFoodCategoryInput('')
  }
  const saveNewIngredient = async () => {
    console.log('clicked save Ingredient');
    if (ingredientInput !== '' &&
    foodCategoryInput !== ''
    ) {
      const newIngredient = {
        ingredientName:ingredientInput,
        foodCategory: foodCategoryInput
      }
      console.log('newIngredient:', newIngredient);
      dispatch({
        type: 'CREATE_NEW_INGREDIENT',
        payload: newIngredient
      })
      // toggleModal()
    }
    else {
      alert('Please ensure both fields are filled in')
    }
  }
  const cancelNewIngredient = () => {
    console.log('clicked cancelNewIngredient');
    toggleModal()
  }

  const handleFoodCategorySelectChange = (e) => {
    let value = e.target.value
    if(value === 'other') {
      setShowFoodCategoryInput(true)
    } else {
      setShowFoodCategoryInput(false)
    }
    setFoodCategoryInput(value)
  }
  const handleOtherFoodCategoryInput = (e) => {
    let value = e.target.value
    setFoodCategoryInput(value)
  }

  return (
    <>
      <button 
        className="add"
        onClick={toggleModal}
      >
        Create New Ingredient
      </button>

      {showCreateIngredient && (
        <div className="modal">
        <div 
          onClick={cancelNewIngredient}
          className="overlay"></div>
        <div className="modal-content">
          <h2>Create A New Ingredient</h2>
          <label htmlFor='new-ingredient-input'>
            <input 
              placeholder='Enter New Ingredient'
              type='text'
              value={ingredientInput}
              onChange={e => setIngredientInput(e.target.value)}
            />
          </label>
          <div>
            <select
              name='food-category-select'
              id='food-category-select'
              value={foodCategoryInput}
              onChange={e => handleFoodCategorySelectChange(e)}
            >
              <option value=''>--Please select the units--</option>
              {foodCategories.map(category => {
                return (
                  <option key={category.id} value={category.id}>{category.name}</option>
                )
              })}
              <option value='other'>Create New Food Category</option>
            </select>
            {showFoodCategoryInput && (
              <>
                <br />
                <input 
                  placeholder='Enter New Food Category'
                  value={foodCategoryInput}
                  onChange={e => handleOtherFoodCategoryInput(e)}
                />
              </>
            )}
          </div>
          <br />
          <button
            className='add'
            onClick={saveNewIngredient}
          >
            Save Ingredient
          </button>
          <button
            className='close-modal'
            onClick={cancelNewIngredient}
          >
            ❌
          </button>
        </div>
      </div>
      )}
    </>
  )
}