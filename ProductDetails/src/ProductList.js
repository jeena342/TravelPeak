import React,{ Component } from "react";
import {Link,Prompt, withRouter} from "react-router-dom";
import Product from "./Product";

class ProductList extends Component{
    constructor(props){
        super(props);
        this.state={
            isBlocking: false,
        };
    }
    
    render(){
        var productsItems = this.props.products.map((p)=>(
           <Product key={p.id}>
                 <Link 

                style={{borderStyle: "none", display: "contents"}}
                to={`./productdetails/${p.id}`}
                onClick={()=>{
                    this.setState({isBlocking:true});
                    // const cofirmbox=window.confirm("Are you sure want to view details?")
                    
                }}
              
                >
        <Prompt
            when={!this.state.isBlocking}
            
            message="Are you sure want to view details"/>
              <>  <td>{p.id}</td>
                <td>{p.name}</td></>

                </Link>
                <td>{p.quantity}</td>
                <td>{p.price}</td>
                </Product>
        
        ));
        return(
         <>   
          
         <>   <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{productsItems}</tbody>
            </table></>

             
            <a href="/addProduct"><button>Add Product</button></a>
            </>
        
        
        );
    }
}
export default withRouter(ProductList);