import "../styles/Hamburger.css";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { flipNavbar } from "../reducers/NavbarReducer";

function Hamburger() {
  const dispatch = useDispatch(); //make an action happedn onClick on a redux state from user.js file

  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);


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
    window.localStorage.clear();
    flipMenu()
    navigate("/");
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

  function flipMenu() {
    dispatch(
      flipNavbar({
        flip,
      })
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="hamburger-main"
      >
        <div className="Hamburger-logo" onClick={toggleHome}>
          <br />
          LOGO
        </div>
        {!flip && (
          <AiOutlineMenu
            style={{ fontSize: "3em", color: "darkblue" }}
            onClick={flipMenu}
          />
        )}
        {flip && (
          <MdOutlineCancel
            style={{ fontSize: "3em", color: "red" }}
            onClick={flipMenu}
          />
        )}
      </motion.div>
      {flip && (
        <div className="hamburgerNav-2">
           <ul
          onClick={toggleHome}
          style={{
            textDecoration: bool.home ? "underline " : "",
            color: bool.home ? "#0058CC" : "",
          }}
          className="Navbar-title"
        >
          HOME
        </ul>
        {dataFetched&& userData.userData.role==="JOB"&& <ul
          onClick={toggleFindWork}
          style={{
            textDecoration: bool.findwork ? "underline" : "",
            color: bool.findwork ? "#0058CC" : "",
          }}
          className="Navbar-title"
        >
          FIND WORK
        </ul>}
        {dataFetched&& userData.userData.role==="CLIENT"&& <ul
          onClick={toggleAddWork}
          style={{
            textDecoration: bool.addwork ? "underline" : "",
            color: bool.addwork ? "#0058CC" : "",
          }}
          className="Navbar-title"
        >
          ADD WORK
        </ul>}
        {dataFetched&& userData.userData.role==="CLIENT"&& <ul
          onClick={toggleProposals}
          style={{
            textDecoration: bool.proposals ? "underline" : "",
            color: bool.proposals ? "#0058CC" : "",
          }}
          className="Navbar-title"
        >
          PROPOSALS 
        </ul>}
        <p
          onClick={toggleApplication}
          style={{
            textDecoration: bool.application ? "underline" : "",
            color: bool.application ? "#0058CC" : "",
            fontSize:"1em"
          }}
          className="Navbar-title"
        >
          APPLICATION 
        </p>


          <ul
            style={{
              color: "Red",
            }}
            onClick={SignOut}
            className="Navbar-title"
          >
            SIGN OUT
          </ul>
        </div>
      )}
    </div>
  );
}

export default Hamburger;
