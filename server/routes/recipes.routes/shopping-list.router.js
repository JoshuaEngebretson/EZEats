const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();
const { convertUnitToSmallest, convertSmallestToLargestUsMeasurement } = require('../../modules/unit-conversion');

// GET shopping list route
router.get( '/shopping-list', rejectUnauthenticated, ( req, res ) => {
  const userId = req.user.id
  const shoppingListCardsQuery = `
    SELECT
      recipes.id,
      recipes.recipe_name AS name,
      recipes.image_of_recipe AS image,
      recipes.user_id,
      recipes.on_menu,
      category.name AS category
    FROM recipes
    JOIN category ON category.id=recipes.category_id
    WHERE user_id = $1 AND recipes.on_menu > 0
    ORDER BY times_cooked DESC, recipe_name, category.name;
  `;

  pool
    .query( shoppingListCardsQuery, [ userId ] )
    .then( result => {
      const recipeCards = result.rows
      const shoppingListIngredientsQuery = `
      SELECT
        JSON_BUILD_OBJECT(
          'ingredient', ingredients.ingredient_name,
          'multipliedQuantity', (recipe_ingredients.quantity*recipes.on_menu),
          'conversionCategory', units_of_measurement.conversion_category,
          'originalUnits', units_of_measurement.unit,
          'multipliedConvertedQuantity', (recipe_ingredients.converted_quantity*recipes.on_menu),
          'foodCategory', food_categories.food_category_name,
          'recipeId', recipes.id 
        ) AS ingredients
      FROM recipes
      JOIN "user" ON recipes.user_id="user".id
      JOIN recipe_ingredients ON recipe_ingredients.recipe_id=recipes.id
      JOIN units_of_measurement ON units_of_measurement.id=recipe_ingredients.unit_id
      JOIN ingredients ON ingredients.id=recipe_ingredients.ingredients_id
      JOIN category ON category.id=recipes.category_id
      JOIN food_categories ON food_categories.id = ingredients.food_category_id
      WHERE "user".id = $1 AND recipes.on_menu > 0
      GROUP BY
        recipes.id, recipes.recipe_name, recipes.image_of_recipe,
        recipes.recipe_text, ingredients.ingredient_name, recipe_ingredients.quantity,
        units_of_measurement.id, food_categories.food_category_name, recipe_ingredients.id
      ORDER BY
      food_categories.food_category_name, ingredients.ingredient_name;
      `;
      pool
        .query( shoppingListIngredientsQuery, [ userId ] )
        .then( result => {
          let unformattedIngredients = result.rows
          console.log('*****');
          console.log( 'unformattedIngredients:', unformattedIngredients );
          console.log('*****');
          // Combine the unformattedIngredients array and start to format them
          let combinedIngredients = unformattedIngredients.reduce( ( result, item ) => {
            const {
              ingredient, recipeId, multipliedQuantity,
              multipliedConvertedQuantity, conversionCategory, originalUnits
            } = item.ingredients;
            let key;
            if ( conversionCategory === 'other' ){
              // Change how key is created to specifiy that these are built in a different manner
              // This removes the chance to combine 6 small potatoes with 6 large potatoes
                // we would instead have 2 different instances of needing 6 potatoes.
                  // one for large, and one for small
              key = `${ ingredient }_${ originalUnits }`
            } else {
              // If the conversionCategory is not other, it would then be either volume OR mass
              // In which case any other ingredient with the same name and conversionCategory
              // Can and should be combined to get the overall total quantity needed of that ingredient
              key = `${ ingredient }_${ conversionCategory }`;
            }
            if ( result[ key ] ) {
              // If this object, already exists, add up the quantities
              result[ key ].multipliedConvertedQuantity += multipliedConvertedQuantity;
              result[ key ].multipliedQuantity += multipliedQuantity;
              // If this object does not already include the current recipeId in it's recipeIds array
                // Then push the new recipeId to that array
              if ( !result[ key ].recipeIds.includes( recipeId ) ){
                result[ key ].recipeIds.push( recipeId );
              }
            } else {
              // Create a new object and add 2 new key/value pairs
              result[ key ] = {
                ...item.ingredients,
                recipeIds: [ recipeId ],
                ingredientAndConversionCategory: key
              };
              // This is no longer needed as it is now placed into an array with other
              // The other ids of the other recipes this ingredient is associated with.
              delete result[ key ].recipeId
            }
            return result;
          }, []);
          // Keep only the values from combinedIngredients, this allows for easier looping
          combinedIngredients = Object.values( combinedIngredients )
          let foodCategories = [];
          // Go through the combinedIngredients and further format the quantities needed for
            // the user to know what is on their shopping list.
          combinedIngredients.map( ingredient => {
            const conversionCategory = ingredient.conversionCategory;
            const foodCategory = ingredient.foodCategory;
            const multipliedConvertedQuantity = ingredient.multipliedConvertedQuantity;
            let shoppingListQuantity;
            if ( conversionCategory === 'volume' || conversionCategory === 'mass' ) {
              shoppingListQuantity = 
                convertSmallestToLargestUsMeasurement(
                  multipliedConvertedQuantity,
                  conversionCategory,
                  foodCategory
                );
            }
            else if ( conversionCategory === 'other' ){
              const multipliedQuantity = ingredient.multipliedQuantity
              const originalUnits = ingredient.originalUnits
              shoppingListQuantity =
                convertSmallestToLargestUsMeasurement(
                  multipliedQuantity,
                  conversionCategory,
                  foodCategory,
                  originalUnits
                );
            }
            else {
              // Add in an error message if a conversionCategory does not exist.
                // As all the data going into this should be controlled, this should never be reached.
                // BUT this is included just in case something happens.
              shoppingListQuantity = `Error, this conversionCategory ${conversionCategory} is not supported.`;
            }
            // Add a new key/value pair to the current ingredient
            ingredient.shoppingListQuantity = shoppingListQuantity;
            // Remove the following key/value pairs as they are no longer needed for data purposes
            // These are now all being read in a new format within the object.
            delete ingredient.multipliedQuantity;
            delete ingredient.multipliedConvertedQuantity;
            delete ingredient.originalUnits;
            if ( !foodCategories.includes( foodCategory ) ){
              foodCategories.push( foodCategory );
            }
          })
          // console.log('*****');
          // console.log( 'post conversions combinedIngredients:', combinedIngredients );
          // console.log('*****');
          // Create an object that includes the recipes on the shoppingList and the
            // ingredients the user needs to make all those recipes
          let shoppingList = {
            recipeCards,
            combinedIngredients,
            foodCategories
          };
          res.send( shoppingList );
        })
    })
    .catch( dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus( 500 );
      console.log( 'Error in GET shoppingList route:', dbErr );
    })
}) // End GET shopping list route

module.exports = router;