import React,{useState} from 'react'
import axios from 'axios'
export const NewEmployee=()=>{
    const [Experience,setExperience]=useState("")
    const [Id,setId]=useState("")
    const [Name,setName]=useState("")
    const [PermittedLeave,setPermittedLeave]=useState("")
    const [LeaveTakenin2023,setLeaveTakenin2023]=useState("")
    const [CostPerHourin2023,setCostPerHourin2023]=useState("")
    const [BasicPayin2023,setBasicPayin2023]=useState("")
    const [NoOfWorkingDay,setNoOfWorkingDay]=useState("")
    const [HRAin2023,setHRAin2023]=useState("")
    const [NoOfHoursPerDay,setNoOfHoursPerDay]=useState("")
    const [AnnualProfitTaxpercentin2023,setAnnualProfitTaxpercentin2023]=useState("")
    const [Hikepercent,setHikepercent]=useState("")
    const [IncrementinAnnualProfitin2024,setIncrementinAnnualProfitin2024]=useState("")
    const [LeaveTakenin2024,setLeaveTakenin2024]=useState("")
    const [AnnualProfitTaxpercentin2024,setAnnualProfitTaxpercentin2024]=useState("")
async function submit(e){
     e.preventDefault()
   try{

    await axios.post("http://localhost:9000/age/",{
        Experience,
        Id,
        Name,
        PermittedLeave,
        LeaveTakenin2023,
        CostPerHourin2023,
        BasicPayin2023,
        NoOfWorkingDay,
        HRAin2023,
        NoOfHoursPerDay,
        AnnualProfitTaxpercentin2023,
        Hikepercent,
        IncrementinAnnualProfitin2024,
        LeaveTakenin2024,
        AnnualProfitTaxpercentin2024
    }) 

    }
    catch(e){
        console.log(e)
    }
     }
    //  async function handleUpdate(e){
    //     e.preventDefault()
    //   try{
   
    //    await axios.put("http://localhost:9000/age/",{
    //        Experience,
    //        Id,
    //        Name,
    //        PermittedLeave,
    //        LeaveTakenin2023,
    //        SalaryPerHr,
    //        SalaryPerMonth
    //    }) 
   
    //    }
    //    catch(e){
    //        console.log(e)
    //    }
    //     }
   
     return(
        <div className='App'>
            
                <div  className='input-area'>
                <h2 className='h2'>Add New Employee:</h2>
                </div>
                <div className='input-area'>
                <form onSubmit={submit}>
                    
                <div >
                    <span>Experience:</span>
                <input className='input-1'
                value={Experience}
                placeholder='Experience'

                onChange={(e)=>setExperience(e.target.value)}
                />
                </div>
                <div >
                <span>Id:</span>   
                <input className='input-1'
                value={Id}
                placeholder='Id'
                onChange={(e)=>setId(e.target.value)}
                />
                </div>
                <div >
                <span>Name:</span>
                <input className='input-1'
                value={Name}
                placeholder='Name'
                onChange={(e)=>setName(e.target.value)}
                />
                </div>
                <div >
                <span>Permitted Leave:</span>    
                <input className='input-1'
                value={PermittedLeave}
                placeholder='Permitted Leave'
                onChange={(e)=>setPermittedLeave(e.target.value)}
                />
                </div>
                <div >
                <span>Leaves Taken in 2023:</span>
                <input className='input-1'
                value={LeaveTakenin2023}
                placeholder='Leave Taken in 2023'
                onChange={(e)=>setLeaveTakenin2023(e.target.value)}
                />
                </div>
                <div >
                <span>Cost per Hour in 2023:</span>
                <input className='input-1'
                value={CostPerHourin2023}
                placeholder='Cost per Hour in 2023'
                onChange={(e)=>setCostPerHourin2023(e.target.value)}
                />
                </div>
                <div >
                <span>Basic Pay in 2023:</span>
                <input className='input-1'
                value={BasicPayin2023}
                placeholder='Basic Pay in 2023'
                onChange={(e)=>setBasicPayin2023(e.target.value)}
                />
                <span>No Of Working Day:</span>
                <input className='input-1'
                value={NoOfWorkingDay}
                placeholder='No Of Working Day'
                onChange={(e)=>setNoOfWorkingDay(e.target.value)}
                />
                <span>HRA in 2023:</span>
                <input className='input-1'
                value={HRAin2023}
                placeholder='HRA in 2023'
                onChange={(e)=>setHRAin2023(e.target.value)}
                />
                </div>
                <span>No Of Hours Per Day:</span>
                <input className='input-1'
                value={NoOfHoursPerDay}
                placeholder='NoOfHoursPerDay'
                onChange={(e)=>setNoOfHoursPerDay(e.target.value)}
                />
                <span> Annual Profit Tax percent in 2023:</span>
                <input className='input-1'
                value={AnnualProfitTaxpercentin2023}
                placeholder='Annual Profit Tax percent in 2023'
                onChange={(e)=>setAnnualProfitTaxpercentin2023(e.target.value)}
                />
                <span>Hike percent:</span>
                <input className='input-1'
                value={Hikepercent}
                placeholder='Hikepercent'
                onChange={(e)=>setHikepercent(e.target.value)}
                />
                <span>Increment in Annual Profit in 2024:</span>
                <input className='input-1'
                value={IncrementinAnnualProfitin2024}
                placeholder='Increment in Annual Profit in 2024'
                onChange={(e)=>setIncrementinAnnualProfitin2024(e.target.value)}
                />
                <span>Leave Taken in 2024:</span>
                <input className='input-1'
                value={LeaveTakenin2024}
                placeholder='LeaveTakenin2024'
                onChange={(e)=>setLeaveTakenin2024(e.target.value)}
                />
                <span>Annual Profit Tax percent in 2024:</span>
                <input className='input-1'
                value={AnnualProfitTaxpercentin2024}
                placeholder='AnnualProfitTaxpercentin2024'
                onChange={(e)=>setAnnualProfitTaxpercentin2024(e.target.value)}
                />
                <div className='btn1'>
                <button type="submit" className='button'>Submit</button></div>
                {/* <div className='btn1'>
                
                <button onClick={handleUpdate} className='button'>Calculate</button>  </div> */}
                </form>
            </div>
        </div>
     )
}
