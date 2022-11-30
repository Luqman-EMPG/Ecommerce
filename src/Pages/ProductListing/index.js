import React, {useState} from "react";
import Products from "./GetProducts";
import Sidenav from "../../Components/sidenav";

export default function ProductLists(){

    const[min,setMin]=useState(0)
    const[max,setMax]=useState(9999999999999999999999999)
    const[category,setCategory]=useState({})


    return (


        <div className="row">
        <div className="col-md-2" >
            <Sidenav setcategory={setCategory} setMax={setMax} setMin={setMin} />

        </div>
            <div className="col-md-8">
                <Products category={category} max={max} min={min}/>
            </div>
        </div>

            )
}

