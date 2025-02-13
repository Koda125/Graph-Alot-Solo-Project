import useStore from "../../zustand/store";

import { useState } from "react";
import Nav from "../Nav/Nav";

function Header( ){
const logOut = useStore((state) => state.logOut);
const user = useStore((state) => state.user);

    return (
        <>
            <h1>Question Everything, Everyone...</h1>
            <div>
        {
          // User is logged in, render these links:}
          user.id && (
            <>
              <button onClick={logOut}>Log Out</button>
            </>
          )
        }
      </div>
        </>
    )
}

export default Header;