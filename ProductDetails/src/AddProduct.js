import React from "react";
import {Field ,Form, Formik} from "formik";
import * as yup from "yup";
import axios from "axios";
import {useHistory,} from "react-router-dom";

let validateSchema=yup.object().shape({
  name: yup.string().min(2,"Too short!").max(50,"Too Long!").required(),
  quantity: yup.number().min(1,"Too Short!").required(),
  price: yup.number().min(2,"Too Short!").required(),
});
const AddProduct=()=>{
  const history=useHistory();
  const handleOnSubmit=(values,actions)=>{
    axios({
      method:"POST",
      url:"http://localhost:4000/products",
      data: values,
    })
    .then((response)=>{
      actions.setSubmitting(false);
      actions.resetForm();
      history.push("./products");
    })
    .catch((error)=>{
      actions.setSubmitting(false);

    });
  };
  return(
    <div>
    <h1>Add Product</h1>
    <Formik
    initialValues={{
      name:"",
      quantity:"",
      price:""
    }}
    validationSchema={validateSchema}
    onSubmit={handleOnSubmit}>
      {({errors,touched,isSubmitting})=>(
        <Form>
          <div className="form-group">
            <Field
            name="name"
            type="input"
            placeholder="Enter the product Name"
            className="form-control"
            />
            {touched.name && errors.name?(
              <small className="text-danger">{errors.name}</small>
            ):null}
            </div>
          <div className="form-group">
            <Field
            name="quantity"
            type="input"
            placeholder="Enter the quantity"
            className="form-control"
            />
            {touched.quantity && errors.quantity?(
              <small className="text-danger">{errors.quantity}</small>
            ):null}
            </div>  
          <div className="form-group">
            <Field
            name="price"
            type="number"
            placeholder="Enter the price"
            className="form-control"
            />
            {touched.price && errors.price?(
              <small className="text-danger">{errors.price}</small>
            ):null}
            </div>
         <div className="form-group">
          <button type="submit"
          value="save"
          disabled={isSubmitting}
          className="btn btn-primary">
            Submit
          </button>
         </div>
    
 
          
        </Form>
      )}
    </Formik>
    </div>
  );
};
export default AddProduct;
