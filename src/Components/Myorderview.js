import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import firebase from "../firebase/firebase";
import "../../src/Pages/Cart/cart.css"

export default function Myorderview() {
    const cart = useSelector((state) => state.cart)
    const [products, setProducts] = useState([])
    const[total,setTotal]=useState(0)


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
                    <img className="image-box" src={item.image} alt={item.title}/>
                    <div className="about">
                        <h2 className="title">{item.title}</h2>
                        <p className="subititle">{item.description}</p>
                    </div>
                    <div className="counter">
                        <div className="count">{cart[index].qty}</div>
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
        </div>
        </body>
    )
}

