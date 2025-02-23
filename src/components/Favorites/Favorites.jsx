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
    function deleteFavorite( favoriteID ) {
        console.log('Deleting favorite item.')
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
        <>
            <h1>Favorites</h1>
            
            {favoritesList.map((item) => (
                <div key={item.id}>
                    <FavoriteCanvas item={item}/>
                    <button onClick={()=> {deleteFavorite(item.id)}}>Delete me</button>
                </div>
            ))}
        </>
    )
}
export default Favorites;