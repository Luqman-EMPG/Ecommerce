    import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth, logInWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle} from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./NavBar.modular.scss"
    import {useDispatch} from "react-redux";
    import {AddToCart} from "../../redux/cart";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    // console.log(user?.uid,"USER CHECK")
    const navigate = useNavigate();
    const dispatch=useDispatch()

    // let localcart= JSON.parse(localStorage.getItem(user?.uid)) ||[];
    // console.log(localcart,"LOCAL CART")

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
                let localcart1= JSON.parse(localStorage.getItem(user?.uid)) ||[];
                console.log(user?.uid,"USERID")
                console.log(localcart1,"Local Cart 1")
                // let pushlocal=localStorage.setItem("presist:root", JSON.stringify(localcart1))
                let pushlocal
                {localcart1.map((data)=>(
                    pushlocal=localStorage.setItem("presist:root",dispatch(AddToCart(data)))
                ))}
                console.log(pushlocal,"Local Push")
                // let localcart2= JSON.parse(localStorage.getItem("presist:root")) ||[];
                // console.log(localcart2,"Local Cart 2")

            navigate("/dashboard");
        }
    }, [user, loading]);

    return (
        <div className="login">
            <div className="login__container">

                <label>E-mail Address</label>
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <label>Password</label>
                <input
                    type="number"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <button
                    className="login__btn"
                    // onClick={() =>{ logInWithEmailAndPassword(email, password); testfunction() }}
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                    {/*{localcart.map((data)=>(*/}
                    {/*    <button*/}
                    {/*        className="login__btn"*/}
                    {/*        onClick={() => {logInWithEmailAndPassword(email, password); dispatch(AddToCart(data))}}*/}
                    {/*        // onClick={() => logInWithEmailAndPassword(email, password)}*/}
                    {/*    >*/}
                    {/*        Login*/}
                    {/*    </button>*/}
                    {/*))}*/}

                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                </button>
                <div>
                    <Link to="/reset" className="link">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register" className="link">Register</Link> now.
                </div>
            </div>
        </div>
    );
}