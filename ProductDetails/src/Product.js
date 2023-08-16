import React,{Component} from 'react'
export default class Product extends Component{
    render(){
    return(
        <tr>{this.props.children}</tr>
    )
}
}
