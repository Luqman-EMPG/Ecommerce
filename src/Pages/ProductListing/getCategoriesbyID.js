import React, {useEffect, useState} from "react";
import firebase from "../../firebase/firebase";
import {useParams} from "react-router-dom";
import Card from "../../Components/Card";
import {AddToCart} from "../../redux/cart";
import {useDispatch} from "react-redux";
import Categories from "./GetCategories";

export default function GetCategoriesbyID(props){
    const[products,setProducts]=useState([])
    const dispatch = useDispatch()
    const {id}=useParams()

    const ref=firebase.firestore().collection("Products")
    const getProductsByCategory = async () => {
        await ref
            .where("category_id", "==", id)
            .get()
            .then((data) => {
                let items = [];
                data.forEach((doc) => {
                    items.push(doc.data());
                });

                setProducts(items);
            });
    };
    useEffect(()=>{
        getProductsByCategory()
    },[])

    return(
        <div className="row">
            <div className="col-md-2">
                <h1>Categories</h1>
                <Categories setcategory={props.setcategory}/>

            </div>
            <div className="col-md-10">
                {products.map((data)=>(
                    <div key={data.id} className="card">
                        <Card
                            img={data.image}
                            title={data.title}
                            description={data.description}
                            price={data.price}
                        />
                        <button className="card_btn" onClick={()=> dispatch(AddToCart(data))}> Add to cart</button>
                    </div>
                ))}

            </div>

        </div>
    )
}