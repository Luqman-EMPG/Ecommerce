import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import firebase, {auth} from "./../../firebase/firebase";
import {ResetCart} from "../../redux/cart";
import "../Cart/cart.css"
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";

export default function Cart() {
    const cart = useSelector((state) => state.cart)
    const [products, setProducts] = useState([])
    const[total,setTotal]=useState(0)
    const [user, loading, error] = useAuthState(auth);
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

    // console.log(products,"PRODUCTS")
    useEffect(()=>{
        CalculateTotal();
    },[products])

    useEffect(()=>{
        getProductsByID(cart)
    }, [cart])


    return (
        <body>
        <div className="CartContainer">
               {products.map((item,index)=>(

                   <div className="Cart-Items">
                       <img className="image-box" src={item.image} alt={item.title}/>
                   <div className="about">
                       <h2 className="title">{item.title}</h2>
                       <p className="subititle">{item.description}</p>
                   </div>
                       <div className="counter">
                           <div className="btn">+</div>
                           <div className="count">{cart[index].qty}</div>
                           <div className="btn">-</div>
                       </div>
                       <div className="pricess">
                           <h3 className="amount">{item.price * cart[index].qty}</h3>
                       </div>
                   </div>
               ))}
            <div className="checkout">
                <div className="total">
                    <>
                        <div className="Subtotal">Subtotal</div>
                    </>
                    <div className="total-amount">{total} </div>
                </div>
            </div>
            <button onClick={()=>{
                navigate("/checkout")
            }} className="button">Checkout</button>
        </div>

        <button onClick={()=>dispatch(ResetCart())}>Clear Cart</button>
        </body>
            )
}

