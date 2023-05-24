import RecipeImageCard from "../RecipeImageCard/RecipeImageCard"
import { useSelector } from "react-redux"
import { useState } from "react"

export default function RecipeCategory({category}) {
  const recipes = useSelector(store => store.recipes.allRecipes)
  const [categoryOpen, setCategoryOpen] = useState(false)

  const expandCategory = () => {
    if (categoryOpen) {
      setCategoryOpen(false)
    }
    else {
      setCategoryOpen(true)
    }
  }

  if (categoryOpen) {
    return (
      <div>
        <h4 onClick={expandCategory}>{category.name}</h4>
        <div className="grid">
          {
            recipes.map(recipe => {
              console.log(recipe.category);
              if (recipe.category === category.name) {
                return (
                  <RecipeImageCard key={recipe.id} recipe={recipe} />
                )
              }
            })
          }
        </div>
      </div>
    )
  }
  return (
    <div>
      <h4 onClick={expandCategory}>{category.name}</h4>
    </div>
  )
}