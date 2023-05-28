import { useState } from "react";
import EditOrAddRecipePageTemplate from "./EditOrAddTemplate/EditOrAddTemplate";

export default function AddRecipePage() {
  const [imageInput, setImageInput] = useState('')

  let inputs = {
    image: {
      imageInput,
      setImageInput
    },

  }

  return (
    <>
      <h1>Inside Add Recipe Page view</h1>
      <EditOrAddRecipePageTemplate
        inputs={inputs}
      />
    </>
  )
}