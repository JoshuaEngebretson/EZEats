import { useParams } from "react-router-dom"

export default function EditOrAddRecipePage() {

  let {id} = useParams();

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