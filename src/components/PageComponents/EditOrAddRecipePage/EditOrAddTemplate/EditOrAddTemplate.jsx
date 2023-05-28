import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import IngredientsInput from "./IngredientsInput/IngredientsInput";

export default function EditOrAddRecipePageTemplate({inputs}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector(store => store.recipes.recipeCategories)
  const [toggleCategoryInput, setToggleCategoryInput] = useState(false)
  const [categoryInput, setCategoryInput] = useState('')
  let IngredientsInputArray = [];

  useEffect(() => {
    dispatch({type: 'FETCH_RECIPE_CATEGORIES'});
  }, [])

  const handleFormSave = () => {
    history.push('/home')
  }

  const handleCategorySelect = (e) => {
    let selectedCategory = e.target.value
    console.log('value of category-select:', selectedCategory);
    if (selectedCategory === 'other') {
      setToggleCategoryInput(true)
    }
    else {
      setToggleCategoryInput(false)
      console.log('Expected false:', toggleCategoryInput);
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

  return (
    <>
      <h2>This is the Edit Or Add Recipe Page Template</h2>
      <form>
        {/* Recipe Image Input */}
        <input 
          type='text'
          placeholder='image url'
        />
        {/*Recipe Name Input */}
        <input 
          type='text'
          placeholder='Recipe Name'
        />
        {/* Category Input */}
        <label htmlFor='category-select'>Select a category</label>
        <select name='category-select' id='category-select' onChange={handleCategorySelect}>
          <option value=''>--Please select a category--</option>
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
        <div>
          <h3>Enter Ingredients</h3>
          <IngredientsInput />
          {IngredientsInputArray.map(input => {
            <IngredientsInput />
          })}
        </div>
      </form>
    </>
  )

}