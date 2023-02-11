import React from "react";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import ContactUs from "./pages/Contactus";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Mehdi from "./pages/mehdi";
import Premium from "./pages/Premium";
import Success from "./pages/Success"
import Adminlogin from "./pages/AdminLogin"
import AdminWorker from "./adminPage/adminWorker"
import Application from "./pages/Application";
//for client
import AddWork from "./ClientPage/Addwork";
import Proposalrecieved from "./ClientPage/ProposalsRecieved";
//for workers
import Findwork from "./Worker.js/Findwork";

function App() {
  // const [token, setToken] = React.useState(localStorage.getItem("token"));
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/AdminlogIn" element={<Adminlogin />} />
        <Route path="/AdminWorker" element={<AdminWorker />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Application" element={<Application />} />

        <Route path="/AddWork" element={<AddWork />} />
        {/* <Route path="/Proposalrecieved" element={<Proposalrecieved />} /> */}
        <Route path="/Findwork" element={<Findwork />} />


        <Route path="/mehdi" element={<Mehdi />} />
        <Route path="/Premium" element={<Premium />} />
        <Route path="/stripepaymentsuccess" element={<Success />} />
        <Route path="stripepaymentcancel" element={<h1>failed</h1>} />
        {/* <Route path="success" element={<Success/>} /> */}

        {/* <Route
        path="/aboutus"          //yaha pe ALAN AI-FAQS AND GENERAL IDEA OF HOW WE CAN HELP
        element={<Aboutus/>}  
      /> */}

        <Route path="/Contactus" element={<ContactUs />} />

        <Route path="/*" element={<h1>PAGE NOT FOUND</h1>} />
      </Routes>
    </div>
  );
}

export default App;
