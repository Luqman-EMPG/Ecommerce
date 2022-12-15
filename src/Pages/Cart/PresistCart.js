import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import firebase, {auth} from "../../firebase/firebase";
import {AddToCart, ResetCart,DecreaseInCart} from "../../redux/cart";
import "./cart.css"
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";

export default function PresistCart() {

    const [products, setProducts] = useState([])
    // const [localcart,setLocalCart]=useState([])
    const[total,setTotal]=useState(0)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [user, loading] = useAuthState(auth);
    const userId = user?.uid;


    let localcart= JSON.parse(localStorage.getItem(user?.uid)) ||[];
    console.log(localcart,"LOCAL CART")

    const ref = firebase.firestore().collection("Products");
    const getPresistCartByID = (data) => {
        let array = []
        data.map((value)=> {
            ref
                .where("id", "in", [value.id])
                .get()
                .then((data) => {
                    console.log(value.id)
                    data.forEach((doc) => {
                        console.log(doc.data())
                        array.push(doc.data());
                    });
                    setProducts(array);
                });
        })
    }

    const CalculateTotal=()=>{
        let x=0;
        products.forEach((items,index)=>{
            x=items.price * localcart[index].qty + x
            // console.log(items.price,"item price",cart[index].qty,"cart",index,"index")
        })
        setTotal(x)
    }

    useEffect(()=>{
        CalculateTotal();
    },[products])

    useEffect(()=>{
        getPresistCartByID(localcart)
    }, [])


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
                        <div className="btn" onClick={()=> dispatch(AddToCart(item))}>+</div>
                        <div className="count">{localcart[index]?.qty}</div>
                        {/*<div className="count">{cart?.[0]?.[item.id] ?? 0}</div>*/}
                        <div className="btn" onClick={()=> dispatch(DecreaseInCart(item))}>-</div>
                    </div>
                    <div className="pricess">
                        <h3 className="amount">{item.price * localcart[index].qty}</h3>
                        {/*<h3 className="amount">{item.price * cart?.[0]?.[item.id] ?? 0}</h3>*/}
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

