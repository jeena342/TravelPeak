import React from 'react';
import {Link }from "react-router-dom";
const Navbar=()=>{
    return(
      
    <nav >
     <div >
      <ul className='btn2' >
        
          <Link className='a' aria-current="page"  to="/FinancialDetails">Financial Details</Link>
        
      
      
          <Link className='a'  to="/NewEmployee ">Add New Employee</Link>
        
      </ul>       
      
      
    </div>
  
</nav>
        
    )
}
export default Navbar;