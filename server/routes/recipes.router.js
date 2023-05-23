const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET all recipes route
router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id
  console.log('inside GET recipes for userID =', userId);

  // Show all recipes for the current user
  const sqlText = `
    SELECT 
      recipes.recipe_name AS recipe,
      recipes.image_of_recipe,
      recipes.recipe_text,
      JSON_AGG(recipe_ingredients.quantity) AS quantities,
      JSON_AGG(recipe_ingredients.unit) AS units,
      JSON_AGG(ingredients.ingredient_name) AS ingredients,
      JSON_AGG(recipe_ingredients.method) AS methods,
      category.name AS category,
      JSON_AGG(food_categories.food_category_name) AS food_categories,
      JSON_AGG(recipe_ingredients.for_which_part) AS for_which_parts
    FROM recipes
    JOIN "user" ON recipes.user_id="user".id
    JOIN recipe_ingredients ON recipe_ingredients.recipe_id=recipes.id
    JOIN ingredients ON ingredients.id=recipe_ingredients.ingredients_id
    JOIN category ON category.id=recipes.category_id
    JOIN food_categories on food_categories.id = ingredients.food_category_id
      WHERE "user".id = $1
    GROUP BY
      recipes.recipe_name, recipes.image_of_recipe,
      recipes.recipe_text, category.name;
  `;

  pool
    .query(sqlText, [userId])
    .then(result => {
      const recipes = result.rows
      // Format the recipes
      let formattedRecipes = []
      recipes.map(recipe => {
        // Format the ingredients within the recipes
        let ingredients = []
        for (let i = 0; i < recipe.quantities.length; i++) {
          let currentIngredient = {
            quantity: recipe.quantities[i],
            unit: recipe.units[i],
            ingredient: recipe.ingredients[i],
            method: recipe.methods[i],
            foodCategory: recipe.food_categories[i],
            forWhichPart: recipe.for_which_parts[i]
          }
          // Once formatted, add to the ingredient to the
          //  ingredients array
          ingredients.push(currentIngredient)
        }
        let formattedRecipe = {
          name:recipe.recipe,
          image: recipe.image_of_recipe,
          recipeText: recipe.recipe_text,
          ingredients: ingredients,
          category: recipe.category
        }
        // Once the recipe has been formatted, add to the
        //  formattedRecipes array
        formattedRecipes.push(formattedRecipe)
      })
      // Send the formattedRecipes array
      res.send(formattedRecipes)
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
