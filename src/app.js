import React from "react";
import NavBar from "../src/Components/NavBar";
import Home from "./Pages/NavBarPages/Home";
import Login from "./Pages/NavBarPages/Signin";
import Register from "./Pages/NavBarPages/SIgnup";
import ProductLists from "./Pages/ProductListing";
import Dashboard from "./Pages/NavBarPages/Dashboard";
import Cart from "./Pages/Cart/Cart"
import GetCategoriesbyID from "./Pages/ProductListing/getCategoriesbyID";
import Checkout from "./Pages/Checkout/Checkout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App(){
    return(
        <Router>
            <NavBar/>
            <Routes>
                <Route path='' element={<Home/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/products' element={<ProductLists/>}/>
                <Route path='/signin' element={<Login/>}/>
                <Route path='/signup' element={<Register/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/products/:id' element={<GetCategoriesbyID/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
            </Routes>
        </Router>
    )
}