import "./ShoppingListPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlannedMealCard from "./PlannedMealCard/PlannedMealCard";
import DisplayShoppingListIngredients from "./DisplayShoppingListIngredients/DisplayShoppingListIngredients";
import { Paper } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
		const slidesCount = 5;

		/**
		 * - If there are more cards than slidesPerView
		 * - - return true
		 * - If there are less cards than slidesPerView
		 * - - return false */
		const cardNavigationToggle = () => {
			return recipeCards.length > slidesCount ? true : false;
		};

		return (
			<div className="page-margin">
				<Paper
					elevation={2}
					sx={{
						paddingBottom: 1,
						backgroundColor: "lightgray",
						display: "row",
					}}
				>
					<h2 style={{ textAlign: "center", paddingTop: 20 }}>Planned Meals</h2>
					<Swiper
						slidesPerView={slidesCount}
						grabCursor={cardNavigationToggle()}
						navigation={true}
						pagination={{ clickable: true }}
						modules={[Navigation, Pagination]}
						// Enable loop if there are twice as many cards as slidesPerView
						loop={recipeCards.length >= slidesCount * 2}
						// Only center slides if there are less cards than slidesCount
						centeredSlides={recipeCards.length < slidesCount}
					>
						{recipeCards.map((recipe) => {
							return (
								<SwiperSlide>
									<PlannedMealCard key={recipe.id} recipe={recipe} />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</Paper>
				<br />
				<Paper elevation={2}>
					<div className="shopping-list-container">
						<h2 style={{ textAlign: "center", paddingTop: 20 }}>
							Shopping List
						</h2>
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
