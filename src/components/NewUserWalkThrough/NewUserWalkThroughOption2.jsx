import "./NewUserWalkThrough.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function NewUserWalkThroughOption2() {
	const dispatch = useDispatch();
	const recipeCount = useSelector(
		(store) => store.recipes.allRecipes.length
	);
	const show = useSelector((store) => store.user.show_walk_through);

	const [showNewUserWalkThrough, setShowNewUserWalkThrough] =
		useState(show);

	useEffect(() => {
		// Set up ability to click escape key to close out of the modal
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

	// If the modal is open, don't allow the user to scroll within the page behind
	if (showNewUserWalkThrough) {
		document.body.classList.add("active-modal");
	} else {
		document.body.classList.remove("active-modal");
	}

	const toggleModal = () => {
		// Flip to true if currently false
		// OR
		// Flip to false if currently true
		setShowNewUserWalkThrough(!showNewUserWalkThrough);
		resetNewUserWalkThrough();
	};

	// If the recipeCount is equal to 1, then return message stating "recipe"
	// Otherwise return the plural "recipes"
	const recipeOrRecipes = recipeCount === 1 ? "recipe" : "recipes";

	const nextWalkThroughStep = () => {
		dispatch({ type: "NEXT_WALK_THROUGH_STEP" });
	};
	const prevWalkThroughStep = () => {
		dispatch({ type: "PREV_WALK_THROUGH_STEP" });
	};
	const resetNewUserWalkThrough = () => {
		dispatch({ type: "RESET_NEW_USER_WALK_THROUGH" });
	};

	const startWalkthrough = () => {
		nextWalkThroughStep();
		// return <Step1WalkThrough />;
	};

	return (
		<>
			{showNewUserWalkThrough && (
				<div className="modal">
					<div
						onClick={toggleModal}
						className="walkthrough-overlay"
					></div>
					<div className="modal-walkthrough-content">
						<div>
							<h2>Welcome to EZEats</h2>
							<p>
								You currently have{" "}
								<b>{recipeCount}</b> {recipeOrRecipes}{" "}
								added to EZEats.
							</p>
							<p>
								{" "}
								Would you like to have some default
								recipes and a walk through on how to
								use EZEats?
							</p>
						</div>
						<div className="walkthrough-btns">
							<button
								className="deny btn-modal-walkthrough"
								onClick={prevWalkThroughStep}
							>
								No
							</button>

							<button
								className="next btn-modal-walkthrough"
								onClick={startWalkthrough}
							>
								Yes
							</button>
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
