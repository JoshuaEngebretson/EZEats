import ListIngredient from "./ListIngredient/ListIngredient";
import { Grid } from "@mui/material";

export default function RenderIngredients({
	currentRecipe,
	recipeParts,
}) {
	const mainIngredientList = currentRecipe.ingredients.filter(
		(i) => !i.forWhichPart
	);

	const shouldDisplayColumns =
		mainIngredientList.length > 0 && recipeParts.length > 0;

	return (
		<Grid container spacing={2}>
			{/* If there are ingredients for the main part of the recipe, render them here */}
			{mainIngredientList.length > 0 && (
				<Grid item xs={12} sm={shouldDisplayColumns ? 6 : 12}>
					<ul>
						{mainIngredientList.map((i) => (
							<ListIngredient
								key={i.ingredient.id}
								i={i}
							/>
						))}
					</ul>
				</Grid>
			)}

			{/* If there are recipeParts, render the associated ingredients */}
			{recipeParts.length > 0 && (
				<Grid item xs={12} sm={shouldDisplayColumns ? 6 : 12}>
					{recipeParts.map((part) => (
						<Grid item xs={12} key={part}>
							<h4>{part}</h4>
							<ul>
								{/* List out the ingredients that match the current part */}
								{currentRecipe.ingredients
									.filter(
										(i) => i.forWhichPart === part
									)
									.map((i) => (
										<ListIngredient
											key={i.ingredient.id}
											i={i}
										/>
									))}
							</ul>
						</Grid>
					))}
				</Grid>
			)}
		</Grid>
	);
}
