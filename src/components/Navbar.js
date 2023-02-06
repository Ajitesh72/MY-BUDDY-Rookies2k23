import "../styles/Navbar.css";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
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
