import "../styles/Footer.css";
import { motion } from "framer-motion";
import { FaInstagramSquare,FaGithubSquare,FaLinkedin,FaEnvelopeSquare} from "react-icons/fa";

function Footer() {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    viewport={{ once: true }}className="contactUs">
      <div className="contactUs-body">
        <div className="info">
          <h2>MYBUDDY</h2>
          </div>
          <div className="info">

          <p>YOUR ALL IN ONE STOP TO CODING</p>
          </div>
          <div className="info">
          <p>DESIGNED AND DEVELOPED BY TEAM-RandomState42</p>
        </div>
        <div className="icons">
            <a  href="https://github.com/Ajitesh72">
            <FaGithubSquare size = '36' className="icons_img"color="black"/>
            </a>

            <a href="mailto: dubeyajitesh07@gmail.com">
            <FaEnvelopeSquare size ='36'className="icons_img" color="black"/>
            </a>

            <a href="https://www.instagram.com/ajitesh._/">
            <FaInstagramSquare size ='36'className="icons_img" color="black"/>
            </a>

            <a href="https://www.linkedin.com/in/ajitesh-dubey-4b5852220/">
            <FaLinkedin size ='36'className="icons_img" color="black"/>
            </a>
          </div>

      </div>
        
    </motion.div>
  );
}

export default Footer;
