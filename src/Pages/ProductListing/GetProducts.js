import React, { useState,useEffect } from "react";
import firebase, {auth} from "./../../firebase/firebase";
import Card from "../../Components/Card";
import { useSelector, useDispatch } from "react-redux";
import {AddToCart, DecreaseInCart} from "../../redux/cart";
import "./index.modular.scss";
import {useAuthState} from "react-firebase-hooks/auth";

export default function Products(props) {
    const [products, setProducts] = useState([]);
    const[user,loadin]=useAuthState(auth)
    // const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [value, setValue] = useState(6);
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    console.log("CART",cart)

        const ShowNext = () => {
            setValue(value + 6);
            setPage(page + 1);
        };

        const ShowLess = () => {
            setValue(value - 6);
            setPage(page - 1);
        };


        const ref = firebase.firestore().collection("Products");

        const getProductsByPrice = async () => {

            await ref
                .limit(value)
                .where("price", "<=", props.max ?? 0)
                .where("price", ">=", props.min ?? 0)
                .get()
                .then((data) => {
                    let items = [];
                    data.forEach((doc) => {
                        items.push(doc.data());
                    });
                    setProducts(items);
                });

            // console.log(products, "NON Queried data");
        };

        useEffect(() => {
            getProductsByPrice();
        }, [props.max, props.min]);

        function getProducts() {
            // setLoading(true);
            ref
                .limit(value)
                .get()
                .then((querySnapshot) => {
                    const items = [];
                    querySnapshot.forEach((doc) => {
                        items.push(doc.data());
                    });
                    setProducts(items);
                    // setLoading(false);
                });
        }

        useEffect(() => {
            getProducts();
            // fetchPaginatedData();
        }, [value]);


        return (
            <div>
                {products.map((data,index) => (

                    <div className="card" key={data.id}>
                        <Card
                            img={data.image}
                            title={data.title}
                            description={data.description}
                            price={data.price}
                        />
                        <button className="card_btn" onClick={()=> dispatch(AddToCart({...data, userId: user?.uid}))}> Add to cart</button>

                        <div className="conter">
                            <div className="btn" onClick={()=> dispatch(AddToCart({...data, userId: user?.uid}))}>+</div>
                            <div className="count">{cart?.find(elem => elem.id === data.id)?.qty ?? 0}</div>
                            <div className="btn" onClick={()=> dispatch(DecreaseInCart(data))}>-</div>
                        </div>

                        {/*<div onClick={()=> dispatch(AddToCart(data))}>+</div>*/}
                        {/*<div>{cart[index]?.qty}</div>*/}
                        {/*<div onClick={()=> dispatch(DecreaseInCart(data))}>-</div>*/}
                    </div>
                ))}

                <div>
                    {page === 1 ? "" : <button className="previous" onClick={ShowLess}>PREVIOUS</button>}
                    {<button className="next" onClick={ShowNext}>Next</button>}
                </div>
            </div>
        );
    }