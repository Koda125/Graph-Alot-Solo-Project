import { useState, useEffect } from "react";
import axios from "axios";
import FavoriteCanvas from "../FavoriteCanvas/FavoriteCanvas";
import "./Favorites.css"

function Favorites( ){

    const [ favoritesList, setFavoritesList ] = useState([]);
    useEffect(() => {
        fetchFavorites()
        console.log("FavoriteList: ", favoritesList)
      }, []);
      
    function fetchFavorites() {
        console.log('Fetching favorites')
        axios({
            method: "GET",
            url: "/api/favorites"
        }).then((response) => {
            console.log("Response: ", response.data)
            setFavoritesList(response.data)
        }).catch((error) => {
            console.log("There was an error in your GET request: ", error)
            
        })
    }
    function deleteFavorite( favoriteID ) {
        console.log('Deleting favorite item.')
        console.log("FavoriteID: ", favoriteID)
        alert('Graph is being deleted. Lost forever now... ')
        axios
            .delete(`/api/favorites/${favoriteID}`)
            
            .then((response) => {
                console.log("The DELETE request was successful", response.data);
                fetchFavorites();
            }).catch((error) => {
                console.log("There was an error in your DELETE request", error)
            })
        }

    return (
        <div>
            <h1 className="favorite-header">Favorites</h1>
            
            {favoritesList.map((item, index) => (
                <div className="favorite-graph" key={index}>
                    <h2 className="favorite-header">Date Favorited: {item.date_created}</h2>
                    <div className="graph">
                        <FavoriteCanvas item={item}/>
                    </div>
                    <p>The slop of this line is: 
                        { (-1 * ((item.end_y - item.start_y) / (item.end_x - item.start_x))).toFixed(2)}
                    </p>
                    <button onClick={()=> {deleteFavorite(item.graphID)}}>Delete me</button>
                </div>
            ))}
        </div>
    )
}
//slope = (y2 - y1) / (x2 - x1)
export default Favorites;