import React, {useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from "../../firebase/firebase";
import firebase from "../../firebase/firebase";
import Myorderview from "../../Components/Myorderview";
import {useSelector} from "react-redux";

export default function MyOrders() {

    const [myorder,setMyOrder]=useState([])
    // const[products,setProducts]=useState([])
    const[customer,setCustomer]=useState([])
    // const cart = useSelector((state) => state.cart)
    const [user]=useAuthState(auth)


    useEffect(()=>{
        console.log(myorder,"MyOrder")
        if (user?.uid){
            getCustomer();

        }

    }, [user?.uid])

    const ref3 = firebase.firestore().collection("Customer");
    function getCustomer() {
        ref3
            .where("uid","==",user.uid)
            .get()
            .then((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                });
                setCustomer(items);
            });
    }

    useEffect(()=>{
        console.log(myorder,"MyOrder")
            if (user?.uid){
                getOrders();

            }

    }, [user?.uid])
    // console.log("u",user)
    // console.log(user?.uid,"user")

    const ref = firebase.firestore().collection("Orders");

    function getOrders() {

        ref
            .where("Customer_id","==",user.uid)
            .get()
            .then((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                });
                setMyOrder(items);
            });
    }
    return(
        <div>
            <h1>Orders History</h1>
            <ol>
                {myorder.map((data)=>(
                    <li className="myorder" key={data.Order_id}>
                        <p className="myordertext"><b>Order#:</b>{data.Order_id}</p>
                        <p className="myordertext">{customer.map((item)=>(
                            <p key={item.uid}><b>Customer Name:</b> {item.firstname}</p>
                        ))}</p>
                        {/*<p className="myordertext"><b>Products:</b>{data.Products[0]}</p>*/}
                        <p className="myordertext"><b>Order Amount:</b>{data.Order_Amount}</p>
                        <p className="myordertext">{customer.map((item)=>(
                            <p><b>Contact Number:</b> {item.mobilenumber}</p>
                        ))}</p>
                        <p className="myordertext"><b>Billing Address:</b>{data.Billing_Address}</p>
                        <p className="myordertext"><b>Shipping Address:</b>{data.Shipping_Address}</p>
                        <p className="myordertext"><b>Order Status:</b>{data.Order_Status}</p>
                        {/*<button onClick={OrderDetails()}>View Order</button>*/}
                            </li>
                            ))}
                        </ol>

                    </div>
    )
}