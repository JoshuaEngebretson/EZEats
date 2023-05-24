import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RecipeCategory from "./RecipeCategory/RecipeCategory";

export default function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();

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
      <h2>Most Cooked</h2>
      {/* {mostCooked.map(recipe => {
        return (
          
        )
      })} */}
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