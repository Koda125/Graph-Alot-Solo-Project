import { useState, useEffect } from "react";
import axios from "axios";

function Favorites( ){

    const [ favoritesList, setFavoritesList ] = useState([]);
    useEffect(() => {
        fetchFavorites()
        console.log("FavoriteList: ", favoritesList)
      }, []);

    function fetchFavorites() {
        console.log('Fetching favorites')
        axios.get("/api/favorites")
        .then((response) => {
            console.log("Response: ", response.data)
            setFavoritesList(response.data)
        }).catch((error) => {
            console.log("There was an error in your GET request: ", error)
            
        })
    }

    

    return (
        <h1>Favorites</h1>
    )
}
export default Favorites;