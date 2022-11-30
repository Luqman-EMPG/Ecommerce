import React from 'react';
import {Link} from "react-router-dom";

export default function NavBar(){
    return(

<nav className="Nav">
        <div className="bars"></div>
        <div className="Navmenu">
            <div>
                <Link className="Navlink" to="/home">Home</Link>
                <Link className="Navlink" to="/products">Products</Link>
                <Link className="Navlink"  to="/signup">SignUp</Link>

            </div>
        </div>
    <Link className="navbutton" to="/signin"><button>Sign In</button></Link>
    <Link className="navbutton" to="/cart"><button>Cart</button></Link>

</nav>
    )
}
