import "../styles/addwork.css";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"
import Hamburger from "../components/Hamburger";
import Footer from "../components/Footer";
import { useState } from "react";
import React from "react";
import { useSelector } from "react-redux";


function AddWork() {
  const [token] = useState(localStorage.getItem("token"));
  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);
  const [dataFetched, setDatafetched] = React.useState(false)
  const [userData, setUserData] = React.useState([]);
  React.useEffect(() => {
    if (token) {
      getuserData()
    }
  }, [token]);

  async function getuserData() {
    const response = await fetch("http://localhost:1337/api/home/userData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    const data = await response.json();
    console.log(data)
    if (data) {
      setUserData(data)
      setDatafetched(true)
    }
    else {
      return (<h1>SOME ERROR OCCURED</h1>)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}>

      {token && dataFetched && userData.userData.role === "CLIENT" && 
      <div>
        <Navbar />
        <Hamburger />
      </div>
      }

      {!flip && 
      <div className="addwork-main">
        <h3>Add New Work</h3>
      </div>
      }

      <Footer />
      {!token && <div>
        <h1>PLEASE SIGNIN TO VIEW THIS PAGE</h1>
      </div>}

    </motion.div>
  );
}

export default AddWork;
