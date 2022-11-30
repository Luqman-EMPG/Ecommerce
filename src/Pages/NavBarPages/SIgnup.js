import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../../firebase/firebase";
import "./NavBar.modular.scss"
function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();


    const register = () => {
        if (!firstName) alert("Please enter firstname");
        if (!lastName) alert("Please enter lastname");
        registerWithEmailAndPassword(firstName,lastName, email,address,phoneNumber, password,confirmPassword);
    };
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);
    return (
        <div className="register">
            <div className="register__container">
                <label>First Name</label>
                <input
                    type="text"
                    className="register__textBox"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                />
                <label>Last Name</label>
                <input
                    type="text"
                    className="register__textBox"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                />

                <label>E-mail Address</label>
                <input
                    type="text"
                    className="register__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />

                <label>Home Address</label>
                <input
                    type="text"
                    className="register__textBox"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                />

                <label>Mobile Number</label>

                <input
                    type="Number"
                    className="register__textBox"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Mobile Number"
                />

                <label>Password</label>
                <input
                    type="password"
                    className="register__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <button className="register__btn" onClick={register}>
                    Register
                </button>
                <button
                    className="register__btn register__google"
                    onClick={signInWithGoogle}
                >
                    Register with Google
                </button>
                <div>
                    Already have an account? <Link to="/signin">Login</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Register;
