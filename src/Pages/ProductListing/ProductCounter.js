import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import firebase from "./../../firebase/firebase";
import {AddToCart, DecreaseInCart} from "../../redux/cart";
import "../Cart/cart.css"

export default function ProductCartCounter() {
    const cart = useSelector((state) => state.cart)
    const [products, setProducts] = useState([])
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

    useEffect(()=>{
        getProductsByID(cart)
    }, [cart])


    return (
        <body>
        <div className="CartContainer">
            {products.map((item,index)=>(

                <div className="Cart-Items">
                    <div className="counter">
                        <div className="btn" onClick={()=> dispatch(AddToCart(item))}>+</div>
                        <div className="count">{cart[index].qty}</div>
                        <div className="btn" onClick={()=> dispatch(DecreaseInCart(item))}>-</div>
                    </div>
                </div>
            ))}
        </div>
        </body>
    )
}

