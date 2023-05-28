import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

export default function EditOrAddRecipePage() {
  const dispatch = useDispatch();
  const {id} = useParams();

  if (id) {
    useEffect(() => {
      dispatch({
        type: 'FETCH_CURRENT_RECIPE',
        payload: id
      })
    }, [])
  }

  return (
    <>
      <h1>Inside Edit or Add Recipe Page view</h1>
      {Number(id) ?
        <h2>We would be editing the recipe with id = {id}</h2>
        :
        ''
      }
      
    </>
  )
}