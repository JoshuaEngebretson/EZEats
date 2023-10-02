import "../NewUserWalkThrough.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Paper } from "@mui/material";

export default function Step1WalkThrough() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const showModalWalkThrough = useSelector(
		(store) => store.user.show_walk_through
	);
	const userRecipes = useSelector(
		(store) => store.recipes.allRecipes
	);

	const [showNewUserWalkThrough, setShowNewUserWalkThrough] =
		useState(showModalWalkThrough);
	const [selectedDefaultRecipes, setSelectedDefaultRecipes] =
		useState([]);

	const handleRecipeCheckboxChange = (e) => {
		const value = e.target.value;
		if (selectedDefaultRecipes.includes(value)) {
			setSelectedDefaultRecipes((prevSelectedRecipes) =>
				prevSelectedRecipes.filter(
					(recipe) => recipe !== value
				)
			);
		} else {
			setSelectedDefaultRecipes((prevSelectedRecipes) => [
				...prevSelectedRecipes,
				value,
			]);
		}
	};

	const handleSubmitDefaultRecipes = (e) => {
		e.preventDefault();
		console.log("selected Recipes:", selectedDefaultRecipes);
		dispatch({
			type: "SET_DEFAULT_RECIPES",
			payload: selectedDefaultRecipes,
		});
	};

	return (
		<>
			<Paper
				elevation={5}
				sx={{
					padding: 2,
					width: "50%",
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<h4>Select all the recipes, you would like added.</h4>
				<form onSubmit={handleSubmitDefaultRecipes}>
					{/* Default Appetizer checkbox */}
					<input
						type="checkbox"
						id="Classic-Italian-Bruschetta"
						value="1"
						onChange={handleRecipeCheckboxChange}
					/>
					<label htmlFor="Classic-Italian-Bruschetta">
						Appetizer - Classic Italian Bruschetta
					</label>
					<br />

					{/* Default Entree checkbox */}
					<input
						type="checkbox"
						id="Sun-Dried-Tomato-Pasta-Bake"
						value="2"
						onChange={handleRecipeCheckboxChange}
					/>
					<label htmlFor="Sun-Dried-Tomato-Pasta-Bake">
						Entree - Sun-Dried Tomato Pasta Bake
					</label>
					<br />

					{/* Default Side checkbox */}
					<input
						type="checkbox"
						id="German-Potato-Salad"
						value="3"
						onChange={handleRecipeCheckboxChange}
					/>
					<label htmlFor="German-Potato-Salad">
						Side - German Potato Salad
					</label>
					<br />

					{/* Default Drink checkbox */}
					<input
						type="checkbox"
						id="Vanilla-Chai-Old-Fashioned"
						value="4"
						onChange={handleRecipeCheckboxChange}
					/>
					<label htmlFor="Vanilla-Chai-Old-Fashioned">
						Drink - Vanilla Chai Old Fashioned
					</label>
					<br />

					{/* Default Dessert checkbox */}
					<input
						type="checkbox"
						id="Allergy-Friendly-Brownies"
						value="5"
						onChange={handleRecipeCheckboxChange}
					/>
					<label htmlFor="Allergy-Friendly-Brownies">
						Dessert - Allergy Friendly Brownies
					</label>
					<br />

					<button
						type="submit"
						className="confirm btn-modal-walkthrough-small"
					>
						Add default recipes
					</button>
				</form>
			</Paper>
		</>
	);
}
