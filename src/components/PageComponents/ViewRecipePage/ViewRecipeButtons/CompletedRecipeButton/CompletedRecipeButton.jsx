import { useDispatch, useSelector } from "react-redux";
import './CompletedRecipeButton.css'

export default function CompletedRecipeButton() {
  const dispatch = useDispatch();
  const currentRecipe = useSelector(store => store.recipes.currentRecipe[0])

  const increaseTimesCooked = () => {
    dispatch({type:'INCREASE_TIMES_COOKED', payload: currentRecipe.id})
  }

  return (
    <div className='add completed-btn' onClick={increaseTimesCooked}>
      <p className='center text'>Completed Recipe!</p>
      <p className='center'>Prepared {currentRecipe.times_cooked} times!</p>
    </div>
  )
}
