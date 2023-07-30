import React, { useState } from "react";
import LogOutButton from "../../ReusableComponents/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { Button, Paper } from "@mui/material";

function UserPage() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
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
		<div className="container">
			<h2>Welcome, {user.username}!</h2>
			<p>Looking for some initial recipes?</p>

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
						id="Bruschetta"
						value="1"
						onChange={handleRecipeCheckboxChange}
					/>
					<label htmlFor="Bruschetta">
						Appetizer - Bruschetta
					</label>
					<br />

					{/* Default Entree checkbox */}
					<input
						type="checkbox"
						id="Pasta-Bake"
						value="2"
						onChange={handleRecipeCheckboxChange}
					/>
					<label htmlFor="Pasta-Bake">
						Entree - Pasta Bake
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
						id="Maple-Chai-Old-Fashioned"
						value="4"
						onChange={handleRecipeCheckboxChange}
					/>
					<label htmlFor="Maple-Chai-Old-Fashioned">
						Drink - Maple Chai Old Fashioned
					</label>
					<br />

					{/* Default Dessert checkbox */}
					<input
						type="checkbox"
						id="Brownies"
						value="5"
						onChange={handleRecipeCheckboxChange}
					/>
					<label htmlFor="Brownies">
						Dessert - Brownies
					</label>
					<br />

					<Button variant="contained" type="submit">
						Add default recipes
					</Button>
				</form>
			</Paper>

			<br />
			<br />

			<LogOutButton className="btn" />
		</div>
	);
}

export default UserPage;
