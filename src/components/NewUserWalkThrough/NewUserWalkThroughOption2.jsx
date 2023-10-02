import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Step1WalkThrough from "./WalkThroughSteps/Step1WalkThrough";

export default function NewUserWalkThroughOption2() {
	const dispatch = useDispatch();
	const recipeCount = useSelector(
		(store) => store.recipes.allRecipes.length
	);
	const showModalWalkThrough = useSelector(
		(store) => store.user.show_walk_through
	);

	const [showNewUserWalkThrough, setShowNewUserWalkThrough] =
		useState(showModalWalkThrough);
	const [currentStep, setCurrentStep] = useState(0); // Track the current walkthrough step

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				toggleModal();
			}
		};

		if (showNewUserWalkThrough) {
			document.addEventListener("keydown", handleKeyDown);
		} else {
			document.removeEventListener("keydown", handleKeyDown);
		}
	}, [showNewUserWalkThrough]);

	if (showNewUserWalkThrough) {
		document.body.classList.add("active-modal");
	} else {
		document.body.classList.remove("active-modal");
	}

	const toggleModal = () => {
		setShowNewUserWalkThrough(!showNewUserWalkThrough);
		resetNewUserWalkThrough();
	};

	const resetNewUserWalkThrough = () => {
		dispatch({ type: "RESET_NEW_USER_WALK_THROUGH" });
		setCurrentStep(0); // Reset the current step when resetting the walkthrough
	};

	const nextWalkThroughStep = () => {
		dispatch({ type: "NEXT_WALK_THROUGH_STEP" });
		setCurrentStep(currentStep + 1); // Increment the current step
	};

	const prevWalkThroughStep = () => {
		dispatch({ type: "PREV_WALK_THROUGH_STEP" });
		setCurrentStep(currentStep - 1); // Decrement the current step
	};

	const startWalkthrough = () => {
		nextWalkThroughStep();
		// toggleModal();
		// toggleModal();
	};

	const removeWalkThrough = () => {
		toggleModal();
		dispatch({ type: "REMOVE_NEW_USER_WALK_THROUGH" });
	};

	// Render the appropriate walkthrough step based on the currentStep
	const renderWalkthroughStep = () => {
		switch (currentStep) {
			case 0:
				return (
					<div>
						<h2>Welcome to EZEats</h2>
						<p>
							You currently have <b>{recipeCount}</b>{" "}
							{recipeOrRecipes} added to EZEats.
						</p>
						<p>
							Would you like to have some default
							recipes?
						</p>
						<p>Or a walkthrough on how to use EZEats?</p>
					</div>
				);
			case 1:
				return <Step1WalkThrough />;
			default:
				return null;
		}
	};

	const renderWalkThroughButtons = () => {
		switch (currentStep) {
			case 0:
				return (
					<>
						<button
							className="deny btn-modal-walkthrough"
							onClick={removeWalkThrough}
						>
							No
						</button>
						<button
							className="confirm btn-modal-walkthrough"
							onClick={startWalkthrough}
						>
							Yes
						</button>
					</>
				);
			case 1:
				return (
					<>
						<button
							className="deny btn-modal-walkthrough"
							onClick={toggleModal}
						>
							Cancel
						</button>
						<button
							className="next btn-modal-walkthrough"
							onClick={nextWalkThroughStep}
						>
							Next
						</button>
					</>
				);
			default:
				return (
					<>
						<button
							className="prev btn-modal-walkthrough"
							onClick={prevWalkThroughStep}
						>
							Previous
						</button>
						<button
							className="next btn-modal-walkthrough"
							onClick={nextWalkThroughStep}
						>
							Next
						</button>
					</>
				);
		}
	};

	// If the recipeCount is equal to 1, then return message stating "recipe"
	// Otherwise return the plural "recipes"
	const recipeOrRecipes = recipeCount === 1 ? "recipe" : "recipes";

	return (
		<>
			{showNewUserWalkThrough && (
				<div className="modal">
					<div
						onClick={toggleModal}
						className="walkthrough-overlay"
					></div>
					<div className="modal-walkthrough-content">
						{renderWalkthroughStep()}{" "}
						{/* Render the appropriate step */}
						<div className="walkthrough-btns">
							{renderWalkThroughButtons()}
						</div>
						<button
							className="close-modal"
							onClick={toggleModal}
						>
							❌
						</button>
						<div className="walkthrough-footer">
							<p>
								You can always restart this
								walkthrough from the "User" page.
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
