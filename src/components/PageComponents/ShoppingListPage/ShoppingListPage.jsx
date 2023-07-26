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
						display: "row",
					}}
				>
					<h2 style={{ textAlign: "center", paddingTop: 20 }}>Planned Meals</h2>
					<Swiper
						spaceBetween={10}
						slidesPerView={3}
						centeredSlides={true}
						grabCursor={true}
						loop={true}
						navigation={true}
						pagination={{ clickable: true }}
						modules={[Navigation, Pagination]}
						className="mySwiper"
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
