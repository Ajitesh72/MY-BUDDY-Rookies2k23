import "../styles/SignUp.css";
// import Footer from "../components/Footer";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  let navigate = useNavigate();
  function ChangetoSignIn() {
    navigate("/SignIn");
  }

  async function registerUser(event) {
    event.preventDefault();
    if (name === "" || Email === "" || password === "") {
      toast.error("PLEASE ENTER ALL THE FIELDS");
      return;   //so that method tak jaaye hi naa if any information is not entered
    }
    

    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        Email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      localStorage.setItem("isAuthkey", true);
      navigate("/SignIn");
    } else {
      console.log("not working");
    }
  }
  return (
    <>
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
              <p>Lets Start your journey with MY-BUDDY</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <input
              type="text"
                placeholder="ENTER YOUR NAME"
                required={true}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <br />
              <input
                placeholder="EMAIL"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <br />
              <br />
              <input
                placeholder="PASSWORD"
                required={true}
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
              onClick={registerUser}
            >
              Create Account
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="LOGIN"
            >
              <p>Already have an Account?</p>
              <p className="login-btn" type="submit" onClick={ChangetoSignIn}>
                Login
              </p>
            </motion.div>
            <div className="small_device">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                viewport={{ once: true }}
                className="pic_for_smaller_device"
              />
            </div>
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
      {/* <div className="footer">
        <Footer />
      </div> */}
    </>
  );
}

export default SignUp;
