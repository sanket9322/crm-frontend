import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AllLead from "./Components/DashboardP/AllLead";
import CreateLead from "./Components/DashboardP/CreateLead";
import EmailComposer from "./Components/DashboardP/EmailComposer";
import UpdateLead from "./Components/DashboardP/UpdateLead";
import AddCustomers from "./Components/Main/AddCustomers";
import AdminDashboard from "./Components/Main/AdminDashboard";
import CustomerDashboard from "./Components/Main/CustomerDashboard";
import Login from "./Components/Main/Login";
import Registration from "./Components/Main/Registration";
import UserDashboard from "./Components/Main/UserDashboard";
import AddTickets from "./Components/Pages/AddTickets";
import AllFeedback from "./Components/Pages/AllFeedback";
import AllTickets from "./Components/Pages/AllTickets";
import CustomerList from "./Components/Pages/CustomerList";
import Feedback from "./Components/Pages/Feedback";
import UpdateTickets from "./Components/Pages/UpdateTickets";
import UpdateUsers from "./Components/Pages/UpdateUsers";
import UserList from "./Components/Pages/UserList";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/userlist"  element={<UserList/>}/>
        <Route path="/email" element={<EmailComposer/>}/>
        <Route path="/alllead" element={<AllLead/>}/>
           <Route path="/add-ticket" element={<AddTickets />} />
              <Route path="/add-feedback" element={<Feedback />} />
        <Route path="/feedbacks" element={<AllFeedback />} />
        <Route path="/tickets" element={<AllTickets />} />
        <Route path="/update-ticket/:id" element={<UpdateTickets />} />
        <Route path="/updatelead/:id"  element={<UpdateLead/>}/>
        <Route path="/createlead"  element={<CreateLead/>}/>
         <Route path="/customerlist"  element={<CustomerList/>}/>
        <Route path="/update/:id"   element={<UpdateUsers/>}/>
        <Route path="/addcustomer"    element={<AddCustomers/>}/>
        <Route path="/admindash" element={<AdminDashboard/>}/>
        <Route path="/customerdashboard" element={<CustomerDashboard/>}/>
        <Route path="/udashboard" element={<UserDashboard/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
