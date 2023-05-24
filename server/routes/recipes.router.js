const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET all recipes route
router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  /*
    Show all recipes for the current user
    These have been formatted to be an array of objects that have 
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
          'recipeIngredientId', recipe_ingredients.id, 'quantity', recipe_ingredients.quantity, 'unit', recipe_ingredients.unit,
          'ingredient', ingredients.ingredient_name, 'method', recipe_ingredients.method,
          'foodCategory', food_categories.food_category_name, 'forWhichPart', recipe_ingredients.for_which_part
        )
      ) AS ingredients,
      category.name AS category
    FROM recipes
    JOIN "user" ON recipes.user_id="user".id
    JOIN recipe_ingredients ON recipe_ingredients.recipe_id=recipes.id
    JOIN ingredients ON ingredients.id=recipe_ingredients.ingredients_id
    JOIN category ON category.id=recipes.category_id
    JOIN food_categories ON food_categories.id = ingredients.food_category_id
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
  const sqlQuery = `
    SELECT
      id,
      recipe_name AS name,
      image_of_recipe AS image,
      user_id
    FROM recipes
    WHERE user_id = $1
    ORDER BY times_cooked DESC, recipe_name
    LIMIT 5;
  `;

  console.log('**********');
  console.log('userId:', userId);
  console.log('**********');



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
      console.log('Error inside GET /most-cooked');
    })
  
}) // End GET most cooked recipes route

// GET specific recipe route
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  const recipeID = req.params.id

  const sqlText = `
    SELECT 
      recipes.id AS id,
      recipes.recipe_name AS name,
      recipes.image_of_recipe AS image,
      recipes.recipe_text,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'recipeIngredientId', recipe_ingredients.id, 'quantity', recipe_ingredients.quantity, 'unit', recipe_ingredients.unit,
          'ingredient', ingredients.ingredient_name, 'method', recipe_ingredients.method,
          'foodCategory', food_categories.food_category_name, 'forWhichPart', recipe_ingredients.for_which_part
        )
      ) AS ingredients,
      category.name AS category
    FROM recipes
    JOIN "user" ON recipes.user_id="user".id
    JOIN recipe_ingredients ON recipe_ingredients.recipe_id=recipes.id
    JOIN ingredients ON ingredients.id=recipe_ingredients.ingredients_id
    JOIN category ON category.id=recipes.category_id
    JOIN food_categories ON food_categories.id = ingredients.food_category_id
      WHERE "user".id = $1 AND recipes.id = $2
    GROUP BY
      recipes.id, recipes.recipe_name, recipes.image_of_recipe,
      recipes.recipe_text, category.name;
  `;

  pool
  .query(sqlText, [userId, recipeID])
  .then(result => {
    const recipe = result.rows[0]
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
          `
        }
        else {
          newRecipeIngredientQuery=`
            INSERT INTO recipe_ingredients
              (quantity, unit, ingredients_id, method, recipe_id)
            VALUES ($1, $2, $3, $4, $5);
          `
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
