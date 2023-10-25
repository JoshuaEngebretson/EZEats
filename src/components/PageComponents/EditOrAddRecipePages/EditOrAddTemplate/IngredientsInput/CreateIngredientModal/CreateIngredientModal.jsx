import "./CreateIngredientModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function CreateIngredientModal() {
	const dispatch = useDispatch();
	const foodCategories = useSelector(
		(store) => store.recipes.allIngredients.foodCategories
	);
	const [showCreateIngredient, setShowCreateIngredient] =
		useState(false);
	const [ingredientInput, setIngredientInput] = useState("");
	const [showFoodCategoryInput, setShowFoodCategoryInput] =
		useState(false);
	const [foodCategoryInput, setFoodCategoryInput] = useState("");

	useEffect(() => {
		// Set up ability to click escape key to close out of the modal
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				toggleModal();
			}
		};
		if (showCreateIngredient) {
			document.addEventListener("keydown", handleKeyDown);
		} else {
			document.removeEventListener("keydown", handleKeyDown);
		}
	}, [showCreateIngredient]);

	// If the modal is open, don't allow the user to scroll within the page behind
	if (showCreateIngredient) {
		document.body.classList.add("active-modal");
	} else {
		document.body.classList.remove("active-modal");
	}

	const toggleModal = () => {
		// Flip to true if currently false
		// OR
		// Flip to false if currently true
		setShowCreateIngredient(!showCreateIngredient);
		setIngredientInput("");
		setFoodCategoryInput("");
		setShowFoodCategoryInput(false);
	};
	const saveNewIngredient = () => {
		// console.log('clicked save Ingredient');
		if (ingredientInput !== "" && foodCategoryInput !== "") {
			const newIngredient = {
				ingredientName: ingredientInput,
				foodCategory: foodCategoryInput,
			};
			dispatch({
				type: "CREATE_NEW_INGREDIENT",
				payload: newIngredient,
			});
			toggleModal();
			setShowFoodCategoryInput(false);
		} else {
			alert("Please ensure both fields are filled in");
		}
	};

	const handleFoodCategorySelectChange = (e) => {
		let value = e.target.value;
		if (value === "other") {
			setShowFoodCategoryInput(true);
		} else {
			setShowFoodCategoryInput(false);
		}
		setFoodCategoryInput(value);
	};
	const handleOtherFoodCategoryInput = (e) => {
		let value = e.target.value;
		setFoodCategoryInput(value);
	};

	return (
		<>
			<button className="add" onClick={toggleModal}>
				New Ingredient
			</button>

			{showCreateIngredient && (
				<div className="modal">
					<div
						onClick={toggleModal}
						className="overlay"
					></div>
					<div className="modal-content">
						<h2>Create A New Ingredient</h2>
						<label htmlFor="new-ingredient-input">
							{" "}
							New Ingredient:
							<input
								placeholder="Enter New Ingredient"
								type="text"
								value={ingredientInput}
								onChange={(e) =>
									setIngredientInput(e.target.value)
								}
							/>
						</label>
						<div>
							<label>
								{" "}
								Select Food Category:
								<select
									name="food-category-select"
									id="food-category-select"
									value={foodCategoryInput}
									onChange={(e) =>
										handleFoodCategorySelectChange(
											e
										)
									}
								>
									<option value="">
										-- Select the category --
									</option>
									{foodCategories.map(
										(category) => {
											return (
												<option
													key={category.id}
													value={
														category.id
													}
												>
													{category.name}
												</option>
											);
										}
									)}
									<option disabled value="">
										Other
									</option>
									<option value="other">
										-- Create New Food Category --
									</option>
								</select>
							</label>
							{showFoodCategoryInput && (
								<>
									<br />
									<label htmlFor="food-category-input">
										<input
											id="food-category-input"
											placeholder="Enter New Food Category"
											value={foodCategoryInput}
											onChange={(e) =>
												handleOtherFoodCategoryInput(
													e
												)
											}
										/>
									</label>
								</>
							)}
						</div>
						<br />
						<button
							className="add"
							onClick={saveNewIngredient}
						>
							Save Ingredient
						</button>
						<button
							className="close-modal"
							onClick={toggleModal}
						>
							❌
						</button>
					</div>
				</div>
			)}
		</>
	);
}
