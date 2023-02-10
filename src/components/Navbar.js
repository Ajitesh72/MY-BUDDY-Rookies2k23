import "../styles/Navbar.css";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [token] = React.useState(localStorage.getItem("token"));
  const[dataFetched,setDatafetched]=React.useState(false)
  const [userData, setUserData] = React.useState([]); 
  let navigate = useNavigate();

  const [bool, setBool] = React.useState({
    home: true,
    contactUs: false,
  });
  React.useEffect(() => {
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
  console.log(data)
  if(data){
    setUserData(data)
    setDatafetched(true)
    console.log(userData)
  }
  else{
    return(<h1>SOME ERROR OCCURED</h1>)
  }
} 

  React.useEffect(() => {
    // eslint-disable-next-line default-case
    switch (window.location.pathname) {
      case "/home": {
        setBool({
          home: true,
          contactUs: false,
        });
        break;
      }
      case "/ContactUs": {
        setBool({
          home: false,
          contactUs: true,
        });
        break;
      }
    }
  }, [navigate]);

  const SignOut = () => {
    navigate("/");
    window.localStorage.clear();
  };

  const toggleHome = () => {
    setBool({
      home: true,
      contactUs: false,
    });
    navigate("/Home");
  };
  const toggleContactUs = () => {
    setBool({
      home: false,
      contactUs: true,
    });
    navigate("/ContactUs");
  };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    viewport={{ once: true }} className="navbar-main">
      <div className="navbarBody-1" >
        <p className="Navbar-logo" onClick={toggleHome}>
          LOGO
        </p>
      </div>
      <div className="navbarBody-2">
        <p
          onClick={toggleHome}
          style={{
            textDecoration: bool.home ? "underline " : "",
            color: bool.home ? "#0058CC" : "",
          }}
          className="Navbar-title"
        >
          HOME
        </p>
        <p
          onClick={toggleContactUs}
          style={{
            textDecoration: bool.contactUs ? "underline" : "",
            color: bool.contactUs ? "#0058CC" : "",
          }}
          className="Navbar-title"
        >
          CONTACTUS
        </p>

        <p
          style={{
            color: "Red",
          }}
          onClick={SignOut}
          className="Navbar-title"
        >
          SIGNOUT
        </p>
      </div>
    </motion.div>
  );
}

export default Navbar;
