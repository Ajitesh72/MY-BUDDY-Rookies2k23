import "../styles/Navbar.css";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    let navigate = useNavigate();

    const[one,setOne]=React.useState(true)
    const[two,setTwo]=React.useState(false)
    const[three,setThree]=React.useState(false)

    const SignOut = ()=>{
        navigate("/")
        localStorage.setItem("isAuthkey",false)
        window.localStorage.clear();
    }
    const toggleOne = ()=>{
        setOne(true)
        setTwo(false)
        setThree(false)
        navigate("/home")
    }
    const toggleTwo = ()=>{
        setOne(false)
        setTwo(true)
        setThree(false)
        navigate("/ContactUs")
    }
    const toggleThree = ()=>{
        setOne(false)
        setTwo(false)
        setThree(true)
        navigate("/ContactUs")
    }
    const mystyle = {
        color: "red",
      };

  return (
   <div className="navbar-main">
    <div className="navbarBody-1"><p>LOGO</p></div>
    <div className="navbarBody-2">
        {one?<p onClick={toggleOne} style={mystyle}>HOME</p>:<p onClick={toggleOne}>HOME</p>}
        {two?<p onClick={toggleTwo} style={mystyle}>ABOUT</p>:<p onClick={toggleTwo}>ABOUT</p>}
        {three?<p onClick={toggleThree} style={mystyle}>CONTACT</p>:<p onClick={toggleThree}>CONTACT</p>}
        <p onClick={SignOut}>SIGNOUT</p>
    </div>
      
   </div>
  );
}

export default Navbar;
