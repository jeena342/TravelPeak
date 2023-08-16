import './App.css';
import {BrowserRouter as  Router,
  Routes,
 Route} from "react-router-dom";
import Navbar from './Components/navbar.js'
import { FinancialDetails } from './Components/FinancialDetails';
import { NewEmployee } from './Components/NewEmployee';
function App() {
  return (
    <>
    <div className='App-header'>
     <h4 className='h1'>xyz Company</h4>
     </div>
     
     <Router>
    <Navbar/>
    <Routes>
    <Route path="/FinancialDetails" element={<FinancialDetails/>}></Route>
    <Route path="/NewEmployee" element={<NewEmployee/>}></Route>
    
    </Routes>
    </Router>
   </>
    
  );
}

export default App;