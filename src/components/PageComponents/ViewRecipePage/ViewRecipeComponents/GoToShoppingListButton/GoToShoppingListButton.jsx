import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ViewRecipeStyledButton from "../ViewRecipeStyledButton/ViewRecipeStyledButton";

export default function GoToShoppingListButton() {
	const history = useHistory();

	return (
		<ViewRecipeStyledButton
			onClick={() => history.push(`/shopping-list`)}
			variant="contained"
		>
			Go To <br /> Shopping List
		</ViewRecipeStyledButton>
	);
}
