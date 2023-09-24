import React, { Component } from "react";
import { app } from "./config/firebase";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import './otp.css';


const auth = getAuth(app);
const db = firebase.firestore();
class OtpApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      otp: "",
      value1: "", // Add three state variables for the values
      value2: "",
      value3: ""
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA verified");
        },
      }
    );
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = "+91" + this.state.mobile;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("SMS sent");
      })
      .catch((error) => {
        console.error("Error sending SMS:", error);
      });
  };

  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("Record added succefully");

        // Call the function to store values in Firebase here
        this.storeValuesInFirebase();
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });
  };

  // Function to store values in Firebase
  storeValuesInFirebase = () => {
    const { value1, value2, value3 } = this.state;
    
    // Replace 'your_collection_name' with your actual Firebase collection name
    const collectionRef = db.collection("alpha");

    collectionRef
      .add({
        value1: value1,
        value2: value2,
        value3: value3,
      })
      .then(() => {
        console.log("Values stored in Firebase");
      })
      .catch((error) => {
        console.error("Error storing values in Firebase:", error);
      });
  };

  render() {
    return (
      <div style={{backgroundColor :"#012b59"}} className="divisions">
        <h2 style={{color: "white"}}>Insert Data</h2>
        <br/>
          <input
            type="text"
            name="value1"
            placeholder="Value 1"
            required
            onChange={this.handleChange}
          /><br/>
          <input
            type="text"
            name="value2"
            placeholder="Value 2"
            required
            onChange={this.handleChange}
          /><br/>
          <input
            type="text"
            name="value3"
            placeholder="Value 3"
            required
            onChange={this.handleChange}
          /><br/>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input
            type="number"
            name="mobile"
            placeholder="Mobile number"
            required
            onChange={this.handleChange}
          /><br/><br/>
          <button type="submit" style={{ backgroundColor: "#e7eff0", color: "#012b59"}}>Submit</button><br/>
        </form><br/>
        <h2 style={{color: "white"}}>OTP login</h2>
        <input
            type="number"
            name="otp"
            placeholder="OTP number"
            required
            onChange={this.handleChange}
          /><br/>
        <form onSubmit={this.onSubmitOTP}>
          
          <button type="submit" style={{ backgroundColor: "#e7eff0", color: "#012b59"}}>Verify OTP</button>
        </form>
      </div>
    );
  }
}

export default OtpApp;
