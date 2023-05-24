import './HomePage.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeCategory from "./RecipeCategory/RecipeCategory";
import RecipeImageCard from "./RecipeImageCard/RecipeImageCard";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_RECIPE_CATEGORIES'});
    dispatch({type: 'FETCH_RECIPES'});
    dispatch({type: 'FETCH_MOST_COOKED'});
  }, [])

  const categories = useSelector(store => store.recipes.recipeCategories)
  const mostCooked = useSelector(store => store.recipes.mostCooked)
  
  return (
    <>
      <h1>Inside the logged in Home Page view</h1>
      <h2>Most Prepared</h2>
      <div className="grid">
        {mostCooked.map(recipe => {
          return (
            <RecipeImageCard
              key={recipe.id}
              recipe={recipe}
            />
          )
        })}
      </div>
      <h2>Categories</h2>
      
      {categories.map(category => {
        return (
          <RecipeCategory
            key={category.id}
            category={category}
          />
        )
      })}
    </>
  )
}