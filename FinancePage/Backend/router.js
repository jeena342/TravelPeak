const express=require("express")
const router=express.Router()
const data=require("./Model")
router.post("/",async(req,res)=>{

const {Experience}=req.body
const {Id}=req.body
const {Name}=req.body
const {PermittedLeave}=req.body
const {LeaveTakenin2023}=req.body
const {CostPerHourin2023}=req.body
const {BasicPayin2023}=req.body
const {NoOfWorkingDay}=req.body
const {HRAin2023}=req.body
const {NoOfHoursPerDay}=req.body
const {AnnualProfitTaxpercentin2023}=req.body
const {Hikepercent}=req.body
const {IncrementinAnnualProfitin2024}=req.body
const {LeaveTakenin2024}=req.body
const {AnnualProfitTaxpercentin2024}=req.body
let {NetPaywithtaxin2023}=0
let {AnnualSalaryin2024}=0
let {BasicPayin2024}=0
let {AnnualExpensein2024}=0
let {CostPerHourin2024}=0
let {AmountPerdayin2024}=0
let {NetPaywithtaxin2024}=0
let {IncometoCompanyin2024}=0
let {AnnualProfitin2024}=0
let {AnnualProfitTaxin2024}=0
let {NetProfitin2024}=0
//console.log(typeof(Number(CostPerHourin2023)*(Number(NoOfHoursPerDay))))
let value=(Number(CostPerHourin2023))*(Number(NoOfHoursPerDay))
console.log("value "+value)
let AmountPerdayin2023=(Number(CostPerHourin2023))*(Number(NoOfHoursPerDay))
console.log("AmountPerdayin2023 "+ AmountPerdayin2023)
const MonthlySalary=Number(BasicPayin2023)+Number(BasicPayin2023)*Number(HRAin2023)/100;
const AnnualSalaryin2023=Number(MonthlySalary*12);

console.log("this is the type of Amount perday "+ AmountPerdayin2023+typeof(AmountPerdayin2023))
AnnualSalary1=AnnualSalaryin2023
        
        let Tax=0;
        if(AnnualSalary1<500000)
        {   
            Tax=AnnualSalary1*5/100;
            console.log(Tax)
        }
        else if(AnnualSalary1<1000000)
        {
            Tax=((500000*5/100)+(AnnualSalary1-500000)*10/100)
            console.log(Tax)
        }
        else if(AnnualSalary1>1000000)
        {
            Tax=(500000*5/100)+((500000)*10/100)+((AnnualSalary1-1000000)*25/100);
            console.log(Tax)
        }
  let Tax1=Tax

  if(Number(PermittedLeave)<Number(LeaveTakenin2023)){
    NetPaywithtaxin2023=Number(AnnualSalaryin2023)-((Number(LeaveTakenin2023)-Number(PermittedLeave))*Number(AmountPerdayin2023))}
const AnnualExpensein2023=Number(AnnualSalaryin2023)+Tax1;
const IncometoCompanyin2023=Number(CostPerHourin2023)*Number(NoOfWorkingDay)*Number(NoOfHoursPerDay)*12
const AnnualProfitin2023=Number(IncometoCompanyin2023)-Number(AnnualExpensein2023)
const AnnualProfitTaxin2023=Number(AnnualProfitin2023)*(Number(AnnualProfitTaxpercentin2023)/100)
const NetProfitin2023=Number(IncometoCompanyin2023)-Number(AnnualExpensein2023)-Number(AnnualProfitTaxin2023)
if(Number(Experience)==1)
        {
            
            
            BasicPayin2024=Number(BasicPayin2023)+Number(BasicPayin2023)*(Number(Hikepercent)/100)
            
            const MonthlySalaryin2024=Number(BasicPayin2024)+Number(BasicPayin2024)*Number(HRAin2023)/100;
            AnnualSalaryin2024=Number(MonthlySalaryin2024)*12;
            AnnualSalary1=Number(AnnualSalaryin2024)
            let Tax=0;
            if(AnnualSalary1<500000)
            {
                
            Tax=AnnualSalary1*5/100;
            
            }
            else if(AnnualSalary1<1000000)
            {
            Tax=((500000*5/100)+(AnnualSalary1-500000)*10/100)
            
            }
             else if(AnnualSalary1>1000000)
            {
            Tax=((500000*5/100)+(500000*10/100)+((AnnualSalary1-1000000)*25/100));
            
            }
            Tax1=Tax
            AnnualExpensein2024=Number(AnnualSalaryin2024)+Tax1
            AnnualProfitin2024=Number(NetProfitin2023)+(Number(NetProfitin2023)*Number(IncrementinAnnualProfitin2024)/100);
            IncometoCompanyin2024=Number(AnnualExpensein2024)+Number(AnnualProfitin2024)
            const IncomeDiffWithTwoYears=Number(IncometoCompanyin2024)-Number(IncometoCompanyin2023)
            CostPerHourin2024=Number(CostPerHourin2023)+Number(IncomeDiffWithTwoYears)/(12*Number(NoOfHoursPerDay)*Number(NoOfWorkingDay)) 
            AmountPerdayin2024=Number(CostPerHourin2024)*Number(NoOfHoursPerDay)
            NetPaywithtaxin2024=Number(AnnualSalaryin2024)-((Number(LeaveTakenin2024)-Number(PermittedLeave))*Number(AmountPerdayin2024))
            AnnualProfitTaxin2024=Number(AnnualProfitin2024)*(Number(AnnualProfitTaxpercentin2024)/100)
            NetProfitin2024=Number(IncometoCompanyin2024)-Number(AnnualExpensein2024)-Number(AnnualProfitTaxin2024)

        }

try{
    await data.insertMany([{Experience:Experience,Id:Id,Name:Name,PermittedLeave:PermittedLeave,LeaveTakenin2023:LeaveTakenin2023,BasicPayin2023:BasicPayin2023,NoOfWorkingDay:NoOfWorkingDay,HRAin2023:HRAin2023,NoOfHoursPerDay:NoOfHoursPerDay,CostPerHourin2023:CostPerHourin2023,AmountPerdayin2023:AmountPerdayin2023,AnnualSalaryin2023:AnnualSalaryin2023,
        NetPaywithtaxin2023:NetPaywithtaxin2023,
        Tax1:Tax1,
        AnnualProfitin2023:AnnualProfitin2023,
        AnnualProfitTaxpercentin2023:AnnualProfitTaxpercentin2023,
        AnnualProfitTaxin2023:AnnualProfitTaxin2023,
        NetProfitin2023:NetProfitin2023,
        AnnualExpensein2023:AnnualExpensein2023,
        IncometoCompanyin2023:IncometoCompanyin2023,
        Hikepercent:Hikepercent,
        LeaveTakenin2024:LeaveTakenin2024,
        AnnualSalaryin2024:AnnualSalaryin2024,
        BasicPayin2024:BasicPayin2024,
        IncrementinAnnualProfitin2024:IncrementinAnnualProfitin2024,
        AnnualExpensein2024:AnnualExpensein2024,
        CostPerHourin2024:CostPerHourin2024,
        AmountPerdayin2024:AmountPerdayin2024,
        NetPaywithtaxin2024:NetPaywithtaxin2024,
        IncometoCompanyin2024:IncometoCompanyin2024,
        AnnualProfitTaxpercentin2024:AnnualProfitTaxpercentin2024,
        AnnualProfitin2024:AnnualProfitin2024,
        AnnualProfitTaxin2024:AnnualProfitTaxin2024,
        NetProfitin2024:NetProfitin2024}])
    
    const a1= await data.find({})
    
    res.json(a1)
}
catch(e){
res.send("error")
 console.log(e)
}
})
router.get("/",async(req,res)=>{
    const a1= await data.find({})
    
    res.json(a1)
})
router.put("/",async(req,res)=>{

    const {Experience}=req.body
    const {Id}=req.body
    const {Name}=req.body
    const {PermittedLeave}=req.body
    const {LeaveTakenin2023}=req.body                  
    const {SalaryPerHr}=req.body
    const {SalaryPerMonth}=req.body
    try{
        await data.insertMany([{Experience:Experience,Id:Id,Name:Name,PermittedLeave:PermittedLeave,LeaveTakenin2023:LeaveTakenin2023,SalaryPerHr:SalaryPerHr,SalaryPerMonth:(SalaryPerMonth+(SalaryPerHr*24*12))}])
        const a1= await data.find({})
        res.json(a1)
    }
    catch(e){
    res.send("error")
     console.log(e)
    }
    })
module.exports = router













