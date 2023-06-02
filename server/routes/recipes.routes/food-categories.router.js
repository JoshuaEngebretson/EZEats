const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const { convertUnitToSmallest, convertSmallestToLargestUsMeasurement } = require('../modules/unit-conversion');

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

module.exports = router;