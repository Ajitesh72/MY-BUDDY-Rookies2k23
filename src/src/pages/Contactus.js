import { motion } from "framer-motion";
import Navbar from "../components/Navbar"
import Hamburger from "../components/Hamburger";
import Footer from "../components/Footer";
import { useState } from "react";
import { useSelector} from "react-redux";


function ContactUs() {
  // const token=localStorage.getItem("token")
  const [token] = useState(localStorage.getItem("token"));
  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);
  return (
    <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}>

      {token && <div>
        <Navbar/>
        <Hamburger/>
      </div>}
      <Footer />
      {!flip && <div>
       CONTACT US PAGE
      </div>}

      {!token&&<div>
       <h1>PLEASE SIGNIN TO VIEW THIS PAGE</h1>
      </div>}

    </motion.div>
  );
}

export default ContactUs;
