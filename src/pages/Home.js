import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Hamburger from "../components/Hamburger";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import homeimg from "../images/homePic.png";

function Home() {
  const [token] = useState(localStorage.getItem("token"));
  const [dataFetched, setDatafetched] = useState(false);
  const [userData, setUserData] = useState([]); //We will store user information over here and since we have used password hashing in backend..users information wont be sacrificed
  let navigate = useNavigate();
  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);

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
  function toFindWork() {
    navigate("/Findwork");
  }
  function toAddWork() {
    navigate("/");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
    >
      {token && (
        <div>
          <Navbar />
          <Hamburger />
          {!flip && (
            <div className="Home-main">
              {/* <p>HOME PAGE CONTENT</p>
            {dataFetched&&<h1>Your name: {userData.userData.name || "No quote found"}</h1>     */}
              {dataFetched && (
                <section className="about-section">
                  <div className="container">
                    <div className="row">
                      <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                        <div className="inner-column">
                          <div className="sec-title">
                            <h2>WHY MYBUDDY?</h2>
                          </div>
                          <div className="text">When we look out in</div>
                          <div className="text">
                            It is no secret that the need for security in
                            today’s day and age is ever rising and MYBUDDY’s sole
                            purpose is to cater to these needs of the society.
                            Unlike other run of the mill security solutions,
                            which boast of solving other issues also in addition
                            to security, MYBUDDY focuses its undivided energy on
                            creating a safe environment for gated communities.
                          </div>
                          <div className="btn-box">
                            {userData.userData.role === "JOB" && (
                              <div
                                className="theme-btn btn-style-one"
                                onClick={toFindWork}
                              >
                                FIND WORK
                              </div>
                            )}
                            {userData.userData.role === "CLIENT" && (
                              <div
                                className="theme-btn btn-style-one"
                                onClick={toAddWork}
                              >
                                ADD WORK
                              </div>
                            )}
                            <br />
                            <br />
                            <br />
                          </div>
                        </div>
                      </div>

                      <div className="image-column col-lg-6 col-md-12 col-sm-12">
                        <div className="inner-column wow fadeInLeft">
                          {/* <div className="author-desc"> */}
                          {/* <h2>Rahul Kumar Yadav</h2> */}
                          {/* <span>Web Developer</span> */}
                          {/* </div> */}
                          <figure className="image-1">
                            {/* <a
                              href="#"
                              className="lightbox-image"
                              data-fancybox="images"
                            > */}
                            <img
                              src={homeimg}
                              // src="../images/homePic.png"
                              // style={{height:"4em"}}
                              // src="https:///i.ibb.co/QP6Nmpf/image-1-about.jpg"
                              alt=""
                            />
                            <h2>WHAT WE DO?</h2>
                            {/* </a> */}
                          </figure>
                        </div>
                      </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="sec-title">
                      <span className="title" style={{ marginLeft: "3em" }}>
                        Our Future Goal
                      </span>
                      <h2>We want to lead in innovation & Technology</h2>
                    </div>
                    <div className="text">
                      MYBUDDY is focused on providing gated communities with a
                      holistic and an integrated security management system.
                      With MYBUDDY in play, the residents can be assured that any
                      visitor stepping into their house will only be allowed
                      through the gate after being authenticated by them. This
                      eliminates a major threat of an intruder in the house.
                    </div>
                    <div className="text">
                      MYBUDDY also takes complete responsibility to implement
                      this security solution including the on-boarding of the
                      staff and service providers. 
                    </div>
                    <div className="text">
                    Complete and continuous
                      training to the guards is given, which help them in making
                      the best use of MYBUDDY’s features to create a safer
                      environment for the residents. While the implementation of
                      MYBUDDY does not require any infrastructure, it is
                      completely compatible with the existing infrastructure of
                      any community.
                    </div>
                    <div className="text">
                      In the end, I would say keep visiting our website and
                      enjoy the purpose driven Application.
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      )}
      <br />
      <br />
      <Footer />
      {!token && (
        <div>
          <h2>PLZ SIGNIN TO VIEW THIS PAGE</h2>
        </div>
      )}
    </motion.div>
  );
}

export default Home;
