import { motion } from "framer-motion";
import Navbar from "../components/Navbar"
import Hamburger from "../components/Hamburger";
import "../styles/findwork.css"
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import Eachwork from "./eachwork";


function Findwork() {
  const [token] = useState(localStorage.getItem("token"));
  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);
  const [dataFetched, setDatafetched] = useState(false)
  const [userData, setUserData] = useState([]);
  const [allWorkData, setAllWorkData] = useState()

  useEffect(() => {
    if (token) {
      getuserData()
    }
  }, [token]);


  useEffect(() => {
    fetch("http://localhost:1337/api/client/findWork", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAllWorkData(data)
      })
  }, [])


  function sendBothEmail(e, clientEmail) {
    e.preventDefault()
    fetch("http://localhost:1337/api/WorkRequestAccepted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(
        {
          clientEmail: clientEmail
        }
      )
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }

  async function getuserData() {
    const response = await fetch("http://localhost:1337/api/home/userData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    const data = await response.json();
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

      {token &&
        <div>
          <Navbar />
          <Hamburger />
        </div>
      }
      {!flip && token && dataFetched && userData.userData.role === "JOB" &&
        <div className="find-work-master">

          <button className='search-job-btn'>Search Job Acc To Preference</button>

          {allWorkData && allWorkData.map(each => < Eachwork WorkData={each} sendBothEmail={sendBothEmail} />)}
        </div>
      }
      {(!token || (dataFetched && userData.userData.role === "CLIENT")) && <div>
        <h1>PLEASE SIGNIN TO VIEW THIS PAGE</h1>
      </div>}
      <Footer />



    </motion.div>
  );
}

export default Findwork;