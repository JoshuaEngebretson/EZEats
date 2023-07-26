import "./ViewRecipePage.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AddToCartButtons from "../../ReusableComponents/AddToCartButtons/AddToCartButtons";
import EditButton from "./ViewRecipeComponents/EditButton/EditButton";
import GoToShoppingListButton from "./ViewRecipeComponents/GoToShoppingListButton/GoToShoppingListButton";
import CompletedRecipeButton from "./ViewRecipeComponents/CompletedRecipeButton/CompletedRecipeButton";
import { Box, Grid, Paper } from "@mui/material";
import RenderIngredients from "./ViewRecipeComponents/RenderIngredients/RenderIngredients";

export default function ViewRecipePage() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const currentRecipe = useSelector((store) => store.recipes.currentRecipe);

	useEffect(() => {
		// Fetch current recipe on component mount
		dispatch({
			type: "FETCH_CURRENT_RECIPE",
			payload: id,
		});
	}, []);

	// Render recipe information IF currentRecipe is defined and has recipe text
	if (currentRecipe != undefined && currentRecipe.recipe_text) {
		// Split recipe text into an array to be viewed on multiple lines
		let recipeAsParagraph = currentRecipe.recipe_text.split("\n");

		// Create an array of different recipe parts
		let recipeParts = [];
		for (let part of currentRecipe.forWhichPart) {
			if (part !== null) {
				// If the recipe part is not already in recipeParts, add it to the array
				if (!recipeParts.includes(part)) {
					recipeParts.push(part);
				}
			}
		}

		return (
			<Box sx={{ flexGrow: 1 }}>
				<Grid container className="page-margin" columnGap={2}>
					{/* Image square */}
					<Grid item xs={4.5} align="center">
						<br />
						<img
							className="square-image-medium"
							src={currentRecipe.image}
							alt={`An image of ${currentRecipe.name}`}
						/>
					</Grid>

					{/* Name and Ingredients area */}
					<Grid item xs={5.5}>
						<Grid container center>
							<Grid item xs={12} align="center">
								<h1>{currentRecipe.name}</h1>
								<h2>{currentRecipe.category}</h2>
							</Grid>
							<Paper
								elevation={5}
								sx={{
									margin: "auto",
									marginBottom: 2,
									paddingLeft: 2,
									paddingRight: 2,
									width: "100%",
								}}
							>
								<h3>Ingredients</h3>
								<RenderIngredients
									currentRecipe={currentRecipe}
									recipeParts={recipeParts}
								/>
							</Paper>
							<Grid
								container
								sx={{ justifyContent: "center", marginBottom: 2 }}
							>
								{/* Commenting out the Edit Button within the main branch until edit feature works */}
								{/* <EditButton currentRecipe={currentRecipe} /> */}
								<AddToCartButtons currentRecipe={currentRecipe} />
								<GoToShoppingListButton />
							</Grid>
						</Grid>
					</Grid>

					{/* Preparation area */}
					<Box>
						<Grid
							container
							// sx={{ justifyContent: "center", alignItems: "center" }}
						>
							<Grid item xs={8}>
								<h3>Preparation</h3>
								<ol>
									{recipeAsParagraph.map((paragraph) => {
										return <li key={paragraph}>{paragraph}</li>;
									})}
								</ol>
							</Grid>
							<Grid item xs={8} align="center">
								<div className="centered-div">
									<CompletedRecipeButton currentRecipe={currentRecipe} />
								</div>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Box>
		);
	} else {
		return (
			<div className="page-margin">
				<h1>404</h1>
				<h2>you do not have a recipe at this address</h2>
			</div>
		);
	}
}
