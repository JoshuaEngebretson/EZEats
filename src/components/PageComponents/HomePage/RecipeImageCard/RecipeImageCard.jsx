import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function RecipeImageCard({recipe}) {
  const history = useHistory();
  const recipeName = recipe.name.replaceAll(' ', '-')

  const viewRecipe = () => {
    console.log(`Clicked on ${recipe.name}`);
    history.push(`/view-recipe/${recipe.category}/${recipeName}/${recipe.id}`)
  }

  return (
    <div 
      onClick={viewRecipe}
      className='recipe-card'
    >
      <h5>{recipe.name}</h5>
      <img 
        src={recipe.image}
        alt ={`An image of ${recipe.name}`}
        className='square-image-small'
      /> 
    </div>
  )
}