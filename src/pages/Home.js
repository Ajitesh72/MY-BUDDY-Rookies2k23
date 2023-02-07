import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Hamburger from "../components/Hamburger";
import { motion } from "framer-motion";
import {  useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";
import Footer from "../components/Footer";
import { useSelector} from "react-redux";

function Home() {
   const [token] = useState(localStorage.getItem("token"));
  const[dataFetched,setDatafetched]=useState(false)
  const [userData, setUserData] = useState([]); //We will store user information over here and since we have used password hashing in backend..users information wont be sacrificed
  let navigate = useNavigate();
  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);

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
      // console.log(data)
    }
    else{
      return(<h1>SOME ERROR OCCURED</h1>)
    }
}

  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    viewport={{ once: true }}>

      {token && (
        <div>
          <Navbar />
          <Hamburger/>
          {!flip && <div className="Home-main">
            <p>HOME PAGE CONTENT</p>
            {dataFetched&&<h1>Your name: {userData.userData.name || "No quote found"}</h1>}
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

export default Home;
