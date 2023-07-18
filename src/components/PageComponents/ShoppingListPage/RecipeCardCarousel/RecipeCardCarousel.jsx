import { useState } from "react";
import PlannedMealCard from "../PlannedMealCard/PlannedMealCard";
import "./RecipeCardCarousel.css";

export default function RecipeCardCarousel({ recipeCards }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [length, setLength] = useState(recipeCards.length);

	const next = () => {
		if (currentIndex < length - 1) {
			setCurrentIndex((prevState) => prevState + 1);
		}
	};

	const prev = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prevState) => prevState - 1);
		}
	};

	return (
		<div className="carousel-container">
			{currentIndex > 0 && (
				<button className="left-arrow" onClick={prev}>
					&lt;
				</button>
			)}
			<div className="carousel-wrapper">
				<div className="carousel-content-wrapper">
					<div
						className="carousel-content"
						style={{ transform: `translateX(-${currentIndex * 100}%)` }}
					>
						{recipeCards.map((recipe) => {
							return <PlannedMealCard key={recipe.id} recipe={recipe} />;
						})}
					</div>
				</div>
			</div>
			{currentIndex < length - 1 && (
				<button className="right-arrow" onClick={next}>
					&gt;
				</button>
			)}
		</div>
	);
}
