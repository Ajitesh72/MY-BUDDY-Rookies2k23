import "../styles/Home.css";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";
import Footer from "../components/Footer";
// import jwt from 'jsonwebtoken'
import jwt_decode from "jwt-decode";

function Home() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));
  const [user, setUser] = useState([]); //We will store user information over here and since we have used password hashing in backend..users information wont be sacrificed
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      var user = jwt_decode(localStorage.getItem("token"));
      setUser(user);
    }
  }, [isAuth]);

  return (
    <div>
      {isAuth && (
        <div>
          <Navbar />
          <div className="Home-main">
            Home
            <h1>Your name: {user.name || "No quote found"}</h1>
          </div>
        </div>
      )}
      <Footer />
      {!isAuth && (
        <div>
          <h2>PLZ SIGNIN TO VIEW THIS PAGE</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
