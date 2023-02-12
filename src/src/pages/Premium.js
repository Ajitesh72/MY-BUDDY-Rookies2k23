import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Hamburger from "../components/Hamburger";
import { motion } from "framer-motion";
import {  useNavigate } from "react-router-dom";
import { useState, useEffect, React } from "react";
import Footer from "../components/Footer";
import { useSelector} from "react-redux";
// STRIPE
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51MHWQrSA2zGpkJ04OIw8UzYwiNgqdsJ4v56C1qIYI4zcZuAj2W9bHgsx6DbTYzdTtdYfH8ugrM7TjW0EoUDoMwrV00Zk1UkrMl");

function Premium() {
   const [token] = useState(localStorage.getItem("token"));
  let navigate = useNavigate();
  const flip = useSelector((state) => state.mainReducer.flipNavbar.value);


// STRIPE
const handleClick = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    // Call your backend to create the Checkout Session
    const response = await fetch(
      "http://localhost:1337/create-checkout-session",
      {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      }
    );
    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    console.log(result)
    if (result.error) {
        return(<h1>ERROR OCCURED</h1>)
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };


  


  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    viewport={{ once: true }}>

      {token && (
        <div>
          <Navbar />
          <Hamburger/>
          {!flip && <div className="Home-main">
            <p>PREMIUM FOR RS.200</p>
            <button onClick={handleClick}>BE A PREMIUM MEMBER</button>
            {/* {dataFetched&&<h1>Your name: {userData.userData.name || "No quote found"}</h1>} */}
          </div>}
        </div>
      )}
      <Footer />
      {!token && 
        <div>
          <h2>PLZ SIGNIN TO VIEW THIS PAGE</h2>
        </div>
      }
    </motion.div>
  );
}

export default Premium;
