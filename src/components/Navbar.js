import "../styles/Navbar.css";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.svg"

function Navbar() {
  const [token] = React.useState(localStorage.getItem("token"));
  const[dataFetched,setDatafetched]=React.useState(false)
  const [userData, setUserData] = React.useState([]); 
  let navigate = useNavigate();

  const [bool, setBool] = React.useState({
    home: true,
    findwork:false,
    addwork:false,
    proposals:false,
    application:false
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
          findwork:false,
    addwork:false,
    proposals:false,
    application:false
        });
        break;
      }
      // case "/ContactUs": {
      //   setBool({
      //     home: false,
      //     contactUs: true,
      //   });
      //   break;

      case "/Findwork": {
        setBool({
          home: false,
          findwork:true,
         addwork:false,
         proposals:false,
         application:false
        });
        break;
      }
      case "/AddWork": {
        setBool({
          home: false,
          findwork:false,
         addwork:true,
         proposals:false,
         application:false
        });
        break;
      }
      case "/Proposalrecieved": {
        setBool({
          home: false,
          findwork:false,
         addwork:false,
         proposals:true,
         application:false
        });
        break;
      }
      case "/Application": {
        setBool({
          home: false,
          findwork:false,
         addwork:false,
         proposals:false,
         application:true
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
      findwork:false,
addwork:false,
proposals:false,
application:false
    });
    navigate("/Home");
  };
  // const toggleContactUs = () => {
  //   setBool({
  //     home: false,
  //     contactUs: true,
  //   });
  //   navigate("/ContactUs");
  // };
  
  const toggleFindWork = () => {
    setBool({
      home: false,
      findwork:true,
     addwork:false,
     proposals:false,
     application:false
    });
    navigate("/Findwork");
  };
  const toggleAddWork = () => {
    setBool({
      home: false,
      findwork:false,
     addwork:true,
     proposals:false,
     application:false
    });
    navigate("/AddWork");
  };
  const toggleApplication = () => {
    setBool({
      home: false,
      findwork:false,
     addwork:false,
     proposals:false,
     application:true
    });
    navigate("/Application");
  };
  const toggleProposals = () => {
    setBool({
      home: false,
      findwork:false,
     addwork:false,
     proposals:true,
     application:false
    });
    navigate("/Proposalrecieved");
  };
  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    viewport={{ once: true }} className="navbar-main">
      <div className="navbarBody-1" >
        {/* <p className="Navbar-logo" onClick={toggleHome}>
          LOGO
        </p> */}
        {/* <br/> */}
        <div>
      
      <br/>
      <img src={logo} alt="" className="logo"/>
        </div>
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
       
        {/* <p
          onClick={toggleContactUs}
          style={{
            textDecoration: bool.contactUs ? "underline" : "",
            color: bool.contactUs ? "#0058CC" : "",
          }}
          className="Navbar-title"
        >
          CONTACTUS
        </p> */}
       {dataFetched&& userData.userData.role==="JOB"&& <p
          onClick={toggleFindWork}
          style={{
            textDecoration: bool.findwork ? "underline" : "",
            color: bool.findwork ? "#0058CC" : "",
          }}
          className="Navbar-title"
        >
          FIND WORK
        </p>}
        {dataFetched&& userData.userData.role==="CLIENT"&& <p
          onClick={toggleAddWork}
          style={{
            textDecoration: bool.addwork ? "underline" : "",
            color: bool.addwork ? "#0058CC" : "",
          }}
          className="Navbar-title"
        >
          ADD WORK
        </p>}
       
        {/* {dataFetched&& userData.userData.role==="CLIENT"&& <p
          onClick={toggleProposals}
          style={{
            textDecoration: bool.proposals ? "underline" : "",
            color: bool.proposals ? "#0058CC" : "",
          }}
          className="Navbar-title"
        >
          PROPOSALS 
        </p>} */}
        <p
          onClick={toggleApplication}
          style={{
            textDecoration: bool.application ? "underline" : "",
            color: bool.application ? "#0058CC" : "",
          }}
          className="Navbar-title"
        >
          APPLICATION 
        </p>

        <p
          style={{
            color: "Red",
          }}
          onClick={SignOut}
          className="Navbar-title-signout"
        >
          SIGNOUT
        </p>
      </div>
    </motion.div>
  );
}

export default Navbar;
