import "../styles/application.css";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"
import Hamburger from "../components/Hamburger";
import Footer from "../components/Footer";
import { useState } from "react";
import { useSelector} from "react-redux";
import { Toaster } from "react-hot-toast";


function Application() {
  const [token] = useState(localStorage.getItem("token"));
  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);
  const [imgName , setImgName] = useState("")
  const [img, setImg] = useState();

  const [formData , setFormData] = useState({
    name : "",
    profession : "",
    about : ""

  })

  async function handleSubmit(e){
    e.preventDefault()
    const sendingData = new FormData();
    sendingData.append("file",img)
    sendingData.append('objectData',JSON.stringify(formData))
    console.log("sending to server")
    const response = await fetch("http://localhost:1337/api/uploadWorkerData", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
      body: sendingData
      });

      const data = await response.json();
      console.log(data)
  }

  return (
    <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}>

      {token && <div>
        <Navbar/>
        <Hamburger/>
      </div>}
      {!flip && 
          <div>
          <Toaster />
          <form className="upload-container" onSubmit={handleSubmit}>

            <div className="upload-left">
              <div className="input-wrapper">
                <input
                  type="file"
                  id="imgfile"
                  className="image-input"
                  onChange={() => {
                    setImg(document.getElementById("imgfile").files[0]);
                    setImgName(document.getElementById("imgfile").files[0].name)
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p>Upload Resume</p>
                {imgName ? (
                  <h4>{imgName}</h4>
                ) : (
                  <h4>Files supported png, jpg, pdf.</h4>
                )}
              </div>
            </div>


            <div className="upload-right">
              <div className="upload-unit">
                <h1>Name</h1>
                <input
                  placeholder="Eg: John Doe"
                  onChange={(e) => {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        name: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="upload-unit">
                <h1>Profession</h1>
                <input
                  placeholder="Eg: Electrician"
                  onChange={(e) => {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        profession: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="upload-unit">
                <h1>About You</h1>
                <input
                  placeholder="Eg: Electrician"
                  onChange={(e) => {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        about: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
            <motion.button
              type="submit"
              className="form-button"
              onClick={handleSubmit}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.15 },
                backgroundColor: "#0CAD28",
              }}
              whileTap={{ scale: 0.9 }}
            >
              Upload
            </motion.button>
          </form>
        </div>
      }
      <Footer />
      {!token&&<div>
       <h1>PLEASE SIGNIN TO VIEW THIS PAGE</h1>
      </div>}

    </motion.div>
  );
}

export default Application;
