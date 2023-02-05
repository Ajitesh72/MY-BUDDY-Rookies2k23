import "../styles/Contactus.css";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { useState } from "react";


function ContactUs() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));
  return (
    <div>
      {isAuth&&<div>
        {/* <Navbar/> */}
        {/* this div/component will be present in the botton of pages */}
      </div>}
      <Footer />
      {!isAuth&&<div>
       <h1>PLEASE SIGNIN TO VIEW THIS PAGE</h1>
      </div>}

    </div>
  );
}

export default ContactUs;
