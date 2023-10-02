import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import CreateIngredientModal from "./CreateIngredientModal/CreateIngredientModal";

export default function IngredientsInput({
	index,
	recipeIngredient,
	handleIngredientChange,
	handleDeleteLine,
}) {
	const dispatch = useDispatch();
	const unitsOfMeasurement = useSelector(
		(store) => store.recipes.unitsOfMeasurement
	);
	const allIngredients = useSelector(
		(store) => store.recipes.allIngredients
	);
	const { quantity, unit, ingredient, method, forWhichPart } =
		recipeIngredient;
	const [showUnitInput, setShowUnitInput] = useState(
		unit === "other"
	);
	const [showIngredientInput, setShowIngredientInput] = useState(
		ingredient === "other"
	);

	useEffect(() => {
		// dispatch({ type: 'FETCH_UNITS_OF_MEASUREMENT' });
		// dispatch({ type: 'FETCH_ALL_INGREDIENTS' });
	}, []);

	const handleUnitSelectChange = (e) => {
		let selectedId = e.target.value;
		if (selectedId !== "other") {
			selectedId = Number(selectedId);
			let conversion_category, unitName;
			unitsOfMeasurement.map((unit) => {
				if (unit.id === selectedId) {
					console.log(unit.conversion_category);
					conversion_category = unit.conversion_category;
					unitName = unit.unit;
					console.log(
						"conversion_category:",
						conversion_category
					);
				}
			});
			const selectedUnit = {
				id: selectedId,
				name: unitName,
				conversion_category: conversion_category,
			};
			console.log("selectedUnit:", selectedUnit);
			handleIngredientChange(index, "unit", selectedUnit);
			setShowUnitInput(false);
		} else {
			// Every new unit of measurement will be created with a conversion
			// category of 'other' and the id and unit will be the entered value
			const selectedUnit = {
				id: selectedId,
				unit: selectedId,
				conversion_category: "other",
			};
			console.log("selectedUnit:", selectedUnit);
			handleIngredientChange(index, "unit", selectedUnit);
			setShowUnitInput(selectedId === "other");
		}
	};
	const handleOtherUnitInput = (e) => {
		const selectedId = e.target.value;
		if (selectedId !== "other") {
			// Every new unit of measurement will be created with a conversion
			// category of 'other' and the id and unit will be the entered value
			const selectedUnit = {
				id: selectedId,
				unit: selectedId,
				conversion_category: "other",
			};
			console.log("selectedUnit:", selectedUnit);
			handleIngredientChange(index, "unit", selectedUnit);
		}
	};
	const handleIngredientSelectChange = (e) => {
		let selectedId = e.target.value;
		if (selectedId !== "other") {
			selectedId = Number(selectedId);
			let foodCategory;
			let ingredientName;
			let foodCategoryId;
			allIngredients.ingredients.map((i) => {
				if (i.id === Number(selectedId)) {
					console.log("i.foodCategory", i.foodCategory);
					foodCategory = i.foodCategory;
					foodCategoryId = i.foodCategoryId;
					ingredientName = i.name;
				}
			});
			const selectedIngredient = {
				id: selectedId,
				name: ingredientName,
				foodCategory: foodCategory,
				foodCategoryId: foodCategoryId,
			};
			console.log("selectedIngredient:", selectedIngredient);
			handleIngredientChange(
				index,
				"ingredient",
				selectedIngredient
			);
			setShowIngredientInput(false);
		} else {
			// Need to add in selection field for foodCategory and also allow the user to enter in
			//  a new option. (this should be handled in it's own modal of adding an ingredient.)
			//  That would allow for this logic to be easier. Anytime other is chosen it opens the modal
			//  Which would have it's own 'Save Ingredient button'
			const selectedIngredient = {
				id: selectedId,
				name: selectedId,
				foodCategory: "placeholder",
			};
			handleIngredientChange(
				index,
				"ingredient",
				selectedIngredient
			);
			setShowIngredientInput(selectedId === "other");
		}
	};
	const handleOtherIngredientInput = (e) => {
		const selectedId = e.target.value;
		// Need to add in selection field for foodCategory and also allow the user to enter in
		//  a new option. (this should be handled in it's own modal of adding an ingredient.)
		//  That would allow for this logic to be easier. Anytime other is chosen it opens the modal
		//  Which would have it's own 'Save Ingredient button'
		const selectedIngredient = {
			id: selectedId,
			name: selectedId,
			foodCategory: "placeholder",
		};
		console.log("selectedIngredient:", selectedIngredient);
		handleIngredientChange(
			index,
			"ingredient",
			selectedIngredient
		);
	};

	if (
		unitsOfMeasurement.length > 0 &&
		allIngredients &&
		allIngredients.foodCategories &&
		allIngredients.foodCategories.length > 0 &&
		recipeIngredient
	) {
		const unitId = unit && unit.id;
		const uName = unit && unit.name;
		const conversionCategory = unit && unit.conversionCategory;
		const iName = ingredient && ingredient.name;
		const ingredientId = ingredient && ingredient.id;
		const foodCategory = ingredient && ingredient.foodCategory;

		return (
			<tr>
				<td>
					<input
						type="number"
						placeholder="Quantity"
						min="0"
						value={quantity}
						onChange={(e) =>
							handleIngredientChange(
								index,
								"quantity",
								Number(e.target.value)
							)
						}
					/>
				</td>
				<td>
					<select
						name="units-select"
						id="units-select"
						value={unitId}
						onChange={(e) => handleUnitSelectChange(e)}
					>
						<option value="">-- Select Units --</option>
						<option value="" disabled>
							MASS
						</option>
						{unitsOfMeasurement.map((unit) => {
							if (unit.conversion_category === "mass") {
								return (
									<option
										key={unit.id}
										value={unit.id}
									>
										{unit.unit}
									</option>
								);
							}
							return null;
						})}
						<option value="" disabled>
							VOLUME
						</option>
						{unitsOfMeasurement.map((unit) => {
							if (
								unit.conversion_category === "volume"
							) {
								return (
									<option
										key={unit.id}
										value={unit.id}
									>
										{unit.unit}
									</option>
								);
							}
							return null;
						})}
						<option value="" disabled>
							OTHER
						</option>
						{unitsOfMeasurement.map((unit) => {
							if (
								unit.conversion_category === "other"
							) {
								return (
									<option
										key={unit.id}
										value={unit.id}
									>
										{unit.unit}
									</option>
								);
							}
							return null;
						})}
						<option value="" disabled>
							NEW UNIT
						</option>
						<option value="other">
							-- Create New Unit --
						</option>
					</select>
					{showUnitInput && (
						<input
							value={unitId}
							onChange={handleOtherUnitInput}
							placeholder="Enter other unit"
						/>
					)}
				</td>
				<td>
					<select
						value={ingredientId}
						onChange={(e) =>
							handleIngredientSelectChange(e)
						}
					>
						<option value="">
							-- Select Ingredient --
						</option>
						{allIngredients.foodCategories.map(
							(category) => {
								const capitalizedCategory =
									category.name.toUpperCase();
								return (
									<React.Fragment key={category.id}>
										<option
											key={category.id}
											disabled
										>
											{capitalizedCategory}
										</option>
										{allIngredients.ingredients.map(
											(i) => {
												if (
													i.foodCategory ===
													category.name
												) {
													return (
														<option
															key={i.id}
															value={
																i.id
															}
														>
															{i.name}
														</option>
													);
												}
												return null;
											}
										)}
									</React.Fragment>
								);
							}
						)}
					</select>
					<CreateIngredientModal />
					{showIngredientInput && (
						<>
							{/* <input
                value={ingredientId}
                onChange={handleOtherIngredientInput}
                placeholder='Enter new ingredient'
              /> */}
						</>
					)}
				</td>
				<td>
					<input
						type="text"
						placeholder="Prepared method?"
						value={method}
						onChange={(e) =>
							handleIngredientChange(
								index,
								"method",
								e.target.value
							)
						}
					/>
				</td>
				<td>
					<input
						type="text"
						placeholder="Part of meal?"
						value={forWhichPart}
						onChange={(e) =>
							handleIngredientChange(
								index,
								"forWhichPart",
								e.target.value
							)
						}
					/>
				</td>
				<td>
					<button onClick={() => handleDeleteLine(index)}>
						❌
					</button>
				</td>
			</tr>
		);
	}
	return <tr></tr>;
}
