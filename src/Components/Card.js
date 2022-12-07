import React from "react";
import {AddToCart} from "../redux/cart";
import {useDispatch, useSelector} from "react-redux";

export default function Card(props){
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    return(
        <div style={{textAlign: "center"}}>
            <div>
                <img className="card_image" src={props.img}/>
                <h2 className="card_title"> {props.title}</h2>
                <p className="card_desc">{props.description}</p>
                <h3 className="card_price">Rs. {props.price}</h3>
            </div>

        </div>
    )
}
