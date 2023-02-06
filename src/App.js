import React from "react";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import ContactUs from "./pages/Contactus";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";

function App() {
  // const [isAuth, setIsAuth] = React.useState(localStorage.getItem("isAuthkey"));
  return (
    <div>
      {/* {isAuth&& <Navbar/>} */}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/Home" element={<Home />} />

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
