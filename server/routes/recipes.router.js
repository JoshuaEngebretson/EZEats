const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const {convertUnitToSmallest, convertSmallestToLargestUsMeasurement} = require('../modules/unit-conversion');

// GET all recipes route
router.get('/', rejectUnauthenticated, (req, res) => {
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
    .query(sqlText, [userId])
    .then(result => {
      const recipes = result.rows
      res.send(recipes)
    })
    .catch(dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus(500);
      console.log('Error in GET all route:', dbErr);
    })
}); // End GET all recipes route

// GET recipe categories route
router.get('/recipe-categories', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `SELECT * FROM category;`
  pool
    .query(sqlQuery)
    .then(result => {
      let recipeCategories = result.rows
      res.send(recipeCategories)
    })
    .catch(dbErr => {
      console.log('Error inside GET /recipe-categories:', dbErr);
      res.sendStatus(500)
    })
}) // End Get recipe categories route

// GET most cooked recipes route
router.get('/most-cooked', rejectUnauthenticated, (req, res) => {
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
    .query(sqlQuery, [userId])
    .then(result => {
      let mostCooked = result.rows
      res.send(mostCooked)
    })
    .catch(dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus(500);
      console.log('Error inside GET /most-cooked:', dbErr);
    })
  
}) // End GET most cooked recipes route

router.get('/shopping-list', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  const shoppingListCardsQuery = `
  SELECT
    recipes.id,
    recipes.recipe_name AS name,
    recipes.image_of_recipe AS image,
    recipes.user_id,
    category.name AS category
  FROM recipes
  JOIN category ON category.id=recipes.category_id
  WHERE user_id = $1 AND recipes.on_menu > 0
  ORDER BY times_cooked DESC, recipe_name, category.name;
  `;

  pool
    .query(shoppingListCardsQuery,[userId])
    .then(result => {
      const shoppingList = result.rows
      const shoppingListIngredientsQuery = `
      SELECT
        JSON_BUILD_OBJECT(
          'ingredient', ingredients.ingredient_name,
          'multipliedQuantity', (recipe_ingredients.quantity*recipes.on_menu),
          'conversionCategory', units_of_measurement.conversion_category,
          'originalUnits', units_of_measurement.unit,
          'multipliedConvertedQuantity', (recipe_ingredients.converted_quantity*recipes.on_menu),
          'foodCategory', food_categories.food_category_name,
          'recipeIngredientId', recipe_ingredients.id 
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
        units_of_measurement.id, food_categories.food_category_name, recipe_ingredients.id;
      `;
      pool.query(shoppingListIngredientsQuery, [userId])
      .then(result => {
        let unformattedIngredients = result.rows
        const combinedIngredients = unformattedIngredients.reduce((result, item) => {
          const {
            ingredient,
            multipliedQuantity,
            multipliedConvertedQuantity, 
            conversionCategory,
            originalUnits
          } = item.ingredients;
          let key;
          if (conversionCategory === 'other'){
            key = `${ingredient}_${originalUnits}`
          } else {
            key = `${ingredient}_${conversionCategory}`;
          }
          if (result[key]) {
            result[key].multipliedConvertedQuantity += multipliedConvertedQuantity;
          } else {
            result[key] = {
              ...item.ingredients
            };
          }
          return result;
        }, []);
        console.log('combinedIngredients:',combinedIngredients);

        let list ={
          shoppingList,
          unformattedIngredients
        }
        res.send(list)
      })
    })
    .catch(dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus(500);
      console.log('Error in GET shoppingList route:', dbErr);
    })
})

// GET specific recipe route
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  const recipeID = req.params.id
  /*
    Show this recipe for if the current user is associated
    this has been formatted to be an array of objects that have 
    the following formatting
    [
      {
        id: number,
        name: string,
        image: string,
        recipe_text: string,
        ingredients: array of objects [
          {
            recipeIngredientId: number,
            quantity: number,
            unit: string,
            ingredient: string,
            method: string,
            foodCategory: string,
            forWhichPart: string
          }
        ],
        category: string
      }
    ]
  */
  const sqlText = `
    SELECT 
      recipes.id AS id,
      recipes.recipe_name AS name,
      recipes.image_of_recipe AS image,
      recipes.recipe_text,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'recipeIngredientId', recipe_ingredients.id, 'quantity', recipe_ingredients.quantity, 'unit', units_of_measurement.unit,
          'ingredient', ingredients.ingredient_name, 'method', recipe_ingredients.method,
          'foodCategory', food_categories.food_category_name, 'forWhichPart', recipe_ingredients.for_which_part
        )
      ) AS ingredients,
      recipes.on_menu,
      recipes.times_cooked,
      category.name AS category,
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
      recipes.times_cooked;
  `;

  pool
  .query(sqlText, [userId, recipeID])
  .then(result => {
    const recipe = result.rows
    res.send(recipe)
  })
  .catch(dbErr => {
    // If unable to process request,
    // send "Internal Server Error" message to client
    res.sendStatus(500);
    console.log('Error in GET specific recipe route:', dbErr);
  })
}) // End Get specific recipe route

// POST new recipe route
router.post('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  const newRecipe = req.body
  const ingredients = newRecipe.ingredients

  const newRecipeNameQuery = `
  INSERT INTO recipes
  (recipe_name, recipe_text, image_of_recipe, user_id, category_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id;
  `;

  const newRecipeNameValues = [
    newRecipe.name,
    newRecipe.recipe_text,
    newRecipe.image_of_recipe,
    userId,
    newRecipe.category_id
  ]

  // FIRST QUERY MAKES THE RECIPE
  pool
    .query(newRecipeNameQuery, newRecipeNameValues)
    .then(result => {
      const createdRecipeId = result.rows[0].id
      
      /* 
        Now loop through the ingredients array and add an ingredient
        to the recipe_ingredients table for each item of the array
        all while referencing the createdRecipeId
      */
      ingredients.map(ingredient => {
        let newRecipeIngredientQuery;
        if (ingredient.for_which_part) {
          newRecipeIngredientQuery= `
            INSERT INTO recipe_ingredients
              (quantity, unit, ingredients_id, method, recipe_id, for_which_part)
            VALUES ($1, $2, $3, $4, $5, $6);
          `;
        }
        else {
          newRecipeIngredientQuery=`
            INSERT INTO recipe_ingredients
              (quantity, unit, ingredients_id, method, recipe_id)
            VALUES ($1, $2, $3, $4, $5);
          `;
        }
        const newRecipeIngredientValues = [
          ingredient.quantity,
          ingredient.unit,
          ingredient.ingredients_id,
          ingredient.method,
          createdRecipeId,
          // If for_which_part exists, add it to the array, otherwise it
          //  should be left off
          ... ingredient.for_which_part ? [ingredient.for_which_part] : [] 
        ];

        // Nth Query ADDS AN INGREDIENT FOR THAT NEW RECIPE
        pool
          .query(newRecipeIngredientQuery, newRecipeIngredientValues)
          .catch(error => {
            // Catch for Nth query
            console.log(
              `Error while adding an ingredient to the recipe_ingredients table:`,
              error
            );
            res.sendStatus(500);
          })
      }) // End ingredients.map

      // Now that all portions of adding a recipe are completed, send the
      // "Created" status 
      res.sendStatus(201)
    })
    .catch(dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus(500);
      console.log('Error in POST /new-recipe route:', dbErr);
    })
}); // End POST new recipe route

// PUT recipe route
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  const idToUpdate = req.params.id

  const sqlText = `

  `;

  pool
    .query(sqlText, sqlValues)
    .then(() => {
      res.sendStatus(201)
    })
    .catch(dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus(500);
      console.log(`Error in PUT /${idToUpdate} route:`, dbErr);
    })
}); // End PUT recipe route

// PUT adjust-on-menu route
router.put('/adjust-on-menu/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  const idToUpdate = req.params.id
  const adjustment = req.body.adjustment
  console.log('req.body inside adjust-on-menu/:id:', req.body);

  let sqlQuery;

  if (adjustment === 'increaseNumber') {
    sqlQuery = `
      UPDATE recipes
        SET on_menu = (on_menu+1)
        WHERE id = $1 AND user_id = $2;
    `;
  } else if (adjustment === 'decreaseNumber') {
    sqlQuery = `
      UPDATE recipes
        SET on_menu = (on_menu-1)
        WHERE id = $1 AND user_id = $2;
    `;
  }

  pool
    .query(sqlQuery, [idToUpdate, userId])
    .then(dbRes => {
      res.sendStatus(200)
    })
    .catch(dbErr => {
      console.log('Error inside PUT adjust-on-menu:', dbErr);
      res.sendStatus(500)
    })
})

// DELETE recipe route
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  const idToDelete = req.params.id

  const sqlText = `

  `;

  pool
    .query(sqlText, sqlValues)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus(500);
      console.log(`Error in DELETE /${idToDelete} route:`, dbErr);
    })
}); // End DELETE recipe route

module.exports = router;