// Unit conversions provided via google.com

// Volumetric conversions to US teaspoon
const volumetricConversionsToUsTeaspoon = {
  // US volumes to US teaspoon
  cubicFootToUsTeaspoon: 5745.04,
  usGallonToUsTeaspoon: 768,
  usQuartToUsTeaspoon: 172,
  usPintToUsTeaspoon: 96,
  usCupToUsTeaspoon: 48.692,
  usFluidOunceToUsTeaspoon: 6,
  cubicInchToUsTeaspoon: 3.325,
  usTablespoonToUsTeaspoon: 3,
  // Universal volumes to US teaspoon
  literToUsTeaspoon: 202.9,
  milliliterToUsTeaspoon: 0.203,
  // Imperial volumes to US teaspoon
  imperialGallonToUsTeaspoon: 922.3,
  imperialQuartToUsTeaspoon: 230.6,
  imperialPintToUsTeaspoon:115.3,
  imperialCupToUsTeaspoon: 57.646,
  imperialFluidOunceToUsTeaspoon: 5.765,
  imperialTablespoonToUsTeaspoon: 3.603,
  imperialTeaspoonToUsTeaspoon: 1.201
}

// Mass conversions to grams
const massConversionsTograms = {
  stoneToGram: 6350.29,
  kilogramToGram: 1000,
  poundToGram: 453.6,
  ounceToGram: 28.35,
  milligramToGram: 0.001
}

/**
  * Converts a specified unit to the smallest version of itself for combining different unit types.
  * 
  * Mass is converted to grams. Volume is converted to US teaspoons
  * 
  * @param {number} quantity The stored amount for the recipe
  * @param {string} unit The stored unit of measurement
  * @param {string} volumeOrMass Accepts 'mass', 'volume', or 'other'. Used to determine the type of conversion: mass into grams, from a volume into teaspoons, or unable to convert. 
*/
function convertUnitToSmallest(quantity, unit, volumeOrMass) {
  switch (volumeOrMass) {
    case 'mass':
      switch (unit) {
        case 'stone':
          return quantity * massConversionsTograms.stoneToGram;
        case 'kg':
          return quantity * massConversionsTograms.kilogramToGram;
        case 'lb':
          return quantity * massConversionsTograms.poundToGram;
        case 'oz':
          return quantity * massConversionsTograms.ounceToGram;
        case 'g':
          return quantity;
        case 'mg':
          return quantity * massConversionsTograms.milligramToGram;
        default:
          break;
      }
    case 'volume':
      switch (unit) {
        case 'cubic foot':
          return quantity * volumetricConversionsToUsTeaspoon.cubicFootToUsTeaspoon;
        case 'gal':
          return quantity * volumetricConversionsToUsTeaspoon.usGallonToUsTeaspoon;
        case 'qt':
          return quantity * volumetricConversionsToUsTeaspoon.usQuartToUsTeaspoon;
        case 'pt':
          return quantity * volumetricConversionsToUsTeaspoon.usPintToUsTeaspoon;
        case 'c':
          return quantity * volumetricConversionsToUsTeaspoon.usCupToUsTeaspoon;
        case 'fl oz':
          return quantity * volumetricConversionsToUsTeaspoon.usFluidOunceToUsTeaspoon;
        case 'cubic inch':
          return quantity * volumetricConversionsToUsTeaspoon.cubicInchToUsTeaspoon;
        case 'tbsp':
          return quantity * volumetricConversionsToUsTeaspoon.usTablespoonToUsTeaspoon;
        case 'tsp':
          return quantity
        case 'l':
          return quantity * volumetricConversionsToUsTeaspoon.literToUsTeaspoon;
        case 'ml':
          return quantity * volumetricConversionsToUsTeaspoon.milliliterToUsTeaspoon;
        case 'Imperial gallon':
          return quantity * volumetricConversionsToUsTeaspoon.imperialGallonToUsTeaspoon;
        case 'Imperial quart':
          return quantity * volumetricConversionsToUsTeaspoon.imperialQuartToUsTeaspoon;
        case 'Imperial pint':
          return quantity * volumetricConversionsToUsTeaspoon.imperialPintToUsTeaspoon;
        case 'Imperial cup':
          return quantity * volumetricConversionsToUsTeaspoon.imperialCupToUsTeaspoon;
        case 'Imperial fluid ounce':
          return quantity * volumetricConversionsToUsTeaspoon.imperialFluidOunceToUsTeaspoon;
        case 'Imperial tablespoon':
          return quantity * volumetricConversionsToUsTeaspoon.imperialTablespoonToUsTeaspoon;
        case 'Imperial teaspoon':
          return quantity * volumetricConversionsToUsTeaspoon.imperialTeaspoonToUsTeaspoon;
        default:
          break;
      }
    default:
      break;
  }
  return null;
}

module.exports = convertUnitToSmallest;

function volumeTests () {
  console.log('Expected cubic foot 5745.04:', convertUnitToSmallest(1, 'cubic foot', 'volume'))
  console.log('Expected gal 768:', convertUnitToSmallest(1, 'gal', 'volume'))
  console.log('Expected qt 172:', convertUnitToSmallest(1, 'qt', 'volume'))
  console.log('Expected pt 96:', convertUnitToSmallest(1, 'pt', 'volume'))
  console.log('Expected c 48.692:', convertUnitToSmallest(1, 'c', 'volume'))
  console.log('Expected fl oz 6:', convertUnitToSmallest(1, 'fl oz', 'volume'))
  console.log('Expected cubic inch 3.325:', convertUnitToSmallest(1, 'cubic inch', 'volume'))
  console.log('Expected tbsp 3:', convertUnitToSmallest(1, 'tbsp', 'volume'))
  console.log('Expected tsp 1:', convertUnitToSmallest(1, 'tsp', 'volume'))
  console.log('Expected l 202.9:', convertUnitToSmallest(1, 'l', 'volume'))
  console.log('Expected ml 0.203:', convertUnitToSmallest(1, 'ml', 'volume'))
  console.log('Expected Imperial gallon 922.3:', convertUnitToSmallest(1, 'Imperial gallon', 'volume'))
  console.log('Expected Imperial quart 230.6:', convertUnitToSmallest(1, 'Imperial quart', 'volume'))
  console.log('Expected Imperial pint 115.3:', convertUnitToSmallest(1, 'Imperial pint', 'volume'))
  console.log('Expected Imperial cup 57.646:', convertUnitToSmallest(1, 'Imperial cup', 'volume'))
  console.log('Expected Imperial fluid ounce 5.765:', convertUnitToSmallest(1, 'Imperial fluid ounce', 'volume'))
  console.log('Expected Imperial tablespoon 3.603:', convertUnitToSmallest(1, 'Imperial tablespoon', 'volume'))
  console.log('Expected Imperial teaspoon 1.201:', convertUnitToSmallest(1, 'Imperial teaspoon', 'volume'))
}
function massTests() {
  console.log('Expected stone 6350.29:', convertUnitToSmallest(1, 'stone', 'mass'))
  console.log('Expected kg 1000:', convertUnitToSmallest(1, 'kg', 'mass'))
  console.log('Expected lb 453.6:', convertUnitToSmallest(1, 'lb', 'mass'))
  console.log('Expected oz 28.35:', convertUnitToSmallest(1, 'oz', 'mass'))
  console.log('Expected g 1:', convertUnitToSmallest(1, 'g', 'mass'))
  console.log('Expected mg 0.001:', convertUnitToSmallest(1, 'mg', 'mass'))
}
// console.log(volumeTests());
// console.log(massTests());
// console.log('Expected whole null', convertUnitToSmallest(2,'whole', 'volume'));