import { useHistory } from "react-router-dom";

export default function EditButton({currentRecipe}) {
  const history = useHistory();

  const editRecipe = () => {
    history.push(`/add-or-edit-recipe/${currentRecipe.id}`)
  }

  return (
    <div class='list-btns' onClick={editRecipe}>
      <p className="center text">Edit</p>
    </div>
  )
}