import { useDispatch } from "react-redux"

export default function AddToCartButtons({currentRecipe}) {
  const dispatch = useDispatch();

  const decreaseOnMenu = () => {
    if (currentRecipe.on_menu > 0){
      dispatch({type:'DECREASE_ON_MENU', payload: currentRecipe.id})
    }
    else {
      console.log('clicked decrease but unable to go below 0');
    }
  }

  const increaseOnMenu = () => {
    console.log('clicked increaseOnMenu');
    dispatch({type:'INCREASE_ON_MENU', payload: currentRecipe.id})
  }

  return (
    <div>
      <button onClick={decreaseOnMenu}>-</button>
      <p>{currentRecipe.on_menu}</p>
      <button onClick={increaseOnMenu}>+</button>
    </div>
  )
}