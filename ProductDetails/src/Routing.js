import React from "react";
import AddProduct from "./AddProduct";
import AllProductPage from "./AllProductPage";
import About from './About';
import ProductDetails from "./ProductDetails";
import{
    BrowserRouter as Router,
    Switch,
    Route
    
}from 'react-router-dom'

export default function Routing(){
    return(
        <Router>
            <div>
                <a className='links' href='/'>About</a>
                &nbsp;&nbsp;
                <a className='links' href="/products">Product</a>
                 <Switch>
                    <Route exact path='/' component={About}></Route>
                    <Route path="/products" component={AllProductPage}></Route>
                    <Route path='/addProduct' component={AddProduct}></Route>
                    <Route Path='/productdeails/:id' component={ProductDetails}></Route>
                 </Switch>
            </div>
        </Router>
    )
}