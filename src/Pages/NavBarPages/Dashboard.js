import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
function Dashboard() {
    const [user, loading] = useAuthState(auth);
    const [firstname, setFirstName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "Customer"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setFirstName(data.firstname);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    debugger;
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/signup");
        fetchUserName();
    }, [user, loading]);
    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as
                <div>{firstname}</div>
                <div>{user?.email}</div>
                <button className="dashboard__btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
export default Dashboard;