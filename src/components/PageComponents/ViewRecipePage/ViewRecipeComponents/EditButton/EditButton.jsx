import { useHistory } from "react-router-dom";

export default function EditButton({currentRecipe}) {
  const history = useHistory();

  const editRecipe = () => {
    history.push(`/edit-recipe/${currentRecipe.id}`)
  }

  return (
    <div className='list-btns' onClick={editRecipe}>
      <p className="center text">Edit</p>
    </div>
  )
}