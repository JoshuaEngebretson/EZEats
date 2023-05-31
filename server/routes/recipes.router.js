const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const { convertUnitToSmallest, convertSmallestToLargestUsMeasurement } = require('../modules/unit-conversion');

// GET all recipes route
router.get( '/', rejectUnauthenticated, ( req, res ) => {
  const userId = req.user.id

  /*
    Show the id, name, image, and category for all recipes
    associated with this user.
  */
  const sqlText = `
    SELECT 
      recipes.id AS id,
      recipes.recipe_name AS name,
      recipes.image_of_recipe AS image,
      category.name AS category
    FROM recipes
    JOIN "user" ON recipes.user_id="user".id
    JOIN category ON category.id=recipes.category_id
      WHERE "user".id = $1
    GROUP BY
    recipes.id, recipes.recipe_name, recipes.image_of_recipe,
      recipes.recipe_text, category.name;
  `;

  pool
    .query( sqlText, [ userId ] )
    .then( result => {
      const recipes = result.rows
      res.send( recipes )
    })
    .catch( dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus( 500 );
      console.log( 'Error in GET all route:', dbErr );
    })
}); // End GET all recipes route

// GET recipe categories route
router.get( '/recipe-categories', rejectUnauthenticated, ( req, res ) => {
  const sqlQuery = `SELECT * FROM category;`
  pool
    .query( sqlQuery )
    .then( result => {
      let recipeCategories = result.rows
      res.send( recipeCategories )
    })
    .catch( dbErr => {
      console.log( 'Error inside GET /recipe-categories:', dbErr );
      res.sendStatus( 500 )
    })
}) // End Get recipe categories route

// GET most cooked recipes route
router.get( '/most-cooked', rejectUnauthenticated, ( req, res ) => {
  const userId = req.user.id
  /*
    Show id, name, image, and category of the most cooked recipes
    associated with this user
  */
  const sqlQuery = `
    SELECT
      recipes.id,
      recipes.recipe_name AS name,
      recipes.image_of_recipe AS image,
      recipes.user_id,
      category.name AS category
    FROM recipes
    JOIN category ON category.id=recipes.category_id
    WHERE user_id = $1
    ORDER BY times_cooked DESC, recipe_name, category.name
    LIMIT 5;
  `;

  pool
    .query( sqlQuery, [ userId ] )
    .then( result => {
      let mostCooked = result.rows
      res.send( mostCooked )
    })
    .catch( dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus( 500 );
      console.log( 'Error inside GET /most-cooked:', dbErr );
    })
  
}) // End GET most cooked recipes route

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

// GET units of measurement route
router.get( '/units-of-measurement', rejectUnauthenticated, ( req, res ) => {
  pool
    .query(`SELECT * FROM units_of_measurement ORDER BY conversion_category, unit;`)
    .then(result => {
      const unitsofMeasurement = result.rows
      res.send(unitsofMeasurement)
    })
    .catch(dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus( 500 );
      console.log( 'Error in GET units of measurement route:', dbErr );
    })
}) // End GET units of measurement route

// GET all ingredients route
router.get('/all-ingredients', rejectUnauthenticated,  ( req, res ) => {
  const allFoodCategoriesQuery = `
    SELECT
      id,
      food_category_name AS name
    FROM food_categories;
  `;
  pool
    .query(allFoodCategoriesQuery)
    .then(result => {
      const foodCategories = result.rows
      const allIngredientsQuery = `
        SELECT
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ingredients.id,
              'name', ingredients.ingredient_name,
              'foodCategory', food_categories.food_category_name,
              'foodCategoryId', food_categories.id
            )
          ) AS ingredients
        FROM ingredients
        JOIN food_categories on food_categories.id = ingredients.food_category_id;
      `;
      pool
        .query(allIngredientsQuery)
        .then(result => {
          const ingredients = result.rows[0].ingredients
          const allIngredients = {
            foodCategories,
            ingredients
          }
          res.send(allIngredients)
        })
        .catch(dbErr => {
          // If unable to process request,
          // send "Internal Server Error" message to client
          res.sendStatus(500)
          console.log('Error inside GET all-ingredients route:', dbErr);
        })
    })
})

// GET specific recipe route
router.get( '/:id', rejectUnauthenticated, ( req, res ) => {
  const userId = req.user.id
  const recipeID = req.params.id
  /*
    Show this recipe for if the current user is associated
    this has been formatted to be an array of objects that have 
    the following formatting
    [{
      id: number,
      name: string,
      image: string,
      recipe_text: string,
      ingredients: array of objects [
        {
          quantity: number,
          unit: {
            id: number,
            unitName: string,
            conversion_category: string
          },
          ingredient: {
            id: number,
            ingredientName: string,
            foodCategory: string
          },
          method: string,
          forWhichPart: string
        }
      ],
      category: string
    }]
  */
  const sqlText = `
    SELECT 
      recipes.id AS id,
      recipes.recipe_name AS name,
      recipes.image_of_recipe AS image,
      recipes.recipe_text,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'quantity', recipe_ingredients.quantity, 
          'unit', JSON_BUILD_OBJECT(
            'id', units_of_measurement.id,
            'name', units_of_measurement.unit,
            'conversionCategory', units_of_measurement.conversion_category
          ),
          'ingredient', JSON_BUILD_OBJECT(
            'id', recipe_ingredients.id,
            'name', ingredients.ingredient_name,
            'foodCategory', food_categories.food_category_name
          ), 
          'method', recipe_ingredients.method, 
          'forWhichPart', recipe_ingredients.for_which_part
        ) ORDER BY recipe_ingredients.id
      ) AS ingredients,
      recipes.on_menu,
      recipes.times_cooked,
      category.name AS category,
      category.id AS "categoryId",
      JSON_AGG(recipe_ingredients.for_which_part) AS "forWhichPart"
    FROM recipes
    JOIN "user" ON recipes.user_id="user".id
    JOIN recipe_ingredients ON recipe_ingredients.recipe_id=recipes.id
    JOIN units_of_measurement ON units_of_measurement.id=recipe_ingredients.unit_id
    JOIN ingredients ON ingredients.id=recipe_ingredients.ingredients_id
    JOIN category ON category.id=recipes.category_id
    JOIN food_categories ON food_categories.id = ingredients.food_category_id
      WHERE "user".id = $1 AND recipes.id = $2
    GROUP BY
      recipes.id, recipes.recipe_name, recipes.image_of_recipe,
      recipes.recipe_text, category.name, recipes.on_menu,
      recipes.times_cooked, category.id;
  `;

  pool
    .query( sqlText, [ userId, recipeID ] )
    .then( result => {
      const recipe = result.rows[0]
      console.log('recipe:', recipe);
      res.send( recipe )
    })
    .catch( dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus( 500 );
      console.log( 'Error in GET specific recipe route:', dbErr );
    })
}) // End Get specific recipe route

// POST new recipe route
router.post( '/', rejectUnauthenticated, async ( req, res ) => {
  const userId = req.user.id
  const newRecipe = req.body
  const ingredients = newRecipe.recipeIngredients

  let newRecipeNameValues;
  
  newRecipeNameValues = [
    newRecipe.recipeName,
    newRecipe.recipeText,
    newRecipe.image,
    userId,
    newRecipe.categoryInput
  ]

  console.log('******');
  console.log('newRecipe within POST', newRecipe);
  console.log('ingredients within POST', ingredients);
  console.log('******');


  const newRecipeNameQuery = `
    INSERT INTO recipes
    (recipe_name, recipe_text, image_of_recipe, user_id, category_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
    `;
  // FIRST QUERY MAKES THE RECIPE
  pool
    // .query( newRecipeNameQuery, newRecipeNameValues )
    .query( 'SELECT * FROM recipes;' )
    .then( result => {
      // const createdRecipeId = result.rows[ 0 ].id
      
      // /* 
      //   Now loop through the ingredients array and add an ingredient
      //   to the recipe_ingredients table for each item of the array
      //   all while referencing the createdRecipeId
      // */
      // ingredients.map( ingredient => {
      //   let newRecipeIngredientQuery;
      //   if ( ingredient.for_which_part ) {
      //     newRecipeIngredientQuery= `
      //       INSERT INTO recipe_ingredients
      //         (quantity, unit, ingredients_id, method, recipe_id, for_which_part)
      //       VALUES ($1, $2, $3, $4, $5, $6);
      //     `;
      //   }
      //   else {
      //     newRecipeIngredientQuery=`
      //       INSERT INTO recipe_ingredients
      //         (quantity, unit, ingredients_id, method, recipe_id)
      //       VALUES ($1, $2, $3, $4, $5);
      //     `;
      //   }
      //   const newRecipeIngredientValues = [
      //     ingredient.quantity,
      //     ingredient.unit,
      //     ingredient.ingredients_id,
      //     ingredient.method,
      //     createdRecipeId,
      //     // If for_which_part exists, add it to the array, otherwise it
      //     //  should be left off
      //     ... ingredient.for_which_part ? [ ingredient.for_which_part ] : [] 
      //   ];

      //   // Nth Query ADDS AN INGREDIENT FOR THAT NEW RECIPE
      //   pool
      //     .query( newRecipeIngredientQuery, newRecipeIngredientValues )
      //     .catch( error => {
      //       // Catch for Nth query
      //       console.log(
      //         `Error while adding an ingredient to the recipe_ingredients table:`,
      //         error
      //       );
      //       res.sendStatus( 500 );
      //     })
      // }) // End ingredients.map

      // // Now that all portions of adding a recipe are completed, send the
      // // "Created" status 
      res.sendStatus( 201 )
    })
    .catch( dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus( 500 );
      console.log( 'Error in POST /new-recipe route:', dbErr );
    })
}); // End POST new recipe route

router.post( '/recipe-categories', rejectUnauthenticated, ( req, res ) => {
  const newCategory = req.body.data
  console.log('newCategory at start of post:', newCategory);
  const sqlQuery = `
    INSERT INTO category (name)
    VALUES ($1)
    RETURNING id;
  `;
  pool
    .query( sqlQuery, [ newCategory ] )
    .then( result => {
      console.log( 'new category id:', result.rows[0].id ); // uncover where id is located.
      const newCategoryId = { id: result.rows[0].id } 
      res.send( newCategoryId )
    })
    .catch( dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus( 500 );
      console.log( 'Error in POST new category route:', dbErr );
    })
})

router.post( '/units-of-measurement', rejectUnauthenticated, ( req, res ) => {
  const newUnit = req.body.data
  console.log('newUnit in server:', newUnit);
  const sqlQuery = `
    INSERT INTO units_of_measurement (unit, conversion_category)
    VALUES ($1, 'other')
    RETURNING id;
  `;
  pool
    .query(sqlQuery, [newUnit])
    .then( result => {
      const newUnitId = { id: result.rows[0].id }
      res.send( newUnitId )
    })
    .catch( dbErr => {
      res.sendStatus( 500 );
      console.log( 'Error in POST new units-of-measurement route:', dbErr );
    })
})

router.post( '/food-categories', rejectUnauthenticated, ( req, res ) => {
  const newFoodCategory = req.body.data
  console.log('newFoodCategory in server:', newFoodCategory);
  const sqlQuery = `
    INSERT INTO food_categories (food_category_name)
    VALUES ($1)
    RETURNING id;
  `;
  pool
    .query(sqlQuery, [newFoodCategory])
    .then( result => {
      const newFoodCategoryId = { id: result.rows[0].id }
      res.send( newFoodCategoryId )
    })
    .catch( dbErr => {
      res.sendStatus( 500 );
      console.log( 'Error in POST new food-categories route:', dbErr );
    })
})

// PUT recipe route
router.put( '/:id', rejectUnauthenticated, ( req, res ) => {
  const userId = req.user.id
  const idToUpdate = req.params.id

  const sqlText = `

  `;

  pool
    .query( sqlText, sqlValues )
    .then( result => {
      res.sendStatus( 201 )
    })
    .catch( dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus( 500 );
      console.log( `Error in PUT /${ idToUpdate } route:`, dbErr );
    })
}); // End PUT recipe route

// PUT adjust-on-menu route
router.put( '/adjust-on-menu/:id', rejectUnauthenticated, ( req, res ) => {
  const userId = req.user.id
  const idToUpdate = req.params.id
  const adjustment = req.body.adjustment
  console.log( 'req.body inside adjust-on-menu/:id:', req.body );

  let sqlQuery;

  if ( adjustment === 'increaseNumber' ) {
    sqlQuery = `
      UPDATE recipes
        SET on_menu = (on_menu+1)
        WHERE id = $1 AND user_id = $2;
    `;
  } else if ( adjustment === 'decreaseNumber' ) {
    sqlQuery = `
      UPDATE recipes
        SET on_menu = (on_menu-1)
        WHERE id = $1 AND user_id = $2;
    `;
  } else if (adjustment === 'removeRecipe') {
    sqlQuery = `
      UPDATE recipes
        SET on_menu = 0
        WHERE id = $1 AND user_id = $2
    `
  }

  pool
    .query( sqlQuery, [ idToUpdate, userId ] )
    .then( dbRes => {
      res.sendStatus( 200 )
    })
    .catch( dbErr => {
      console.log( 'Error inside PUT adjust-on-menu:', dbErr );
      res.sendStatus( 500 )
    })
})

// PUT increase-times-cooked route
router.put( '/increase-times-cooked/:id', rejectUnauthenticated, ( req, res ) => {
  const userId = req.user.id
  const idToUpdate = req.params.id

  const sqlQuery = `
    UPDATE recipes
    SET times_cooked = (times_cooked+1)
    WHERE id = $1 AND user_id = $2
  `;

  pool
    .query( sqlQuery, [ idToUpdate, userId ] )
    .then( dbRes => {
      res.sendStatus( 200 )
    })
    .catch( dbErr => {
      console.log( 'Error inside PUT increase-times-cooked:', dbErr );
      res.sendStatus( 500 )
    })
})

// DELETE recipe route
router.delete( '/:id', rejectUnauthenticated, ( req, res ) => {
  const userId = req.user.id
  const idToDelete = req.params.id

  const sqlText = `

  `;

  pool
    .query( sqlText, sqlValues )
    .then( result => {
      res.sendStatus( 200 )
    })
    .catch( dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus( 500 );
      console.log( `Error in DELETE /${ idToDelete } route:`, dbErr );
    })
}); // End DELETE recipe route

module.exports = router;