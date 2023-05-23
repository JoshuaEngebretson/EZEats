import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({type: 'FETCH_RECIPES'});
  }, [])

  const recipes = useSelector(store => store.recipes)
  const mostCooked = useSelector(store => store.mostCooked)
  
  return (
    <>
      <h1>Inside the logged in Home Page view</h1>
      {
        recipes.map(recipe => {
          let recipeAsParagraph = recipe.recipe_text.split('\n')
          console.log(recipeAsParagraph)
          return (
            <div key={recipe.id}>
              <h1>{recipe.name}</h1>
              <img 
                src={recipe.image}
                alt ={`An image of ${recipe.name}`}
              />
              <h3>Ingredients</h3>
              <ul>
                {
                  recipe.ingredients.map(ingredient => {
                    return (
                      <li key={ingredient.recipeIngredientId}>
                        {ingredient.quantity} {ingredient.unit} {ingredient.ingredient} {ingredient.method}
                      </li>
                    )
                  })
                }
              </ul>
              <h3>Preparation</h3>
              <ol>
                {
                  recipeAsParagraph.map(paragraph => {
                    return <li>{paragraph}</li>
                  })
                }
              </ol>
              
                
            </div>
          )
        })
      }
    </>
  )
}