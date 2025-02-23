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
    const queryText = `SELECT u.username as "userName", favorite_graph.start_values_x as "start_x", favorite_graph.start_values_y as "start_y", favorite_graph.end_values_x as "end_x", favorite_graph.end_values_y as "end_y", favorite_graph.date_created as "date_created", favorite_graph.user_id as "UserID"
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

router.post('/', rejectUnauthenticated,(req, res) => {
    const {
        start_values_x,
        start_values_y,
        user_id,
        end_values_x,
        end_values_y
    } = req.body
    const queryText = `INSERT INTO favorite_graph ( start_values_x, start_values_y, user_id, end_values_x, end_values_y)
VALUES ( $1, $2, $3 ,$4, $5 );`;
pool.query(queryText, [start_values_x, start_values_y, user_id, end_values_x, end_values_y]).then((results) => {
    console.log("POST in favorites router successful")
    res.sendStatus(201)
}).catch((error) =>{
    console.log("Error in favorites POST router", error)
})
} )

router.delete('/:id', rejectUnauthenticated, (req, res) =>{
    const favoriteID = req.params.id;
    const userID = req.user.id
    const queryText= `DELETE FROM favorite_graph WHERE favorite_graph.id=$1 
                        AND favorite_graph.user_id =$2;`;
    pool.query(queryText, [favoriteID, userID]).then((results) => {
        console.log("The DELETE Request was successful.")
        res.sendStatus(204)
    }).catch((error) => {
        console.log("An error has occured in your DELETE request: ", error)
        res.sendStatus(500);
    })
} )


module.exports = router;