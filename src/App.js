import "./App.css";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import ContactUs from "./pages/Contactus";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Signin" element={<SignIn />} />

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
