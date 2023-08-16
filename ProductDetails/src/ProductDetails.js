import React,{useEffect,useState} from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';

const ProductDetails=()=>{
    const [product, setUser]= useState({
        id:"",
        name:"",
        quantity:"",
        price:""

    })

    const { id }= useParams();
    useEffect(()=>{   
         fetchProductDetail();
   })

    useEffect(()=>{
        fetchProductDetail();
        
    },[setUser])
    const fetchProductDetail=async()=>{
        const res = await axios.get(`http://localhost:4000/products/${id}`);
        setUser(res.data);
    }
    
    return(
        <div>
            <h2>Product Details</h2>
           <h2>Product name: {product.name}</h2>
            <a href="/products">Back</a>
        </div>
    );
    
 }
export default ProductDetails;