import "../styles/SignUp.css"; //css is same in signup and signin
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React from "react";

function Adminlogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  let navigate = useNavigate();
  function ChangetoSignUp() {
    navigate("/signUp");
  }

  React.useEffect(() => {
    
    const token=localStorage.getItem("token")
    if(token){
      navigate("/home")
    }
   
}, []);

  async function loginUser(event) {
    event.preventDefault();
    if(email && password){
      console.log("yaha aa raha")
      const response = await fetch("http://localhost:1337/api/adminlogin", {
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
      console.log(data)

      if (data.user) {
        localStorage.setItem("token", data.user);
        // localStorage.setItem("isAuthkey", true);
        toast.success("LOGIN SUCCESSFUL");
        setTimeout(function () {
          // navigate("/Home");
          navigate("/AdminWorker");
          
        }, 1500);
      } else {
        toast.error("PLEASE CHECK YOUR DETAILS AGAIN");
      }
    }
    else{
      toast.error("PLEASE ENTER ALL THE FIELDS");
      return;
    }
  
  }
  function ChangetoSignIn() {
    navigate("/");
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
              <h1>Are you Admin?Login</h1>
              <p>Monitor MYBUDDY!!!</p>
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
                onKeyDown={(e)=>{
                  e.code ==="Enter" && loginUser(e)
                }}
              />
              <br />
              <br />
              <input
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                onKeyDown={(e)=>{
                  e.code ==="Enter" && loginUser(e)
                }}
              />
              <br />
              <br />
              {/* <input
                type="text"
                placeholder="ROLE:JOB OR CLIENT"
                required={true}
                onChange={(e) => setRole(e.target.value)}
                onKeyDown={(e) => {
                  e.code === "Enter" && loginUser(e);
                }}/> */}
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
              <p>I am Not an Admin!</p>
              <p className="login-btn" type="submit" onClick={ChangetoSignIn}>
                TakemeBack
              </p>
            </motion.div>
            {/* <motion.div
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
            </motion.div> */}
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
        <Footerauth />
      </div> */}
    </div>
  );
}

export default Adminlogin;
