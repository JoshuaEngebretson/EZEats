const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const { convertUnitToSmallest, convertSmallestToLargestUsMeasurement } = require('../modules/unit-conversion');

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

module.exports = router;