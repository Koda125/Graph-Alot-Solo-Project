const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');



const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();


router.get('/' , rejectUnauthenticated, (req, res) => {
    console.log('GET /api/favorites')
    const userID = req.user.id;
    const queryText = `SELECT u.username as "userName", favorite_graph.start_values_x as "start_x", favorite_graph.start_values_y as "start_y", favorite_graph.end_values_x as "end_x", favorite_graph.end_values_y as "end_y", favorite_graph.date_created as "date_created"
                        FROM "user" as u
                        JOIN "favorite_graph" on u.id = favorite_graph.user_id
                        WHERE u.id = $1 
                        ORDER BY favorite_graph.id ASC;`;
    pool.query(queryText, [userID])
    
    .then((results) => {
        console.log("Bork")
        res.send(results.rows);
    }).catch((error) => {
        console.log("Oops, an error occured in your GET '/'", error)
        send.status(400)
    })
})

module.exports = router;