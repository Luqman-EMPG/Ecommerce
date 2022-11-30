import React from "react";
import Categories from "../Pages/ProductListing/GetCategories";
import Products from "../Pages/ProductListing/GetProducts";
import {useState} from "react";
import "./Component.modular.scss"
import "../Pages/ProductListing/index.modular.scss"
import {Link} from "react-router-dom";


export default function Sidenav(props){

    const[trigger,setTrigger]=useState(false)

    return(
        <div>
            <h2>Filter By:</h2>
            <h3 className="category"  onClick={()=> setTrigger(!trigger)}>Categories</h3>

            {
                trigger ? <Categories setcategory={props.setcategory}/>:""
            }

            <h3>Price Range</h3>
            <label> Min </label>
            <input type="number" style={{color: "black"}} onChange={(e)=> props.setMin(parseInt(e.target.value,10))} />
            <br/>
            <label> Max</label>
            <input type="number" style={{color: "black"}} onChange={(e)=> props.setMax(parseInt(e.target.value,10))} />

            <button className="clearfilter" onClick={<Products/>}>Clear Filter</button>


        </div>
    )
}