import ListIngredient from "./ListIngredient/ListIngredient";

export default function RenderIngredients({ currentRecipe, recipeParts }) {
	return (
		<>
			<ul>
				{currentRecipe.ingredients.map((i) => {
					if (!i.forWhichPart) {
						return <ListIngredient key={i.ingredient.id} i={i} />;
					}
				})}
			</ul>
			{recipeParts.map((part) => {
				/*
        This portion specifically will only be rendered if there are
        different parts within the ingredients
        Example: a recipe with a main part and a separate sauce.
        */
				return (
					<div key={part}>
						<h4>{part}</h4>
						<ul>
							{currentRecipe.ingredients.map((i) => {
								// Only show the ingredients that match with the current part
								// that has been mapped
								if (i.forWhichPart === part) {
									return <ListIngredient key={i.ingredient.id} i={i} />;
								}
							})}
						</ul>
					</div>
				);
			})}
		</>
	);
}
