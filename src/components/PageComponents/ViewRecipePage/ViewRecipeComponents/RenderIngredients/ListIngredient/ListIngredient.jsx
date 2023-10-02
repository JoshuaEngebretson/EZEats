export default function ListIngredient({ i }) {
	// Check if an ingredient has a method
	if (i.method) {
		// Render an ingredient with a method
		return (
			<li
				key={i.ingredient.id}
				className="ingredient-list-item"
			>
				{i.quantity} {i.unit.name} {i.ingredient.name} -{" "}
				{i.method}
			</li>
		);
	}
	// Render an ingredient without a method
	return (
		<li key={i.ingredient.id} className="ingredient-list-item">
			{i.quantity} {i.unit.name} {i.ingredient.name}
		</li>
	);
}
