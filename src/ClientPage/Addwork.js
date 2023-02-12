import "../styles/addwork.css";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"
import Hamburger from "../components/Hamburger";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";



function AddWork() {
  let navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);
  const [dataFetched, setDatafetched] = useState(false)
  const [userData, setUserData] = useState([]);
  const [userFullData , setUserFullData] = useState()
  //new
  const [profession, setProfession] = React.useState("")
  const [jobDesc, setJobdesc] = React.useState("")



  useEffect(() => {
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
    if (data) {
      
       
      setUserData(data)
      console.log("DATA HERE IS",data.userData.email)
      setDatafetched(true)

      // BELOW FETCH GETS THE WHOLE DATA OF THE USER BASED ON HIS EMAIL
      fetch("http://localhost:1337/api/getClientbyEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body:JSON.stringify(
          {
            email:data.userData.email
          }
        )
      }).then(res => res.json()).then((data) => {setUserFullData(data);console.log(data)})
    }
    else {
      return (<h1>SOME ERROR OCCURED</h1>)
    }
  }

  // async function  AddWork(e){
  //   e.preventDefault()
  //   console.log(profession)
  //   console.log(jobDesc)
  //   const response = await fetch("http://localhost:1337/api/client/addWork", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${localStorage.getItem("token")}`
  //   },
  //   body: JSON.stringify({
  //     profession : profession,
  //     jobDesc : jobDesc
  //   })
  //   // body: {
  //   //   profession,
  //   //   jobDesc
  //   // },
  // });
  //     const data = await response.json();
  //     console.log(data)
  // }
  async function AddWork() {
    console.log(profession)
    console.log(jobDesc)
    const response = await fetch("http://localhost:1337/api/client/addWork", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        profession: profession,
        jobDesc: jobDesc
      })
    });
    const data = await response.json();
    if(data)
    {
      toast.success("JOB SUBMITTED!AFTER WE GET GET A MACTH WE WILL SEND YOU AN EMAIL")
      setTimeout(function () {
        navigate("/Home");
      }, 2000);
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

      {(!flip && token && dataFetched && userData.userData.role === "CLIENT" && ( userFullData ? userFullData.applicationStatus : true ))?
      <>
      <Toaster />
        <h2 style={{ marginLeft: "3em" }}>SUBMIT A NEW WORK</h2>
        <div className="addwork-main">
          <div>
            <div className="addwork-form">
              {/* <input placeholder="PROFFESSION REQUIRED:"/> */}
              <h3 style={{color:"darkblue"}}>PROFFESSION REQUIRED:</h3>
              <textarea rows="1" cols="60" placeholder="MAID" name="description" style={{ resize: "none", border: "2px solid black",borderRadius:"1.5em",paddingLeft:"1em" }} maxlength="30" onChange={(e) => setProfession(e.target.value)}>
              </textarea>
            </div>
            <div className="addwork-form-1">
              <h3 style={{color:"darkblue"}}>JOB DESCRIPTION:</h3>
              <textarea  rows="15" cols="60" placeholder="I NEED A MAID WHO IS AVAILABLE FROM 10 AM-5PM ON WEEKDAYS" name="description" maxlength="150" style={{ resize: "none", border: "2px solid black",borderRadius:"1.5em",paddingLeft:"1em",paddingTop:"0.5em" }} onChange={(e) => setJobdesc(e.target.value)}>
              </textarea>
              <div className="addwork-btn">
                <motion.button
                  type="submit"
                  className="form-button"
                  onClick={AddWork}
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.15 },
                    backgroundColor: "#0CAD28",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  Upload
                </motion.button>
              </div>

            </div>
          </div>
        </div>
      </>
      :<h1>Please Submit Application First To Be Able To Add A Job</h1>
      }

      {(!token || (dataFetched && userData.userData.role === "JOB")) && <div>
        <h1>PLEASE SIGNIN TO VIEW THIS PAGE</h1>
      </div>}


      <Footer />


    </motion.div>
  );
}

export default AddWork;
