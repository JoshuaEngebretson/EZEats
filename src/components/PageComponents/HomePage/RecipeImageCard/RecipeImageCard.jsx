import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function RecipeImageCard({recipe}) {
  const history = useHistory();

  let recipeName = recipe.name.replaceAll(' ', '-')
  console.log(recipeName);

  const viewRecipe = () => {
    console.log(`Clicked on ${recipe.name}`);
    history.push(`/recipe/${recipe.category}/${recipeName}/${recipe.id}`)
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