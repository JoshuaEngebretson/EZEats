import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

export default function CompletedRecipeButton() {
	const dispatch = useDispatch();
	const currentRecipe = useSelector((store) => store.recipes.currentRecipe);
	const [canClick, setCanClick] = useState(true);

	const increaseTimesCooked = () => {
		// Setting a limit on how often the Completed Recipe button can be clicked.
		if (canClick) {
			// If canClick is true, allow the dispatch
			dispatch({ type: "INCREASE_TIMES_COOKED", payload: currentRecipe.id });
			// Then set canClick equal to false
			setCanClick(false);
			// Then start a countdown for 10 seconds before canClick is set back to true
			setTimeout(() => {
				setCanClick(true);
			}, 10000); // 10 seconds is equal to 10,000 milliseconds
		} else {
			// Styling would like the button to shake if cannot update
			console.log(
				"Please wait a bit longer before attempting to increase the prepared count"
			);
		}
	};

	const CompletedButton = styled(Button)(() => ({
		color: "black",
		backgroundColor: "#67CE65",
		fontWeight: "bold",
		"&:hover": {
			backgroundColor: "#57b356",
		},
	}));

	return (
		<CompletedButton
			onClick={increaseTimesCooked}
			variant="contained"
			color="success"
		>
			Completed Recipe,
			<br />
			Prepared {currentRecipe.times_cooked} times!
		</CompletedButton>
	);
}
