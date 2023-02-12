import "../styles/application.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Hamburger from "../components/Hamburger";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Application() {
  const [token] = useState(localStorage.getItem("token"));
  const [dataFetched, setDatafetched] = useState(false);
  const [userData, setUserData] = useState([]); //We will store user information over here and since we have used password hashing in backend..users information wont be sacrificed
  let navigate = useNavigate();
  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);
  const [imgName, setImgName] = useState("")
  const [img, setImg] = useState();

  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    about: ""

  })
  useEffect(() => {
    // const token=localStorage.getItem("token")
    if (token) {
      getuserData();
    }
  }, [token]);

  async function getuserData() {
    const response = await fetch("http://localhost:1337/api/home/userData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (data) {
      setUserData(data);
      setDatafetched(true);
      console.log(data);
    } else {
      return <h1>SOME ERROR OCCURED</h1>;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (formData.name && formData.profession && formData.about && img) {
      const sendingData = new FormData();
      sendingData.append("file", img)
      sendingData.append('objectData', JSON.stringify(formData))
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
      if (data.status === "ok") {
        toast.success("WE WILL CONNECT WITH YOU AFTER ACCEPTING YOUR APPLICATION,HANG TIGHT!")
        setTimeout(function () {
          navigate("/Home");
        }, 2000);
        if (data.status !== "ok") {
          toast.error("YOU HAVE ALREADY SENT IN YOUR Application,HANG TIGHT WHILE WE REVIEW YOUR APPLICATION")
        }
      }
    }
    else{
      toast.error("PLEASE ENTER ALL THE FIELDS OF THIS FORM TO SUBMIT AN APPLICATION");
      return ;
    }

  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}>

      {token && <div>
        <Navbar />
        <Hamburger />
      </div>}
      {!flip && token &&
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
      {!token && <div>
        <h1>PLEASE SIGNIN TO VIEW THIS PAGE</h1>
      </div>}

    </motion.div>
  );
}

export default Application;
