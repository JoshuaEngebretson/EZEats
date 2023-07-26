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
		const RenderPlannedMeals = () => {
			recipeCards.map((recipe) => {
				return <PlannedMealCard key={recipe.id} recipe={recipe} />;
			});
		};

		const combinedIngredients = shoppingList.combinedIngredients;

		const foodCategories = shoppingList.foodCategories;
		return (
			<div className="page-margin">
				<Paper
					elevation={2}
					sx={{
						paddingBottom: 1,
						backgroundColor: "gray",
						justifyContent: "center",
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<h2 style={{ marginLeft: 5, paddingTop: 5, marginBottom: 2 }}>
						Planned Meals
					</h2>
					{recipeCards.length > 5 ? (
						<RecipeCardCarousel
							recipeCards={recipeCards}
							show={5}
							infiniteLoop={true}
						>
							<RenderPlannedMeals />
						</RecipeCardCarousel>
					) : (
						<RenderPlannedMeals />
					)}
				</Paper>
				<br />
				<Paper elevation={2}>
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
