import React from 'react';
import {Link} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../firebase/firebase";

export default function NavBar(){
    const [user, loading] = useAuthState(auth);

    if(!user){
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
                <Link className="navbutton" to="/presistcart"><button>Presist Cart</button></Link>

            </nav>
        )

    }
    else{
        return(

            <nav className="Nav">
                <div className="bars"></div>
                <div className="Navmenu">
                    <div>
                        <Link className="Navlink" to="/home">Home</Link>
                        <Link className="Navlink" to="/products">Products</Link>
                        <Link className="Navlink"  to="/dashboard">Profile</Link>
                        <Link className="Navlink"  to="/myorders">My Orders</Link>

                    </div>
                </div>
                <Link className="navbutton" to="/cart"><button>Cart</button></Link>
                <Link className="navbutton" to="/presistcart"><button>Presist Cart</button></Link>

            </nav>
        )
    }

}
