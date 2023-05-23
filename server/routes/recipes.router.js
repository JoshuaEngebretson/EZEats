const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET all recipes route
router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id

  const sqlText = `
  
  `;

  pool
    .query(sqlText, sqlValues)
    .then(() => {
      const recipes = req.rows
      res.send(recipes)
    })
    .catch(dbErr => {
      // If unable to process request,
      // send "Internal Server Error" message to client
      res.sendStatus(500);
      console.log('Error in GET all route:', dbErr);
    })
}); // End GET all recipes route

// POST new recipe route
router.post('/new-recipe', rejectUnauthenticated, (req, res) => {
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
      
      // Now loop through the ingredients array and add an ingredient
      //  to the recipe_ingredients table for each item of the array
      //  all while referencing the createdRecipeId
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
