export default function ListIngredient({ i }) {
	if (i.method) {
		return (
			<li key={i.ingredient.id}>
				{i.quantity} {i.unit.name} {i.ingredient.name} - {i.method}
			</li>
		);
	}
	return (
		<li key={i.ingredient.id}>
			{i.quantity} {i.unit.name} {i.ingredient.name}
		</li>
	);
}
