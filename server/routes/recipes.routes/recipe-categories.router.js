const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const { convertUnitToSmallest, convertSmallestToLargestUsMeasurement } = require('../modules/unit-conversion');

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

module.exports = router;