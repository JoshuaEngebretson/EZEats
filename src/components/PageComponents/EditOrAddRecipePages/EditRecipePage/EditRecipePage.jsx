import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditOrAddRecipePageTemplate from "../EditOrAddTemplate/EditOrAddTemplate";

export default function AddRecipePage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const currentRecipe = useSelector(
		(store) => store.recipes.currentRecipe
	);

	useEffect(() => {
		if (Number(id)) {
			dispatch({
				type: "FETCH_CURRENT_RECIPE",
				payload: id,
			});
		}
	}, []);

	if (currentRecipe != undefined) {
		// console.log('currentRecipe inside EditRecipePage', currentRecipe);
		const inputs = {
			image: currentRecipe.image,
			recipeName: currentRecipe.name,
			timesCooked: currentRecipe.times_cooked,
			recipeText: currentRecipe.recipe_text,
			recipeIngredients: currentRecipe.ingredients,
			categoryId: currentRecipe.categoryId,
		};
		console.log("inputs within EditRecipePage:", inputs);
		const handleImageChange = (value) => {
			dispatch({
				type: "MODIFY_CURRENT_RECIPE_IMAGE",
				payload: value,
			});
		};
		const handleRecipeNameChange = (value) => {
			dispatch({
				type: "MODIFY_CURRENT_RECIPE_NAME",
				payload: value,
			});
		};
		const handleRecipeTextChange = (value) => {
			dispatch({
				type: "MODIFY_CURRENT_RECIPE_TEXT",
				payload: value,
			});
		};
		const handleRecipeIngredientsChange = (array) => {
			dispatch({
				type: "MODIFY_CURRENT_RECIPE_INGREDIENTS",
				payload: array,
			});
		};
		const handleCategoryIdChange = (value) => {
			dispatch({
				type: "MODIFY_CURRENT_RECIPE_CATEGORY",
				payload: value,
			});
		};
		const handleSaveRecipe = () => {
			// Look into confirming where the user wants to go after they save their recipe.
			//  User should have choice between ViewRecipePage and HomePage
			// Also provide user with confirmation that the recipe has been saved / updated
			history.push(`/view-recipe/${id}`);
		};

		return (
			<>
				<EditOrAddRecipePageTemplate
					inputs={inputs}
					id={id}
					handleImageChange={handleImageChange}
					handleRecipeNameChange={handleRecipeNameChange}
					handleRecipeTextChange={handleRecipeTextChange}
					handleRecipeIngredientsChange={
						handleRecipeIngredientsChange
					}
					handleCategoryIdChange={handleCategoryIdChange}
					handleSaveRecipe={handleSaveRecipe}
				/>
			</>
		);
	}
}
