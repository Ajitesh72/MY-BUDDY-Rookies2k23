import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Hamburger from "../components/Hamburger";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";
import Footer from "../components/Footer";
import { useSelector} from "react-redux";
import jwt_decode from "jwt-decode";

function Home() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));
  const [user, setUser] = useState([]); //We will store user information over here and since we have used password hashing in backend..users information wont be sacrificed
  let navigate = useNavigate();
  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);

  useEffect(() => {
    if (isAuth) {
      var user = jwt_decode(localStorage.getItem("token"));
      setUser(user);
    }
  }, [isAuth]);

  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    viewport={{ once: true }}>

      {isAuth && (
        <div>
          <Navbar />
          <Hamburger/>
          {!flip && <div className="Home-main">
            Home PAGE CONTENT
            <h1>Your name: {user.name || "No quote found"}</h1>
          </div>}
        </div>
      )}
      <Footer />
      {!isAuth && 
        <div>
          <h2>PLZ SIGNIN TO VIEW THIS PAGE</h2>
        </div>
      }
    </motion.div>
  );
}

export default Home;
