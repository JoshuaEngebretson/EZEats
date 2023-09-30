const express = require("express");
const pool = require("../modules/pool");
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const {
	convertUnitToSmallest,
	convertSmallestToLargestUsMeasurement,
} = require("../modules/unit-conversion");

// GET times-cooked recipes route (GETS top 5)
router.get("/times-cooked", rejectUnauthenticated, (req, res) => {
	const userId = req.user.id;
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

	pool.query(sqlQuery, [userId])
		.then((result) => {
			let mostCooked = result.rows;
			res.send(mostCooked);
		})
		.catch((dbErr) => {
			// If unable to process request,
			// send "Internal Server Error" message to client
			res.sendStatus(500);
			console.log("Error inside GET /most-cooked:", dbErr);
		});
}); // End GET most cooked recipes route

// PUT times-cooked route
router.put("/times-cooked/:id", rejectUnauthenticated, (req, res) => {
	const userId = req.user.id;
	const idToUpdate = req.params.id;

	const sqlQuery = `
    UPDATE recipes
    SET times_cooked = (times_cooked+1)
    WHERE id = $1 AND user_id = $2
  `;

	pool.query(sqlQuery, [idToUpdate, userId])
		.then((dbRes) => {
			res.sendStatus(200);
		})
		.catch((dbErr) => {
			console.log(
				"Error inside PUT increase-times-cooked:",
				dbErr
			);
			res.sendStatus(500);
		});
});

module.exports = router;
