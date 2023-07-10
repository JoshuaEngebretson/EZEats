import "./ViewRecipePage.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AddToCartButtons from "../../ReusableComponents/AddToCartButtons/AddToCartButtons";
import EditButton from "./ViewRecipeComponents/EditButton/EditButton";
import GoToShoppingListButton from "./ViewRecipeComponents/GoToShoppingListButton/GoToShoppingListButton";
import CompletedRecipeButton from "./ViewRecipeComponents/CompletedRecipeButton/CompletedRecipeButton";
import ListIngredient from "./ViewRecipeComponents/ListIngredient/ListIngredient";

export default function ViewRecipePage() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const currentRecipe = useSelector((store) => store.recipes.currentRecipe);

	useEffect(() => {
		dispatch({
			type: "FETCH_CURRENT_RECIPE",
			payload: id,
		});
	}, []);

	// confirm currentRecipe is defined, then render information
	//  This ensures that the page will load
	if (currentRecipe != undefined && currentRecipe.recipe_text) {
		// This separates out the recipe into an array an allows for
		// the recipe to be viewed on multipe lines
		let recipeAsParagraph = currentRecipe.recipe_text.split("\n");

		// This creates an array of different parts within the recipe
		// such as a sauce that is paired with a main part
		let recipeParts = [];
		for (let part of currentRecipe.forWhichPart) {
			if (part !== null) {
				if (!recipeParts.includes(part)) {
					recipeParts.push(part);
				}
			}
		}

		return (
			<div className="page-margin">
				<img
					className="square-image-medium"
					src={currentRecipe.image}
					alt={`An image of ${currentRecipe.name}`}
				/>
				<div className="">
					<h1>{currentRecipe.name}</h1>
					<h2>{currentRecipe.category}</h2>
					<h3>Ingredients</h3>
					<div>
						<ul>
							{currentRecipe.ingredients.map((i) => {
								if (!i.forWhichPart) {
									return <ListIngredient key={i.ingredient.id} i={i} />;
								}
							})}
						</ul>
						{
							/*
              This portion specifically will only be rendered if there are
              different parts within the ingredients
              Example: a recipe with a main part and a separate sauce.
              */
							recipeParts.map((part) => {
								return (
									<div key={part}>
										<h4>{part}</h4>
										<ul>
											{
												// Only show the ingredients that match with the current part
												// that has been mapped
												currentRecipe.ingredients.map((i) => {
													if (i.forWhichPart === part) {
														return (
															<ListIngredient key={i.ingredient.id} i={i} />
														);
													}
												})
											}
										</ul>
									</div>
								);
							})
						}
					</div>
					<EditButton currentRecipe={currentRecipe} />
					<AddToCartButtons currentRecipe={currentRecipe} />
					<GoToShoppingListButton />
				</div>
				<div className="">
					<h3>Preparation</h3>
					<ol>
						{recipeAsParagraph.map((paragraph) => {
							return <li key={paragraph}>{paragraph}</li>;
						})}
					</ol>
					<CompletedRecipeButton currentRecipe={currentRecipe} />
				</div>
			</div>
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
