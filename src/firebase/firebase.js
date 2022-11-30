import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import { initializeApp } from "firebase/app"
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC-c1ICZImqohHHIH5sMwG7cZcPwxhU4to",
    authDomain: "ecommerce-project-6147f.firebaseapp.com",
    projectId: "ecommerce-project-6147f",
    storageBucket: "ecommerce-project-6147f.appspot.com",
    messagingSenderId: "182059332377",
    appId: "1:182059332377:web:fb4ad3ac2e8dc5026a4b88"
};

firebase.initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const auth=getAuth(app)
export {db}
export default firebase;
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "Customer"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "Customer"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (firstname,lastname, email,address,mobilenumber, password,cofirmpassword) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "Customer"), {
            uid: user.uid,
            firstname,
            lastname,
            authProvider: "local",
            email,
            address,
            mobilenumber,
            password,
            cofirmpassword
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};
export {
    signInWithGoogle,
    logInWithEmailAndPassword,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    sendPasswordResetEmail,
    logout,
};