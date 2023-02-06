import "../styles/Hamburger.css";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";


function Hamburger() {
const [flip, setFlip] = React.useState(false);
// const [isAuth, setIsAuth] = React.useState(localStorage.getItem("isAuthkey"));
// let navigate = useNavigate();

// function leaderboardHandler() {
//   navigate("/leaderboard");
// }

// function aboutusHandler() {
//   navigate("/aboutUs");
// }
// function signupHandler() {
//   if (!isAuth) {
//     navigate("/");
//   }
// }
// function TypingHandler() {
//   if (isAuth) {
//     navigate("/Typing");
//   }
// }
let navigate = useNavigate();

const [bool, setBool] = React.useState({
  home: true,
  contactUs: false,
});

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

function flipMenu() {
  setFlip(!flip);
}

// function SignOutHandler() {
//   auth.signOut();
//   localStorage.clear();
//   navigate("/");
//   setIsAuth(false);
// }



  return (
   
    <div >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
           className="hamburger-main">
        <div className="Hamburger-logo"  onClick={toggleHome}>
            <br/>
          LOGO
        </div>
          {!flip && <AiOutlineMenu style={{ fontSize: "3em", color: "darkblue" }}  onClick={flipMenu}/>}
          {flip && <MdOutlineCancel style={{ fontSize: "3em", color: "red" }}  onClick={flipMenu}/>}
        </motion.div>
      {flip && (
        <div className="hamburgerNav-2">
           <ul onClick={toggleHome}
          style={{
            textDecoration: bool.home ? "underline " : "",
            color: bool.home ? "#0058CC" : "",
          }}>Home</ul>
          <ul onClick={toggleContactUs}
          style={{
            textDecoration: bool.contactUs ? "underline" : "",
            color: bool.contactUs ? "#0058CC" : "",
          }}>ContactUs</ul>
           <ul  style={{
            color: "Red",
          }}
          onClick={SignOut}
          className="Navbar-title">SIGN Out</ul>
        </div>
      )}
    </div>
   
  );
}

export default Hamburger;
