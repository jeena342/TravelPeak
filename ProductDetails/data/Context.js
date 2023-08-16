import React,{Component} from "react";
import ProductApi from '../src/ProductApi';
import ProductList from './ProductList';

const ProductContext = React.createContext()
export default class Context extends Component{
    state={
        products:[]
    }
    componentDidMount(){
        ProductApi.getAllProduct(data=>this.setState({products:data}));
    }
    render(){
        return(
        <div><ProductContext/></div>
        )
    }
    }
