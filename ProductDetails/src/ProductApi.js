import axios from "axios";

export default class ProductApi{
    static getAllProduct(p){
        axios.get('http://localhost:4000/products')
        .then(response=>p(response.data))
        .catch(error=>{throw error});
    }
}