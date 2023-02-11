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
//new
  const[profession,setProfession]=React.useState("")
  const[jobDesc,setJobdesc]=React.useState("")
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
  async function AddWork(){
    console.log(profession)
    console.log(jobDesc)
    const response = await fetch("http://localhost:1337/api/client/addWork",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        profession : profession,
            jobDesc : jobDesc
        })
    });
    const data = await response.json();
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

      {!flip && <>
        <h2 style={{marginLeft:"3em"}}>Add A New Work</h2>
      <div className="addwork-main">
        <div>
          <div className="addwork-form">
              {/* <input placeholder="PROFFESSION REQUIRED:"/> */}
              <h3>PROFFESSION REQUIRED:</h3>
              <textarea rows = "1" cols = "60" placeholder="MAID" name = "description" style={{resize: "none",border:"2px solid black"}} maxlength="30" onChange={(e) => setProfession(e.target.value)}>
         </textarea>
          </div>
          <div className="addwork-form-1">
              <h3>JOB DESCRIPTION:</h3>
          <textarea rows = "15" cols = "60" placeholder="I NEED A MAID WHO IS AVAILABLE FROM 10 AM-5PM ON WEEKDAYS" name = "description" maxlength="150" style={{resize: "none",border:"2px solid black"}} onChange={(e) => setJobdesc(e.target.value)}>
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
      }

      <Footer />
      {!token && <div>
        <h1>PLEASE SIGNIN TO VIEW THIS PAGE</h1>
      </div>}

    </motion.div>
  );
}

export default AddWork;
