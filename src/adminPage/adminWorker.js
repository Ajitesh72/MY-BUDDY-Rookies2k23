import "../styles/adminWorker.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import logo from "../images/logo.svg"
import PersonCard from "./personCard.js"
// import { useEffect } from "react";

function AdminWorker() {
  const [token] = useState(localStorage.getItem("token"));
  const [dataFetched, setDatafetched] = useState(false)
  const [userData, setUserData] = useState([]); //We will store admin information over here and since we have used password hashing in backend..users information wont be sacrificed
  const [clientApplication, setClientApplication] = useState([]) //isme client applications store honhe jo mapp hone vaale hai
  const [workerApplication, setWorkerApplication] = useState([])
  const [showWorker, setShowWorker] = useState([])
  const [showClient, setShowClient] = useState([])
  const [workerdataFetched, setWorkerdataFetched] = useState(false)
  const [clientdataFetched, setclientdataFetched] = useState(false)

  let navigate = useNavigate();

  useEffect(() => {
    const token=localStorage.getItem("token")
    if (token) {
      console.log("token aaya")
      getuserData()
      getworkerApplication()
      getclientApplication()
    }
  }, [token]);



  async function getuserData() {                           //admin ka data aayega
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



  async function getworkerApplication() {                                          //worker ka applications aayega
    const response = await fetch("http://localhost:1337/api/admin/getWorkers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    const data = await response.json();
    if (data) {
      // console.log("worker data is ",data)
      setWorkerApplication(data)
      setWorkerdataFetched(true)
    }
    else {
      return (<h1>SOME ERROR OCCURED</h1>)
    }
  }


  async function getclientApplication() {                                               //clients ka application aayega
    const response = await fetch("http://localhost:1337/api/admin/getClients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    const data = await response.json();
    if (data) {
      console.log("client data is ", data)
      setClientApplication(data)
      setclientdataFetched(true)
    }
    else {
      return (<h1>SOME ERROR OCCURED</h1>)
    }
  }

  function gotoadminWorker() {
    console.log("getworkerquery")
    setShowClient(false)
    setShowWorker(true)
  }
  
  function gotoadminClient() {
    console.log("getclientquery")
    setShowWorker(false)
    setShowClient(true)
  }
  const SignOut = () => {
    navigate("/");
    window.localStorage.clear();
  }
  async function acceptOnclick(personEmail,personRole){
    const response = await fetch("http://localhost:1337/api/admin/accept",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
          personEmail : personEmail,
          role : personRole
        })
    });
    const data = await response.json();
  }
  async function rejectOnclick(personEmail,personRole){
    const response = await fetch("http://localhost:1337/api/admin/reject",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
          personEmail : personEmail,
          role : personRole
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

      {token && (
        <div>
          <div className="Home-main">
            <br />
            <br />
            {dataFetched && token&& (userData.userData.name ==="Ajitesh"||userData.userData.name ==="admin")&& <div>
              <div className="admin-header">
                <div><img src={logo} alt="" className="logo"></img></div>

                <div className="admin-header-signout" onClick={SignOut}>SIGNOUT</div>
              </div>
              {/* iske ander hi code likhna */}
              <div >
                <h2>WELCOME BACK  {userData.userData.name || "No quote found"}!!!!!</h2>

              </div>
              <div className="verificationMain">
                <div>Verify All The Requests Here:</div>
                <div>
                  <div className="verification-btn" onClick={gotoadminWorker} >WORKER APPLICATIONS</div>
                  <br />
                  <div className="verification-btn" onClick={gotoadminClient}>CLIENT APPLICATIONS</div>
                </div>
              </div>
              <br />
              <div>
                {showWorker && <div>WORKERS</div>}
                {showWorker && workerdataFetched && workerApplication.map((each) => <PersonCard allData={each} acceptOnclick={acceptOnclick} rejectOnclick= {rejectOnclick}/>)}


                {showClient && <div>CLIENT</div>}
                {showClient && clientdataFetched && clientApplication.map((each) => <PersonCard allData={each} acceptOnclick={acceptOnclick} rejectOnclick= {rejectOnclick}/>)}

              </div>
            </div>}

          </div>
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

export default AdminWorker;
