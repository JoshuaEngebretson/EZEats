// Unit conversions provided via google.com

// Volumetric conversions to US teaspoon
const volumetricConversionsToUsTeaspoon = {
	// US volumes to US teaspoon
	usTeaspoonsInCubicFoot: 5745.04,
	usTeaspoonsInUsGallon: 768,
	usTeaspoonsInUsQuart: 192,
	usTeaspoonsInUsPint: 96,
	usTeaspoonsInUsCup: 48.692,
	usTeaspoonsInUsFluidOunce: 6,
	usTeaspoonsInCubicInch: 3.325,
	usTeaspoonsInUsTablespoon: 3,
	usTeaspoonsInUsTeaspoon: 1,
	// Metric volumes to US teaspoon
	usTeaspoonsInLiter: 202.9,
	usTeaspoonsInMilliliter: 0.203,
	// Imperial volumes to US teaspoon
	usTeaspoonsInImperialGallon: 922.3,
	usTeaspoonsInImperialQuart: 230.6,
	usTeaspoonsInImperialPint: 115.3,
	usTeaspoonsInImperialCup: 57.646,
	usTeaspoonsInImperialFluidOunce: 5.765,
	usTeaspoonsInImperialTablespoon: 3.603,
	usTeaspoonsInImperialTeaspoon: 1.201,
};

// Mass conversions to grams
const massConversionsTograms = {
	// US masses
	gramsInPound: 453.6,
	gramsInOunce: 28.35,
	// Metric masses
	gramsInStone: 6350.29,
	gramsInKilogram: 1000,
	gramsInGram: 1,
	gramsInMilligram: 0.001,
};

/**
 * - Converts a specified unit to the smallest version of itself for
 *   combining different unit types.
 * - Mass is converted to grams. Volume is converted to US teaspoons
 * @param {number} quantity The stored amount for the recipe
 * @param {string} unit The stored unit of measurement
 * @param {'mass' | 'volume' | 'other'} volumeOrMass
 *  - - Accepts 'mass', 'volume', or 'other'. Used to determine the type of conversion:
 *  mass into grams, from a volume into teaspoons, or unable to convert.
 * @returns
 *  - A number of either US teaspoons
 *  - A number of grams
 *  - or NULL
 */
function convertUnitToSmallest(quantity, unit, volumeOrMass) {
	switch (volumeOrMass) {
		case "mass":
			switch (unit) {
				case "stone":
					return (
						quantity * massConversionsTograms.gramsInStone
					);
				case "kg":
					return (
						quantity *
						massConversionsTograms.gramsInKilogram
					);
				case "lb":
					return (
						quantity * massConversionsTograms.gramsInPound
					);
				case "oz":
					return (
						quantity * massConversionsTograms.gramsInOunce
					);
				case "g":
					return quantity;
				case "mg":
					return (
						quantity *
						massConversionsTograms.gramsInMilligram
					);
				default:
					break;
			}
		case "volume":
			switch (unit) {
				case "cubic foot":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInCubicFoot
					);
				case "gal":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInUsGallon
					);
				case "qt":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInUsQuart
					);
				case "pt":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInUsPint
					);
				case "c":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInUsCup
					);
				case "fl oz":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInUsFluidOunce
					);
				case "cubic inch":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInCubicInch
					);
				case "tbsp":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInUsTablespoon
					);
				case "tsp":
					return quantity;
				case "l":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInLiter
					);
				case "ml":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInMilliliter
					);
				case "Imperial gallon":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInImperialGallon
					);
				case "Imperial quart":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInImperialQuart
					);
				case "Imperial pint":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInImperialPint
					);
				case "Imperial cup":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInImperialCup
					);
				case "Imperial fluid ounce":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInImperialFluidOunce
					);
				case "Imperial tablespoon":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInImperialTablespoon
					);
				case "Imperial teaspoon":
					return (
						quantity *
						volumetricConversionsToUsTeaspoon.usTeaspoonsInImperialTeaspoon
					);
				default:
					break;
			}
		default:
			break;
	}
	return null;
}

// Check back later to see if rounding mode is accessible in browsers
//  which would allow me to place all into just the quantity line
// Might make this client based for the future to be able to change the locale
//  based on the user's location
const formatter = new Intl.NumberFormat("en-US", {
	maximumFractionDigits: 2,
});

/**
 * - Converts a combined smallest unit and outputs the largest
 *  unit that it could be.
 * - Stops at the first unit the quantity is greater than, then
 *  converts to a number of those units
 * @example
 * Input - (1500, 'volume')
 * Output - { quantity: 1.96, unit: 'gallons' }
 * @param {number} quantity - A number of US teaspoons OR grams
 * @param {'mass' | 'volume' | 'other'} volumeOrMass
 *  - - Accepts 'mass', 'volume', or 'other'. Used to determine the type of conversion:
 *  mass into grams, from a volume into teaspoons, or unable to convert.
 * @param {string} category - A string that is used to check if able to use any of the liquid based measurements: (fl oz, pint, quart, gallon)
 * @param {string} optionalUnits - (optional) A string used when the volumeOrMass provided is equal to 'other'. This is used to provide a non converted output.
 * @returns {convertedObject} an object that consists of {quantity: number, unit: 'string'}
 */
function convertSmallestToLargestUsMeasurement(
	quantity,
	volumeOrMass,
	category,
	optionalUnits
) {
	let conversion;
	switch (volumeOrMass) {
		case "volume":
			conversion = volumetricConversionsToUsTeaspoon;
			switch (true) {
				// stop at the first case the quantity is greater than, then convert
				// to that a number of those units
				case quantity >=
					conversion.usTeaspoonsInUsGallon * 0.75 &&
					(category === "liquids" ||
						category === "oil" ||
						category === "alcohol" ||
						category === "Soups or Broths"):
					return convertQuantity(
						quantity,
						conversion.usTeaspoonsInUsGallon,
						"gallon"
					);
				case quantity >=
					conversion.usTeaspoonsInUsQuart * 0.75 &&
					(category === "liquids" ||
						category === "oil" ||
						category === "alcohol" ||
						category === "Soups or Broths"):
					return convertQuantity(
						quantity,
						conversion.usTeaspoonsInUsQuart,
						"quart"
					);
				case quantity >=
					conversion.usTeaspoonsInUsPint * 0.75 &&
					(category === "liquids" ||
						category === "oil" ||
						category === "alcohol" ||
						category === "Soups or Broths"):
					return convertQuantity(
						quantity,
						conversion.usTeaspoonsInUsPint,
						"pint"
					);
				case quantity >= conversion.usTeaspoonsInUsCup * 0.5:
					return convertQuantity(
						quantity,
						conversion.usTeaspoonsInUsCup,
						"cup"
					);
				case quantity >=
					conversion.usTeaspoonsInUsFluidOunce * 0.75 &&
					(category === "liquids" ||
						category === "oil" ||
						category === "alcohol" ||
						category === "Soups or Broths"):
					return convertQuantity(
						quantity,
						conversion.usTeaspoonsInUsFluidOunce,
						"fluid ounce"
					);
				case quantity >= conversion.usTeaspoonsInUsTablespoon:
					return convertQuantity(
						quantity,
						conversion.usTeaspoonsInUsTablespoon,
						"tablespoon"
					);
				default:
					return convertQuantity(
						quantity,
						conversion.usTeaspoonsInUsTeaspoon,
						"teaspoon"
					);
			}
		case "mass":
			conversion = massConversionsTograms;
			switch (true) {
				case quantity >= conversion.gramsInPound:
					return convertQuantity(
						quantity,
						conversion.gramsInPound,
						"pound"
					);
				default:
					// Can get less than 1 ounce of an item
					// Example being spices
					//  But those are generally entered volumetrically in recipes
					return convertQuantity(
						quantity,
						conversion.gramsInOunce,
						"ounce"
					);
			}
		case "other":
			let convertedObject = {
				quantity: quantity,
				unit: optionalUnits,
			};
			return convertedObject;
		default:
			break;
	}
	return null;
}

function convertQuantity(num, unitConvertingInto, unit) {
	let convertedNum = num / unitConvertingInto;
	convertedNum = Number(
		formatter.format(Math.ceil(convertedNum * 100) / 100)
	);
	if (convertedNum > 1) {
		unit = `${unit}s`;
	}
	let convertedObject = {
		quantity: convertedNum,
		unit: unit,
	};
	return convertedObject;
}

module.exports = {
	convertUnitToSmallest,
	convertSmallestToLargestUsMeasurement,
};

function testConvertToLargest() {
	console.log("***** volume tests *****");
	console.log(
		"Expected 1.(some decimal place) gallons:",
		convertSmallestToLargestUsMeasurement(
			1500,
			"volume",
			"liquids"
		)
	);
	console.log(
		"Expected 30.(some decimal place) cups:",
		convertSmallestToLargestUsMeasurement(1500, "volume")
	);
	console.log(
		"Expected 1.(some decimal place) gallons:",
		convertSmallestToLargestUsMeasurement(
			769,
			"volume",
			"liquids"
		)
	);
	console.log(
		"Expected 3.(some decimal place) quarts:",
		convertSmallestToLargestUsMeasurement(
			765,
			"volume",
			"liquids"
		)
	);
	console.log(
		"Expected 1.(some decimal place) pints:",
		convertSmallestToLargestUsMeasurement(
			191,
			"volume",
			"liquids"
		)
	);
	console.log(
		"Expected 1.(some decimal place) cups:",
		convertSmallestToLargestUsMeasurement(95, "volume")
	);
	console.log(
		"Expected 7.(some decimal place) fluid ounces:",
		convertSmallestToLargestUsMeasurement(45, "volume", "liquids")
	);
	console.log(
		"Expected 1.(some decimal place) tablespoons:",
		convertSmallestToLargestUsMeasurement(5, "volume")
	);
	console.log(
		"Expected 2.8 teaspoons:",
		convertSmallestToLargestUsMeasurement(2.8, "volume")
	);
	console.log(
		"Expected 0.8 teaspoons:",
		convertSmallestToLargestUsMeasurement(0.8, "volume")
	);
	console.log("***** mass tests *****");
	console.log(
		"Expected 3.(some decimal place) pounds:",
		convertSmallestToLargestUsMeasurement(1400, "mass")
	);
	console.log(
		"Expected 15.(some decimal place) ounces:",
		convertSmallestToLargestUsMeasurement(450, "mass")
	);
	console.log(
		"Expected 0.(some decimal place) ounces:",
		convertSmallestToLargestUsMeasurement(2, "mass")
	);
	return `\n***** testConvertToLargest completed *****\n`;
}
function testConvertToSmallest() {
	console.log("***** volume tests *****");
	console.log(
		"Expected cubic foot 5745.04:",
		convertUnitToSmallest(1, "cubic foot", "volume")
	);
	console.log(
		"Expected gal 768:",
		convertUnitToSmallest(1, "gal", "volume")
	);
	console.log(
		"Expected qt 192:",
		convertUnitToSmallest(1, "qt", "volume")
	);
	console.log(
		"Expected pt 96:",
		convertUnitToSmallest(1, "pt", "volume")
	);
	console.log(
		"Expected c 48.692:",
		convertUnitToSmallest(1, "c", "volume")
	);
	console.log(
		"Expected fl oz 6:",
		convertUnitToSmallest(1, "fl oz", "volume")
	);
	console.log(
		"Expected cubic inch 3.325:",
		convertUnitToSmallest(1, "cubic inch", "volume")
	);
	console.log(
		"Expected tbsp 3:",
		convertUnitToSmallest(1, "tbsp", "volume")
	);
	console.log(
		"Expected tsp 1:",
		convertUnitToSmallest(1, "tsp", "volume")
	);
	console.log(
		"Expected l 202.9:",
		convertUnitToSmallest(1, "l", "volume")
	);
	console.log(
		"Expected ml 0.203:",
		convertUnitToSmallest(1, "ml", "volume")
	);
	console.log(
		"Expected Imperial gallon 922.3:",
		convertUnitToSmallest(1, "Imperial gallon", "volume")
	);
	console.log(
		"Expected Imperial quart 230.6:",
		convertUnitToSmallest(1, "Imperial quart", "volume")
	);
	console.log(
		"Expected Imperial pint 115.3:",
		convertUnitToSmallest(1, "Imperial pint", "volume")
	);
	console.log(
		"Expected Imperial cup 57.646:",
		convertUnitToSmallest(1, "Imperial cup", "volume")
	);
	console.log(
		"Expected Imperial fluid ounce 5.765:",
		convertUnitToSmallest(1, "Imperial fluid ounce", "volume")
	);
	console.log(
		"Expected Imperial tablespoon 3.603:",
		convertUnitToSmallest(1, "Imperial tablespoon", "volume")
	);
	console.log(
		"Expected Imperial teaspoon 1.201:",
		convertUnitToSmallest(1, "Imperial teaspoon", "volume")
	);
	console.log("***** mass tests *****");
	console.log(
		"Expected stone 6350.29:",
		convertUnitToSmallest(1, "stone", "mass")
	);
	console.log(
		"Expected kg 1000:",
		convertUnitToSmallest(1, "kg", "mass")
	);
	console.log(
		"Expected lb 453.6:",
		convertUnitToSmallest(1, "lb", "mass")
	);
	console.log(
		"Expected oz 28.35:",
		convertUnitToSmallest(1, "oz", "mass")
	);
	console.log(
		"Expected g 1:",
		convertUnitToSmallest(1, "g", "mass")
	);
	console.log(
		"Expected mg 0.001:",
		convertUnitToSmallest(1, "mg", "mass")
	);
}
// console.log(testConvertToSmallest());
// console.log(testConvertToLargest());
