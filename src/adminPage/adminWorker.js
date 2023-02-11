import "../styles/adminWorker.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {  useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import Footer from "../components/Footer";
import logo from "../images/logo.svg"
// import { useEffect } from "react";

function AdminWorker() {
   const [token] = useState(localStorage.getItem("token"));
   const[dataFetched,setDatafetched]=useState(false)
   const [userData, setUserData] = useState([]); //We will store admin information over here and since we have used password hashing in backend..users information wont be sacrificed
   const[clientApplication,setClientApplication]=useState([]) //isme client applications store honhe jo mapp hone vaale hai
   const[workerApplication,setWorkerApplication]=useState([])
   const[showWorker,setShowWorker]=useState(true)
   const[showClient,setShowClient]=useState(false)
   let navigate = useNavigate();

  useEffect(() => {
      // const token=localStorage.getItem("token")
      if(token){
        getuserData()
      }
  }, [token]);

  async function getuserData(){
    const response = await fetch("http://localhost:1337/api/home/userData",{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    });
    const data = await response.json();
    if(data){
      setUserData(data)
      setDatafetched(true)
      console.log(userData)
    }
    else{
      return(<h1>SOME ERROR OCCURED</h1>)
    }
}
function gotoadminWorker(){
  console.log("getworkerquery")
  setShowClient(false)
  setShowWorker(true)
}
function gotoadminClient(){
  console.log("getclientquery")
  setShowWorker(false)
  setShowClient(true)
}
const SignOut = () => {
  navigate("/");
  window.localStorage.clear();
};


  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    viewport={{ once: true }}>

      {token && (
        <div>
           <div className="Home-main">
            <br/>
            <br/>
            {dataFetched&&<div>           
              <div className="admin-header">
                <div><img src={logo} alt="" className="logo"></img></div>

              <div className="admin-header-signout" onClick={SignOut}>SIGNOUT</div>
              </div>
              {/* iske ander hi code likhna */}
              <div >
              <h2>WELCOME BACK {userData.userData.name || "No quote found"}!!!!!</h2>

              </div>
              <div className="verificationMain">
                 <div>HERE ARE ALL THE VERIFICAION REQUESTS:</div>
                 <div>

                 <div className="verification-btn" onClick={gotoadminWorker}>FOR WORKERS</div>
                 <br/>
                 <div className="verification-btn" onClick={gotoadminClient}>FOR CLIENT</div>
                 </div>
              </div>
              <br/>
              <div>
                INITIALLY WE WILL SHOW WORKERS KE REQUESTS WITH CONDITIONAL RENDERING OF SHOWWORKER &&{}
                SIMILARLY FOR CLIENTS KE APPLICATIONS
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
