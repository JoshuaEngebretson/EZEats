import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function NewUserWalkThrough() {
	const dispatch = useDispatch();
	const recipeCount = useSelector(
		(store) => store.recipes.allRecipes.length
	);

	// If the recipeCount is equal to 1, then return message stating "recipe"
	// Otherwise return the plural "recipes"
	const recipeOrRecipes = recipeCount === 1 ? "recipe" : "recipes";

	// Write out a component that will display when a user has less than 6
	// recipes associated with their account
	// This component should:
	//  1. Ask a user if they want some starter recipes
	//  2. Highlight the Add Recipe option with a pop-up suggestion to add more
	//      a. Have a count of recipes
	//          ex. "You've added 6 recipes, let's get that total to 10!"
	//      b. display a progress bar of number of recipes until the pop-up stops appearing
	//  3. Explain what will be showing in each section.
	console.log("hello from NewUserHomePageModal");

	const nextWalkThroughStep = () => {
		dispatch({ type: "NEXT_WALK_THROUGH_STEP" });
	};
	const prevWalkThroughStep = () => {
		dispatch({ type: "PREV_WALK_THROUGH_STEP" });
	};
	const resetNewUserWalkThrough = () => {
		dispatch({ type: "RESET_NEW_USER_WALK_THROUGH" });
	};

	const steps = ["1", "2", "3", "4", "5", "6"];

	const Queue = Swal.mixin({
		progressSteps: steps,
		reverseButtons: true,
		confirmButtonText: "Next >",
		denyButtonText: "< Back",
	});

	const stepOne = async () => {
		await Queue.fire({
			title: "You are currenly on the home page",
			currentProgressStep: 0,
			html: `
                <p>On this page:
                    <ul>
                        <li>You are able to see your top 5 "Most Prepared" meals</li>
                        <li>You are able to navigate to any of your recipes by first category, then clicking on the recipe you want to view</li>
                    </ul>
                </p>
                
                <p>To come back to this page at any time click the
                    <br/>
                    <button class=navLink>Home</button>
                    <br/> 
                    button within the navigation bar</p>
                `,
		}).then(async () => {
			nextWalkThroughStep();
			await stepTwo();
		});
	};

	const stepTwo = () => {
		return Queue.fire({
			title: "Step Two",
			currentProgressStep: 1,
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				nextWalkThroughStep();
				stepThree();
			} else if (result.isDenied) {
				prevWalkThroughStep();
				stepOne();
			}
		});
	};

	const stepThree = () => {
		return Queue.fire({
			title: "Step Three",
			currentProgressStep: 2,
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				nextWalkThroughStep();
				stepFour();
			} else if (result.isDenied) {
				prevWalkThroughStep();
				stepTwo();
			}
		});
	};

	const stepFour = () => {
		return Queue.fire({
			title: "Step Four",
			currentProgressStep: 3,
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				stepFour();
			} else if (result.isDenied) {
				prevWalkThroughStep();
				stepThree();
			}
		});
	};

	const walkthrough = async () => {
		resetNewUserWalkThrough();
		nextWalkThroughStep();
		await stepOne();
	};

	Swal.fire({
		title: "Welome to EZEats",
		html: `<p>You currently have <b>${recipeCount}</b> ${recipeOrRecipes} added to EZEats.</p>
            <p> Would you like a walk through on how to use the application?</p>`,
		footer: `<p>You can always restart this walkthrough from the "User" page.</p>`,
		showDenyButton: true,
		confirmButtonText: "Yes",
		denyButtonText: `No`,
	}).then(async (result) => {
		if (result.isConfirmed) {
			await Swal.fire({
				title: "Great! Let's get started",
				confirmButtonText: "Next >",
			});
			walkthrough();
		} else if (result.isDenied) {
			Swal.fire({
				title: "Would you like to opt out of this walkthrough in the future?",
				showDenyButton: true,
				confirmButtonText: `<p>Yes,</p>
                    <p>I can figure this out on my own</p>`,
				denyButtonText: `No, I would like the walkthrough in the future`,
				footer: `<p>You can always restart this walkthrough from the "User" page.</p>`,
			});
		}
	});
}
