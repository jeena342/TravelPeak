import React,{Component} from 'react'
import ProductApi from "./ProductApi";
import ProductList from './ProductList';
export default class AllProductPage extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[]
        };
  
        }
        componentDidMount(){
            ProductApi.getAllProduct(data=>this.setState({products:data}));
        }
        render(){
            return(
            <>
                <h1>Products List</h1>
                <ProductList products={this.state.products}></ProductList>
                </>
            );
        }
    }
