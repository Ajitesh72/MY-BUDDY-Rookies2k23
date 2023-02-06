import "../styles/Contactus.css";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"
import Hamburger from "../components/Hamburger";
import Footer from "../components/Footer";
import { useState } from "react";


function ContactUs() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));
  return (
    <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}>
      {isAuth&&<div>
        <Navbar/>
        <Hamburger/>
        {/* this div/component will be present in the botton of pages */}
      </div>}
      <Footer />
      {!isAuth&&<div>
       <h1>PLEASE SIGNIN TO VIEW THIS PAGE</h1>
      </div>}

    </motion.div>
  );
}

export default ContactUs;
