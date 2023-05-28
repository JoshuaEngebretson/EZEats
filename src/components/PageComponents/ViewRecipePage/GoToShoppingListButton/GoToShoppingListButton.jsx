import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function GoToShoppingListButton() {
  const history = useHistory();

  const goToShoppingList = () => {
    history.push(`/shopping-list`)
  }

  return (
    <div className='list-btns' onClick={goToShoppingList}>
      <p className='center text'>Go To Shopping List</p>
    </div>
  )
}