import { useHistory } from "react-router-dom";
import ViewRecipeStyledButton from "../ViewRecipeStyledButton/ViewRecipeStyledButton";

export default function EditButton({ currentRecipe }) {
	const history = useHistory();

	return (
		<ViewRecipeStyledButton
			onClick={() =>
				history.push(`/edit-recipe/${currentRecipe.id}`)
			}
			variant="contained"
		>
			Edit
		</ViewRecipeStyledButton>
	);
}
