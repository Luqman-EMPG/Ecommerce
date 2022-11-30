import React from "react";


export default function Card(props){

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
