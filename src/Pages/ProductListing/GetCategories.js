import React, {useEffect} from "react";
import {useState} from "react";
import firebase from './../../firebase/firebase'
import "./index.modular.scss"
import { useNavigate} from "react-router-dom";


export default function Categories(props){
    const[categories,setCategories]=useState([])
    const[loading,setLoading]=useState(false);
    const[indicator,setIndicator]=useState("")
    const navigate=useNavigate()

    const ref2=firebase.firestore().collection("Product Categories")
    function getCategories(){
        setLoading(true)
        ref2.onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setCategories(items)
            setLoading(false)
        })
    }

    useEffect(()=>{
        getCategories()
    })
    return(
        <div>
            {categories.map((category)=>(
                <div className={indicator===category.title?"category-background":""}>
                    <link  to={`/products/category?id=${category.id}`}
                        onClick={()=> {
                        setIndicator(category.title)
                        props.setcategory(category)
                        // navigate(`/products/category?id=${category.id}`)
                    }  } >{category.title}</link>
                </div>
            ))}

        </div>
    )

}