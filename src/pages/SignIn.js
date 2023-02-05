import "../styles/SignUp.css"; //css is same in signup and signin
// import Footer from "../components/Footer";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React from "react";
import Navbar from "../components/Navbar";

function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  let navigate = useNavigate();
  function ChangetoSignUp() {
    navigate("/");
  }

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      localStorage.setItem("isAuthkey", true);
      toast.success("LOGIN SUCCESSFUL");
      // for (let i = 0; i <= 3000; i++) {}
      setTimeout(function () {
        navigate("/Home");
      }, 1500);
    } else {
      toast.error("PLEASE CHECK YOUR DETAILS AGAIN");
    }
  }
  return (
    <div>
      
      <div className="App-divide">
        <Toaster />
        <motion.div className="signup-left">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h1>Create an Account</h1>
              <p>Continue Your Journey With MY-BUDDY</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <input
                placeholder="EMAIL"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <br />
              <br />
              <input
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <br />
              <br />
            </motion.div>
            <br />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="Create-Account"
              onClick={loginUser}
            >
              Sign In
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="LOGIN"
            >
              <p>Want to make a new Account?</p>
              <p className="login-btn" onClick={ChangetoSignUp}>
                SignUp
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              viewport={{ once: true }}
              className="pic_for_smaller_device"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          viewport={{ once: true }}
          className="signup-right"
        ></motion.div>
      </div>
      <br />
      <div className="test"></div>
      {/* <div className="footer">
        <Footer />
      </div> */}
    </div>
  );
}

export default SignIn;
