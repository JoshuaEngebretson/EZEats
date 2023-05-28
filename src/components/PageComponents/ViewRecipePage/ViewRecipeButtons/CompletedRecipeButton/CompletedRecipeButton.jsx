import { useDispatch } from "react-redux";
import './CompletedRecipeButton.css'

export default function CompletedRecipeButton({id}) {
  const dispatch = useDispatch();

  const increaseTimesCooked = () => {
    dispatch({type:'INCREASE_TIMES_COOKED', payload: id})
  }

  return (
    <div className='add completed-btn' onClick={increaseTimesCooked}>
      <p className='center text'>Completed Recipe!</p>
    </div>
  )
}
