import RecipeImageCard from "../../../ReusableComponents/RecipeImageCard/RecipeImageCard";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddToCartButtons from "../../../ReusableComponents/AddToCartButtons/AddToCartButtons";

export default function PlannedMealCard({recipe}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const decreaseOnMenu = () => {
    console.log('clicked decreaseOnMenu');
    if (recipe.on_menu > 1){
      dispatch({type:'DECREASE_ON_MENU', payload: recipe.id})
    }
    else {
      console.log('clicked decrease but unable to go below 0');
    }
  }

  const increaseOnMenu = () => {
    console.log('clicked increaseOnMenu');
    dispatch({type:'INCREASE_ON_MENU', payload: recipe.id})
  }

  const viewRecipe = () => {
    console.log(`Clicked on ${recipe.name}`);
    history.push(`/view-recipe/${recipe.id}`)
  }

  return (
    <div className='planned-meal-card'>
      <div onClick={viewRecipe}>
        <h5>{recipe.name}</h5>
        <img 
          src={recipe.image}
          alt ={`An image of ${recipe.name}`}
          className='square-image-small'
        /> 
      </div>
      <div>
        <AddToCartButtons currentRecipe={recipe}/>
        <button onClick={decreaseOnMenu} className='subtract inline'>-</button>
        <p className='inline'>{recipe.on_menu}</p>
        <button onClick={increaseOnMenu} className='add inline'>+</button>
      </div>
    </div>
  )
}