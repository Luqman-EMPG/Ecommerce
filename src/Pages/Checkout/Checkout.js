import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from "../../firebase/firebase";
import firebase from "../../firebase/firebase";
import "./checkout.css"
import {addDoc, collection} from "firebase/firestore";
import {ResetCart} from "../../redux/cart";
import { v4 as uuidv4 } from 'uuid';


export default function Checkout(){
    const cart = useSelector((state) => state.cart)
    const items=cart.length;
    console.log(items,"COUNT")

    // for(let i=0;i<items;i++){
    //     console.log(cart[i])
    // }

    const [user, loading] = useAuthState(auth);
      console.log(user?.uid,"DATA")
    const[orders,setOrders]=useState([])
    const [products, setProducts] = useState([])
    const[billingaddress,setBillingAddress]=useState("")
    const[shippingaddress,setShippingAddress]=useState("")
    const [paymentmethod,setPaymentMethod]=useState("")
    const[total,setTotal]=useState(0)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const ref = firebase.firestore().collection("Products");
    const getProductsByID = (data) => {
        let array = []
        data.map((value)=> {
            ref
                .where("id", "in", [value.id])
                .get()
                .then((data) => {
                    data.forEach((doc) => {
                        array.push(doc.data());
                    });
                    setProducts(array);
                });
            console.log(value.id)
        })

    }

    const CalculateTotal=()=>{
        let x=0;
        products.forEach((items,index)=>{
            x=items.price * cart[index].qty + x
            console.log(items.price,"item price",cart[index].qty,"cart",index,"index")
        })
        setTotal(x)
    }
    var date = new Date();
    var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    var date_time = current_date+" "+current_time;

    const Orders = async () => {
        const orderId = `${uuidv4()}`
        try {
            for(let i=0;i<items;i++){
                await addDoc(collection(db,"Line Items"),{
                    Order_id:orderId,
                    line_item:cart[i],
                })
            }

            await addDoc(collection(db, "Orders"), {
                Customer_id: user.uid,
                order_date_time: date_time,
                Order_Amount: total,
                Billing_Address:billingaddress,
                Shipping_Address:shippingaddress,
                Payment_Method:paymentmethod,
                // newOrd_id:res.id,
                id: orderId,
                Order_Status:""
            });
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };
    const Payments = async () => {
        try {
            await addDoc(collection(db, "Payment Details"), {
                id: `${uuidv4()}`,
                Customer_id: user.uid,
                Payment_Method:paymentmethod,

            });
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const LineItems=async () => {
        try {
            await addDoc(collection(db,"Line Items"),{
                    id: `${uuidv4()}`,
                    Products:cart,
                });
        }
        catch (err){

        }
    }
    // const ref2 = firebase.firestore().collection("Orders");
    // useEffect(()=>{
    //
    //     async function getOrders() {
    //         const markers = [];
    //         await firebase.firestore().collection('Orders').get()
    //             .then(querySnapshot => {
    //                 querySnapshot.docs.forEach(doc => {
    //                     markers.push(doc.data());
    //                 });
    //             });
    //             ref2
    //                 .get()
    //                 .then((querySnapshot) => {
    //                     const items = [];
    //                     querySnapshot.forEach((doc) => {
    //                         items.push(doc.data());
    //                     });
    //                     setOrders(items);
    //                 });
    //     }
    //     getOrders()
    // },[ref2])

    useEffect(()=>{
        CalculateTotal();
    },[products])

    useEffect(()=>{
        getProductsByID(cart)
    }, [cart])

    const functions=()=>{
        if(!user){
            navigate("/signin")
            alert("Login or create a new account to proceed")
        }
        else{
            Orders();
            Payments();
            LineItems();
            dispatch(ResetCart());
            alert("Your order has been placed")
            navigate('/myorders')
        }

    }

    return(
        <div className="container">
            <div className="window">
                <div className="order-info">
                    <div className="order-info-content">
                        <h1>Order Summary</h1>
                        <div className="line"></div>
                            {products.map((item,index)=>(
                                <table className="order-table">
                                    <tbody>
                                    <tr>
                                        <td><img className="full-width" src={item.image}/></td>
                                        <td>
                                            <br/><span className="thin">{item.title}</span>
                                            <br/><span className="thinsmall">{cart[index].qty}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="price"> {item.price * cart[index].qty} </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            ))}
                        <div className="line"></div>
                        <div className="total">
                            <span>
                                <div className='thin dense'>Delivery</div>
                                TOTAL
                            </span>
                            <span>
            <div className='thin dense'>0</div>
                                {total}
          </span>


                        </div>

                    </div>

                </div>
                <div className="credit-info">
                    <div className="credit-info-content">
                        <h2>
                            <i className="far fa-credit-card"></i> Payment Information
                        </h2>
                        <label>Shipping Address</label>
                        <input
                            type="text"
                            // className="register__textBox"
                            value={shippingaddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            placeholder="Shipping Address"
                        />
                        <label>Billing Address</label>
                        <input
                            type="text"
                            // className="register__textBox"
                            value={billingaddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                            placeholder="Billing Address"
                        />
                        <h2>
                            <i className="far fa-credit-card"></i> Payment Method
                        </h2>

                        <label>
                            <input
                                type="checkbox"
                                value={paymentmethod}
                                onClick={(e) => setPaymentMethod(e.target.value)}
                                />
                            CASH ON DELIVERY (COD)

                        </label>

                        <button onClick={functions}>SUBMIT</button>
                        <button onClick={()=>{
                            navigate("/cart")
                        }} >BACK TO CART</button>


                    </div>

                </div>

            </div>

        </div>
    )
}