import React, { useState } from "react";
import LogOutButton from "../../ReusableComponents/LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { Button, Paper } from "@mui/material";

function UserPage() {
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
	};

	return (
		<div className="container">
			<h2>Welcome, {user.username}!</h2>
			<p>Looking for some initial recipes?</p>
			<br />

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
				<br />
				<form onSubmit={handleSubmitDefaultRecipes}>
					{/* Default Entree checkbox */}
					<label htmlFor="Pasta-Bake">
						Entree - Pasta Bake
					</label>
					<input
						type="checkbox"
						id="Pasta-Bake"
						value="1"
						onChange={handleRecipeCheckboxChange}
					/>
					<br />

					{/* Default Side checkbox */}
					<label htmlFor="German-Potato-Salad">
						Side - German Potato Salad
					</label>
					<input
						type="checkbox"
						id="German-Potato-Salad"
						value="2"
						onChange={handleRecipeCheckboxChange}
					/>
					<br />

					{/* Default Appetizer checkbox */}
					<label htmlFor="Bruschetta">
						Appetizer - Bruschetta
					</label>
					<input
						type="checkbox"
						id="Bruschetta"
						value="3"
						onChange={handleRecipeCheckboxChange}
					/>
					<br />

					{/* Default Drink checkbox */}
					<label htmlFor="Maple-Chai-Old-Fashioned">
						Drink - Maple Chai Old Fashioned
					</label>
					<input
						type="checkbox"
						id="Maple-Chai-Old-Fashioned"
						value="4"
						onChange={handleRecipeCheckboxChange}
					/>
					<br />

					{/* Default Dessert checkbox */}
					<label htmlFor="Brownies">Brownies</label>
					<input
						type="checkbox"
						id="Brownies"
						value="5"
						onChange={handleRecipeCheckboxChange}
					/>
					<br />

					<Button
						variant="contained"
						onClick={handleSubmitDefaultRecipes}
					>
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
