import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CompletedRecipeButton.css'

export default function CompletedRecipeButton() {
  const dispatch = useDispatch();
  const currentRecipe = useSelector(store => store.recipes.currentRecipe[0])
  const [canClick, setCanClick] = useState(true);

  const increaseTimesCooked = () => {
    // Setting a limit on how often the Completed Recipe button can be clicked.
    if (canClick) {
      // If canClick is true, allow the dispatch
      dispatch({type:'INCREASE_TIMES_COOKED', payload: currentRecipe.id})
      // Then set canClick equal to false
      setCanClick(false);
      // Then start a countdown for 10 seconds before canClick is set back to true
      setTimeout(() => {
        setCanClick(true);
      }, 10000) // 10 seconds is equal to 10,000 milliseconds
    } else {
      console.log('Please wait a bit longer before attempting to increase the prepared count');
    }

  }

  return (
    <div className='add completed-btn' onClick={increaseTimesCooked}>
      <p className='center text'>Completed Recipe!</p>
      <p className='center'>Prepared {currentRecipe.times_cooked} times!</p>
    </div>
  )
}
