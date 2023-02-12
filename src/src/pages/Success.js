import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Hamburger from "../components/Hamburger";
import { motion } from "framer-motion";
import {  useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";
import Footer from "../components/Footer";
import { useSelector} from "react-redux";

function Success() {
   const [token] = useState(localStorage.getItem("token"));
  let navigate = useNavigate();
  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);


// NODEMAILER
const handleClick = async () => {
    const email = await fetch(
      "http://localhost:1337/sendEmail",
      {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      }
    );
    const response = await email.json();
    if(response.status==="ok")
    {
      navigate("/home")
    }
  };



  


  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    viewport={{ once: true }}>

      {token && (
        <div>
          {!flip && <div className="Home-main">
            <p>YOUR PAYMENT WAS SUCCESFULL</p>
            <button onClick={handleClick}>SEND ME CONFIRMATION MAIL AND GO HOME</button>
            {/* {dataFetched&&<h1>Your name: {userData.userData.name || "No quote found"}</h1>} */}
          </div>}
        </div>
      )}
      <Footer />
      {!token && 
        <div>
          <h2>PLZ SIGNIN TO VIEW THIS PAGE</h2>
        </div>
      }
    </motion.div>
  );
}

export default Success;
