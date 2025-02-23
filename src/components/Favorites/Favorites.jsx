import { useState, useEffect } from "react";
import axios from "axios";
import FavoriteCanvas from "../FavoriteCanvas/FavoriteCanvas";

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

    

    return (
        <>
            <h1>Favorites</h1>
            
            {favoritesList.map((item) => (
                <div key={item.id}>
                    <FavoriteCanvas item={item}/>
                </div>
            ))}
        </>
    )
}
export default Favorites;