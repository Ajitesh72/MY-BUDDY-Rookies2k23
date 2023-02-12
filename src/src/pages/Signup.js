import "../styles/SignUp.css";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const[role,setRole]=React.useState("")//here it will either be worker or Client

  let navigate = useNavigate();
  function ChangetoSignIn() {
    navigate("/");
  }
  function ChangetoAdminSignIn() {
    navigate("/AdminlogIn");
  }

  async function registerUser(event) {
    console.log(role.toUpperCase())
    if(role.toUpperCase()==="JOB" || role.toUpperCase()==="CLIENT"){
    //   toast.error("ENTER YOUR ROLE AS EITHER 'JOB OR CLIENT' ");
    //   return
    // return
    event.preventDefault();
    if (name && Email && password) {
      const response = await fetch("http://localhost:1337/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          Email,
          password,
          role
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        // localStorage.setItem("isAuthkey", true);
        navigate("/");
      } else {
        console.log("not working");
      }
    } else {
      toast.error("PLEASE ENTER ALL THE FIELDS");
      return;
    }
  }
else{
   toast.error("ENTER YOUR ROLE AS EITHER 'JOB OR CLIENT' ");
      return
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
                onKeyDown={(e) => {
                  e.code === "Enter" && registerUser(e);
                }}
              />
              <br />
              <br />
              <input
                placeholder="EMAIL"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                onKeyDown={(e) => {
                  e.code === "Enter" && registerUser(e);
                }}
              />
              <br />
              <br />
              <input
                placeholder="PASSWORD"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                onKeyDown={(e) => {
                  e.code === "Enter" && registerUser(e);
                }}
              />
              <br />
              <br />
              {/* <div>
                <input type="checkbox" name="FOR JOB" onChange={handlecheckboxChange}/>
                FOR JOB
                <input type="checkbox" name="FOR SERVICES" /> FOR SERVICES
              </div> */}
               <input
                type="text"
                placeholder="ROLE:JOB OR CLIENT"
                required={true}
                onChange={(e) => setRole(e.target.value)}
                onKeyDown={(e) => {
                  e.code === "Enter" && registerUser(e);
                }}
              />
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
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="LOGIN">
              <p style={{fontSize:"1em"}}>Are you an Admin?</p>
              <p className="login-btn" type="submit" onClick={ChangetoAdminSignIn} style={{fontSize:"1em"}}>
                Click me
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
      <div className="footer">
        {/* <Footer /> */}
        <div className="footer"></div>
      </div>
    </>
  );
}

export default SignUp;
