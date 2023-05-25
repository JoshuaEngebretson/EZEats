import './AddToCartButtons.css'
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
    dispatch({type:'INCREASE_ON_MENU', payload: currentRecipe.id})
  }

  return (
    <div className='list-btns'>
      <h4 className='center'>Add to Shopping List</h4>
      <div className='center'>
      <button onClick={decreaseOnMenu} className='subtract cart-btn inline'>-</button>
      <p className='inline'>{currentRecipe.on_menu}</p>
      <button onClick={increaseOnMenu} className='add cart-btn inline'>+</button>
      </div>
    </div>
  )
}