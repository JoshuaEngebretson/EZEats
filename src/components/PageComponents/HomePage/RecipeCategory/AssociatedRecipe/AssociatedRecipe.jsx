import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function AssociatedRecipe({recipe}) {
  const history = useHistory();

  let recipeName = recipe.name.replaceAll(' ', '-')
  console.log(recipeName);

  const viewRecipe = () => {
    console.log(`Clicked on ${recipe.name}`);
    history.push(`/recipe/${recipe.category}/${recipeName}/${recipe.id}`)
  }

  return (
    <div 
      key={recipe.id}
      onClick={viewRecipe}
    >
      <h1>{recipe.name}</h1>
      <img 
        src={recipe.image}
        alt ={`An image of ${recipe.name}`}
      /> 
    </div>
  )
}