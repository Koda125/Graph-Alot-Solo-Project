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
    const queryText = `SELECT u.username as "userName", favorite_graph.values_x as "X", favorite_graph.values_y as "y"
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