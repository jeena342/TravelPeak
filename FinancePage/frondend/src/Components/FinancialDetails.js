import React ,{useEffect,useState} from 'react'
import axios from 'axios'
export const FinancialDetails = () => {
 
   const [data, setData] = useState([]);
     
      useEffect(() => {
        const details=async ()=>{
            const response= await axios.get("http://localhost:9000/age/");
            setData(response.data);
            console.log(response.data);
        
        }
    details();
    },[]);
             
      return (
        <>
        <div  >
        <table>
            <thead >
                <tr className='th'>
                    <th> Experience</th>
                    <th> Id </th>
                    <th>Name </th>
                    <th>PermittedLeave </th>
                    <th>LeaveTakenin2023</th>
                    <th>NoOfWorkingDay</th>
                    <th>BasicPayin2023</th>
                    <th>Hikepercent</th>
                    <th>IncometoCompanyin2024</th>
                    <th>NetProfitin2024</th>
                    
       
                </tr>
            </thead>
            <tbody className='td'>
                {data.map((details)=>(
                    
                    <tr >
                       
                        <td>{details.Experience}</td>
                        <td>{details.Id}</td>
                        <td>{details.Name}</td>
                        <td>{details.PermittedLeave}</td>
                        <td>{details.LeaveTakenin2023}</td>
                        <td>{details.NoOfWorkingDay}</td>
                        <td>{details.BasicPayin2023}</td>
                        <td>{details.Hikepercent}</td>
                        <td>{details.IncometoCompanyin2024}</td>
                        <td>{details.NetProfitin2024}</td>
                    </tr>
                ))}
            </tbody>
        </table> </div>
        </>
      );
    
    }
