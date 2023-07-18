import "./ShoppingListPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlannedMealCard from "./PlannedMealCard/PlannedMealCard";
import DisplayShoppingListIngredients from "./DisplayShoppingListIngredients/DisplayShoppingListIngredients";
import { Container, Grid, Paper } from "@mui/material";
import RecipeCardCarousel from "./RecipeCardCarousel/RecipeCardCarousel";

export default function ShoppingListPage() {
	const dispatch = useDispatch();
	const shoppingList = useSelector((store) => store.recipes.shoppingList);

	useEffect(() => {
		dispatch({ type: "FETCH_SHOPPING_LIST" });
	}, []);

	if (shoppingList.recipeCards != undefined) {
		const recipeCards = shoppingList.recipeCards;

		const combinedIngredients = shoppingList.combinedIngredients;

		const foodCategories = shoppingList.foodCategories;
		return (
			<div className="page-margin">
				<h2>Planned Meals</h2>
				{/* <Grid container>
					{recipeCards.map((recipe) => {
						return <PlannedMealCard key={recipe.id} recipe={recipe} />;
					})}
				</Grid> */}
				<RecipeCardCarousel recipeCards={recipeCards} />
				<Paper elevation={3}>
					<div className="shopping-list-container">
						<h2 className="center">Shopping List</h2>
						<div className="shopping-list">
							<DisplayShoppingListIngredients
								foodCategories={foodCategories}
								combinedIngredients={combinedIngredients}
							/>
						</div>
					</div>
				</Paper>
			</div>
		);
	}
}
