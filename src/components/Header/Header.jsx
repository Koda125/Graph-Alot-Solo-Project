import useStore from "../../zustand/store";
import "./Header.css"
import { useState } from "react";
import Nav from "../Nav/Nav";

function Header( ){
const logOut = useStore((state) => state.logOut);
const user = useStore((state) => state.user);

    return (
        <>
            <h1 className="header">Graph A Lot</h1>
            <div>
        {
          // User is logged in, render these links:}
          user.id && (
            <div className="log-out-button">
              <button onClick={logOut}>Log Out</button>
            </div>
          )
        }
      </div>
        </>
    )
}

export default Header;