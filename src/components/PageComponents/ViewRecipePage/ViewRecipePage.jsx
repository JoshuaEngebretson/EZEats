import './ViewRecipePage.css'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"

export default function ViewRecipePage() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const currentRecipe = useSelector(store => store.recipes.currentRecipe[0])

  useEffect(() => {
    dispatch({
      type: 'FETCH_CURRENT_RECIPE',
      payload: id
    })
  }, [])

  // confirm currentRecipe is defined, then render information
  //  This ensures that the page will load
  if (currentRecipe != undefined){
    // This separates out the recipe into an array an allows for
    // the recipe to be viewed on multipe lines
    let recipeAsParagraph = currentRecipe.recipe_text.split('\n')

    // This creates an array of different parts within the recipe
    // such as a sauce that is paired with a main part
    let recipeParts = [];
    for (let part of currentRecipe.forWhichPart) {
      if (part !== null) {
        if (!recipeParts.includes(part)){
          recipeParts.push(part)
        }
      }
    }

    return (
      <>
        <div key={currentRecipe.id}>
          <h1>{currentRecipe.name}</h1>
          <h2>{currentRecipe.category}</h2>
          <img 
            src={currentRecipe.image}
            alt ={`An image of ${currentRecipe.name}`}
            className='square-image-medium'
          />
          <h3>Ingredients</h3>
          <ul>
            {
              currentRecipe.ingredients.map(ingredient => {
                if (!ingredient.forWhichPart){
                  return (
                    <li key={ingredient.recipeIngredientId}>
                      {ingredient.quantity} {ingredient.unit} {ingredient.ingredient} {ingredient.method}
                    </li>
                  )
                }
              })
            }
          </ul>
          {
            /*
              This portion specifically will only be rendered if there are
              different parts within the ingredients
              Example: a recipe with a main part and a separate sauce.
            */
            recipeParts.map(part=> {
              return (
                <>
                <h4 key={part}>{part}</h4>
                <ul>
                  {
                    // Only show the ingredients that match with the current part
                    // that has been mapped
                    currentRecipe.ingredients.map(ingredient => {
                      if (ingredient.forWhichPart === part){
                        return (
                          <li key={ingredient.recipeIngredientId}>
                            {ingredient.quantity} {ingredient.unit} {ingredient.ingredient} {ingredient.method}
                          </li>
                        )
                      }
                    })
                  }
                </ul>
                </>
              )
            }) 
          }
          <h3>Preparation</h3>
          <ol>
            {
              recipeAsParagraph.map(paragraph => {
                return <li key={paragraph}>{paragraph}</li>
              })
            }
          </ol>       
        </div>
      </>
    )
  }
  else {
    return (
      <div className='center'>
        <h1>404</h1>
        <h2>you do not have a recipe at this address</h2>
      </div>
    )
  }
}