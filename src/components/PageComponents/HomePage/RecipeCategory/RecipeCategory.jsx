import AssociatedRecipe from "./AssociatedRecipe/AssociatedRecipe"
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
        {
          recipes.map(recipe => {
            console.log(recipe.category);
            if (recipe.category === category.name) {
              return (
                <AssociatedRecipe key={recipe.id} recipe={recipe} />
              )
            }
          })
        }
      </div>
    )
  }
  return (
    <div>
      <h4 onClick={expandCategory}>{category.name}</h4>
    </div>
  )
}