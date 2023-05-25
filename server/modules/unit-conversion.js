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
  * Convert a specified unit to the smallest version of itself for combining different unit types
  * @param {number} quantity The stored amount for the recipe
  * @param {string} unit The stored unit
  * @param {string} volumetricOrMass Accepts 'mass', 'weight', 'volumetric', 'volume', or 'other'. Used to determine the type of conversion: weight into grams, from a volume into teaspoons, or unable to convert. 
*/
function convertUnitToSmallest(quantity, unit, volumetricOrMass) {
  switch (volumetricOrMass) {
    case 'mass':
    case 'weight':
      switch (unit) {
        case 'st':
        case 'stone':
          return quantity * massConversionsTograms.stoneToGram;
        case 'kg':
        case 'kilogram':
          return quantity * massConversionsTograms.kilogramToGram;
        case 'lb':
        case 'pound':
          return quantity * massConversionsTograms.poundToGram;
        case 'oz':
        case 'ounce':
          return quantity * massConversionsTograms.ounceToGram;
        case 'g':
        case 'gram':
          return quantity;
        case 'mg':
        case 'milligram':
          return quantity * massConversionsTograms.milligramToGram;
        default:
          break;
      }
    case 'volume':
    case 'volumetric':
      switch (unit) {
        case 'cubic foot':
          return quantity * volumetricConversionsToUsTeaspoon.cubicFootToUsTeaspoon;
        case 'gal':
        case 'gallon': 
        case 'US gal':
        case 'US gallon': 
          return quantity * volumetricConversionsToUsTeaspoon.usGallonToUsTeaspoon;
        case 'qt':
        case 'quart':
        case 'US qt':
        case 'US quart':
          return quantity * volumetricConversionsToUsTeaspoon.usQuartToUsTeaspoon;
        case 'pt':
        case 'pint':
        case 'US pt':
        case 'US pint':
          return quantity * volumetricConversionsToUsTeaspoon.usPintToUsTeaspoon;
        case 'c':
        case 'cup':
        case 'US c':
        case 'US cup':
          return quantity * volumetricConversionsToUsTeaspoon.usCupToUsTeaspoon;
        case 'fl oz':
        case 'fluid ounce':
        case 'US fl oz':
        case 'US fluid ounce':
          return quantity * volumetricConversionsToUsTeaspoon.usFluidOunceToUsTeaspoon;
        case 'cubic inch':
          return quantity * volumetricConversionsToUsTeaspoon.cubicInchToUsTeaspoon;
        case 'T':
        case 'tbs':
        case 'tbsp':
        case 'tablespoon':
        case 'US T':
        case 'US tbs':
        case 'US tbsp':
        case 'US tablespoon':
          return quantity * volumetricConversionsToUsTeaspoon.usTablespoonToUsTeaspoon;
        case 't':
        case 'tsp':
        case 'US t':
        case 'US tsp':
        case 'US teaspoon':
          return quantity
        case 'l':
        case 'liter':
          return quantity * volumetricConversionsToUsTeaspoon.literToUsTeaspoon;
        case 'ml':
        case 'milliliter':
          return quantity * volumetricConversionsToUsTeaspoon.milliliterToUsTeaspoon;
        case 'Imperial gal':
        case 'Imperial gallon':
          return quantity * volumetricConversionsToUsTeaspoon.imperialGallonToUsTeaspoon;
        case 'Imperial qt':
        case 'Imperial quart':
          return quantity * volumetricConversionsToUsTeaspoon.imperialQuartToUsTeaspoon;
        case 'Imperial pt':
        case 'Imperial pint':
          return quantity * volumetricConversionsToUsTeaspoon.imperialPintToUsTeaspoon;
        case 'Imperial c':
        case 'Imperial cup':
          return quantity * volumetricConversionsToUsTeaspoon.imperialCupToUsTeaspoon;
        case 'Imperial fl oz':
        case 'Imperial fluid ounce':
          return quantity * volumetricConversionsToUsTeaspoon.imperialFluidOunceToUsTeaspoon;
        case 'Imperial T':
        case 'Imperial tbs':
        case 'Imperial tbsp':
        case 'Imperial tablespoon':
          return quantity * volumetricConversionsToUsTeaspoon.imperialTablespoonToUsTeaspoon;
        case 'Imperial t':
        case 'Imperial tsp':
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

function volumeTests () {
  console.log('Expected cubic foot 5745.04:', convertUnitToSmallest(1, 'cubic foot', 'volume'))
  console.log('Expected cubic foot 5745.04:', convertUnitToSmallest(1, 'cubic foot', 'volumetric'))

  console.log('Expected gal 768:', convertUnitToSmallest(1, 'gal', 'volume'))
  console.log('Expected gal 768:', convertUnitToSmallest(1, 'gal', 'volumetric'))
  console.log('Expected gallon 768:', convertUnitToSmallest(1, 'gallon', 'volume'))
  console.log('Expected gallon 768:', convertUnitToSmallest(1, 'gallon', 'volumetric'))
  console.log('Expected US gal 768:', convertUnitToSmallest(1, 'US gal', 'volume'))
  console.log('Expected US gal 768:', convertUnitToSmallest(1, 'US gal', 'volumetric'))
  console.log('Expected US gallon 768:', convertUnitToSmallest(1, 'US gallon', 'volume'))
  console.log('Expected US gallon 768:', convertUnitToSmallest(1, 'US gallon', 'volumetric'))
  
  console.log('Expected qt 172:', convertUnitToSmallest(1, 'qt', 'volume'))
  console.log('Expected qt 172:', convertUnitToSmallest(1, 'qt', 'volumetric'))
  console.log('Expected quart 172:', convertUnitToSmallest(1, 'quart', 'volume'))
  console.log('Expected quart 172:', convertUnitToSmallest(1, 'quart', 'volumetric'))
  console.log('Expected US qt 172:', convertUnitToSmallest(1, 'US qt', 'volume'))
  console.log('Expected US qt 172:', convertUnitToSmallest(1, 'US qt', 'volumetric'))
  console.log('Expected US quart 172:', convertUnitToSmallest(1, 'US quart', 'volume'))
  console.log('Expected US quart 172:', convertUnitToSmallest(1, 'US quart', 'volumetric'))

  console.log('Expected pt 96:', convertUnitToSmallest(1, 'pt', 'volume'))
  console.log('Expected pt 96:', convertUnitToSmallest(1, 'pt', 'volumetric'))
  console.log('Expected pint 96:', convertUnitToSmallest(1, 'pint', 'volume'))
  console.log('Expected pint 96:', convertUnitToSmallest(1, 'pint', 'volumetric'))
  console.log('Expected US pt 96:', convertUnitToSmallest(1, 'US pt', 'volume'))
  console.log('Expected US pt 96:', convertUnitToSmallest(1, 'US pt', 'volumetric'))
  console.log('Expected US pint 96:', convertUnitToSmallest(1, 'US pint', 'volume'))
  console.log('Expected US pint 96:', convertUnitToSmallest(1, 'US pint', 'volumetric'))

  console.log('Expected c 48.692:', convertUnitToSmallest(1, 'c', 'volume'))
  console.log('Expected c 48.692:', convertUnitToSmallest(1, 'c', 'volumetric'))
  console.log('Expected cup 48.692:', convertUnitToSmallest(1, 'cup', 'volume'))
  console.log('Expected cup 48.692:', convertUnitToSmallest(1, 'cup', 'volumetric'))
  console.log('Expected US c 48.692:', convertUnitToSmallest(1, 'US c', 'volume'))
  console.log('Expected US c 48.692:', convertUnitToSmallest(1, 'US c', 'volumetric'))
  console.log('Expected US cup 48.692:', convertUnitToSmallest(1, 'US cup', 'volume'))
  console.log('Expected US cup 48.692:', convertUnitToSmallest(1, 'US cup', 'volumetric'))

  console.log('Expected fl oz 6:', convertUnitToSmallest(1, 'fl oz', 'volume'))
  console.log('Expected fl oz 6:', convertUnitToSmallest(1, 'fl oz', 'volumetric'))
  console.log('Expected fluid ounce 6:', convertUnitToSmallest(1, 'fluid ounce', 'volume'))
  console.log('Expected fluid ounce 6:', convertUnitToSmallest(1, 'fluid ounce', 'volumetric'))
  console.log('Expected US fl oz 6:', convertUnitToSmallest(1, 'US fl oz', 'volume'))
  console.log('Expected US fl oz 6:', convertUnitToSmallest(1, 'US fl oz', 'volumetric'))
  console.log('Expected US fluid ounce 6:', convertUnitToSmallest(1, 'US fluid ounce', 'volume'))
  console.log('Expected US fluid ounce 6:', convertUnitToSmallest(1, 'US fluid ounce', 'volumetric'))

  console.log('Expected cubic inch 3.325:', convertUnitToSmallest(1, 'cubic inch', 'volume'))
  console.log('Expected cubic inch 3.325:', convertUnitToSmallest(1, 'cubic inch', 'volumetric'))
  
  console.log('Expected tbsp 3:', convertUnitToSmallest(1, 'tbsp', 'volume'))
  
  console.log('Expected t 1:', convertUnitToSmallest(1, 't', 'volume'))
  
  console.log('Expected l 202.9:', convertUnitToSmallest(1, 'l', 'volume'))
  
  console.log('Expected ml 0.203:', convertUnitToSmallest(1, 'ml', 'volume'))
  
  console.log('Expected Imperial gal 922.3:', convertUnitToSmallest(1, 'Imperial gal', 'volume'))
  
  console.log('Expected Imperial qt 230.6:', convertUnitToSmallest(1, 'Imperial qt', 'volume'))
  
  console.log('Expected Imperial pt 115.3:', convertUnitToSmallest(1, 'Imperial pt', 'volume'))
  
  console.log('Expected Imperial c 57.646:', convertUnitToSmallest(1, 'Imperial c', 'volume'))
  
  console.log('Expected Imperial fl oz 5.765:', convertUnitToSmallest(1, 'Imperial fl oz', 'volume'))
  
  console.log('Expected Imperial tbsp 3.603:', convertUnitToSmallest(1, 'Imperial tbsp', 'volume'))
  
  console.log('Expected Imperial t 1.201:', convertUnitToSmallest(1, 'Imperial t', 'volume'))
}

function massTests() {
  
  console.log('Expected st 6350.29:', convertUnitToSmallest(1, 'st', 'mass'))
  console.log('Expected st 6350.29:', convertUnitToSmallest(1, 'st', 'weight'))
  console.log('Expected stone 6350.29:', convertUnitToSmallest(1, 'stone', 'weight'))
  console.log('Expected stone 6350.29:', convertUnitToSmallest(1, 'stone', 'mass'))
  
  console.log('Expected kg 1000:', convertUnitToSmallest(1, 'kg', 'mass'))
  console.log('Expected kg 1000:', convertUnitToSmallest(1, 'kg', 'weight'))
  console.log('Expected kilogram 1000:', convertUnitToSmallest(1, 'kilogram', 'mass'))
  console.log('Expected kilogram 1000:', convertUnitToSmallest(1, 'kilogram', 'weight'))

  console.log('Expected lb 453.6:', convertUnitToSmallest(1, 'lb', 'mass'))
  console.log('Expected lb 453.6:', convertUnitToSmallest(1, 'lb', 'weight'))
  console.log('Expected pound 453.6:', convertUnitToSmallest(1, 'pound', 'mass'))
  console.log('Expected pound 453.6:', convertUnitToSmallest(1, 'pound', 'weight'))

  console.log('Expected oz 28.35:', convertUnitToSmallest(1, 'oz', 'mass'))
  console.log('Expected oz 28.35:', convertUnitToSmallest(1, 'oz', 'weight'))
  console.log('Expected ounce 28.35:', convertUnitToSmallest(1, 'ounce', 'mass'))
  console.log('Expected ounce 28.35:', convertUnitToSmallest(1, 'ounce', 'weight'))

  console.log('Expected g 1:', convertUnitToSmallest(1, 'g', 'mass'))
  console.log('Expected g 1:', convertUnitToSmallest(1, 'g', 'weight'))
  console.log('Expected gram 1:', convertUnitToSmallest(1, 'gram', 'mass'))
  console.log('Expected gram 1:', convertUnitToSmallest(1, 'gram', 'weight'))

  console.log('Expected mg 0.001:', convertUnitToSmallest(1, 'mg', 'mass'))
  console.log('Expected mg 0.001:', convertUnitToSmallest(1, 'mg', 'weight'))
  console.log('Expected milligram 0.001:', convertUnitToSmallest(1, 'milligram', 'mass'))
  console.log('Expected milligram 0.001:', convertUnitToSmallest(1, 'milligram', 'weight'))
}

console.log(volumeTests());
console.log(massTests());
