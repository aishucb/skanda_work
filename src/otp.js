import React, { Component } from "react";
import { app } from "./config/firebase";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import './otp.css';

const auth = getAuth(app);
const db = firebase.firestore();
// ... Your existing imports ...

class OtpApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      otp: "",
      name: "",
      place: "", // Change place to be a dropdown selection
      uniqueid: "",
      // Add a state variable to track OTP submission
      otpSubmitted: false,
      // Adding state variables for the second form
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
      input9: "",
      input10: "",
      input11: "",
      input12: "",
      // Add a state variable to track the second form submission
      secondFormSubmitted: false,
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
  
    // Check if confirmationResult exists
    if (window.confirmationResult) {
      const code = this.state.otp;
  
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          const user = result.user;
          console.log(JSON.stringify(user));
          alert("OTP verification successful");
  
          // Set the otpSubmitted state to true
          this.setState({ otpSubmitted: true });
        })
        .catch((error) => {
          console.error("Error verifying OTP:", error);
        });
    } else {
      console.error("confirmationResult is not properly set");
    }
  };

  // Function to handle the second form submission
  onSubmitSecondForm = (e) => {
    e.preventDefault();
    // Process and store the values for the second form here
    // You can access the input values using this.state
    const {
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      input7,
      input8,
      input9,
      input10,
      input11,
      input12,
      place, // Include place in the data to determine the collection
    } = this.state;

    // Perform any necessary operations with the input values
    // For example, you can send them to Firebase or perform validation

    // Determine the collection based on the selected place
    const collectionName = place.toLowerCase(); // Convert to lowercase for consistency

    // Here, we are adding the data from both forms to Firebase
    const { name, uniqueid } = this.state;
    const data = {
      name: name,
      uniqueid: uniqueid,
      input1: input1,
      input2: input2,
      input3: input3,
      input4: input4,
      input5: input5,
      input6: input6,
      input7: input7,
      input8: input8,
      input9: input9,
      input10: input10,
      input11: input11,
      input12: input12,
    };

    // Replace 'your_collection_name' with your actual Firebase collection name
    const collectionRef = db.collection(collectionName);

    collectionRef
      .add(data)
      .then(() => {
        console.log("Values stored in Firebase");
        alert("Record added successfully");
        // Set the secondFormSubmitted state to true
        this.setState({ secondFormSubmitted: true });
      })
      .catch((error) => {
        console.error("Error storing values in Firebase:", error);
      });
  };

  render() {
    return (
      <div style={{ backgroundColor: "white" }} className="divisions">
        <h2 style={{ color: "white", fontSize: "30px" }}>Insert Data</h2>
        <br />
        <input
          type="text"
          name="name"
          style={{ color: "black", fontFamily: " 'Poppins', sans-serif" }}
          placeholder="Name"
          required
          onChange={this.handleChange}
        /><br />
<br></br>
        {/* Replace the input for "Place" with a dropdown */}
        <select
          name="place"
          style={{  fontFamily: " 'Poppins', sans-serif" }}
          value={this.state.place}
          onChange={this.handleChange}
          required
        >
          <option value="" disabled>
            Select collection
          </option>
          <option value="alpha">alpha</option>
          <option value="beta">beta</option>
          <option value="gamma">gamma</option>
          <option value="charlie">charlie</option>
          {/* Add more options as needed */}
        </select>
        <br />
        <input
          type="number"
          name="uniqueid"
          style={{  fontFamily: " 'Poppins', sans-serif",color:"black" }}
          placeholder="Unique ID"
          required
          onChange={this.handleChange}
        /><br /><br/>
      <div style={{backgroundColor:'#f9943633',width:'contain',padding:"50px"}}>
        
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input
            type="number"
            name="mobile"
            placeholder="Mobile number"
            required
            onChange={this.handleChange}
          /><br /><br />
          <button type="submit" style={{ backgroundColor: "#f99436", color: "white" }}>Mobile verification</button><br />
        </form><br />

        <form onSubmit={this.onSubmitOTP}>
          <h2 style={{ color: "white" }}>OTP login</h2>
          <input
            type="number"
            name="otp"
            placeholder="OTP number"
            required
            onChange={this.handleChange}
          />
          <button type="submit" style={{ backgroundColor: "#f99436", color: "white" }}>Verify OTP</button><br />
          <br />
        </form></div>

        {/* Conditionally render the second form */}
        {this.state.otpSubmitted && !this.state.secondFormSubmitted && (
          <form onSubmit={this.onSubmitSecondForm} style={{textAlign:"center"}}>
            <h2 style={{ color: "white",padding:'25px' }}>Second Form</h2>
            <div className="input-row">
            <input
              type="text"
              name="input1"
              placeholder="Input 1"
              value={this.state.input1}
              style={{maxWidth:"40%"}}
              onChange={this.handleChange}
            />&nbsp;&nbsp;
            <input
              type="text"
              name="input2"
              placeholder="Input 2"
              style={{maxWidth:"40%"}}
              value={this.state.input2}
              onChange={this.handleChange}
            /><br /></div>
            {/* Repeat the above input pattern for the remaining 10 inputs */}
            {/* input3 to input12 */}
            <div className="input-row">
            <input
              type="text"
              name="input3"
              placeholder="Input 3"
              style={{maxWidth:"40%"}}
              value={this.state.input3}
              onChange={this.handleChange}
            /><br />
            <input
              type="text"
              name="input4"
              placeholder="Input 4"
              value={this.state.input4}
              style={{maxWidth:"40%"}}
              onChange={this.handleChange}
            /><br />
            </div>
            <div className="input-row">
            <input
              type="text"
              name="input5"
              placeholder="Input 5"
              style={{maxWidth:"40%"}}
              value={this.state.input5}
              onChange={this.handleChange}
            /><br />
            <input
              type="text"
              name="input6"
              style={{maxWidth:"40%"}}
              placeholder="Input 6"
              value={this.state.input6}
              onChange={this.handleChange}
            /><br />
            </div>
            <div className="input-row">
            <input
              type="text"
              name="input7"
              placeholder="Input 7"
              style={{maxWidth:"40%"}}
              value={this.state.input7}
              onChange={this.handleChange}
            /><br />
            <input
              type="text"
              name="input8"
              placeholder="Input 8"
              style={{maxWidth:"40%"}}
              value={this.state.input8}
              onChange={this.handleChange}
            /><br />
            </div>
            <div className="input-row">
            <input
              type="text"
              name="input9"
              placeholder="Input 9"
              style={{maxWidth:"40%"}}
              value={this.state.input9}
              onChange={this.handleChange}
            /><br />
            <input
              type="text"
              name="input10"
              placeholder="Input 10"
              style={{maxWidth:"40%"}}
              value={this.state.input10}
              onChange={this.handleChange}
            /><br />
            </div>
            <div className="input-row">
            <input
              type="text"
              name="input11"
              placeholder="Input 11"
              style={{maxWidth:"40%"}}
              value={this.state.input11}
              onChange={this.handleChange}
            /><br />
            <input
              type="text"
              name="input12"
              placeholder="Input 12"
              style={{maxWidth:"40%"}}
              value={this.state.input12}
              onChange={this.handleChange}
            /><br />
            </div>
            <button type="submit" style={{ backgroundColor: "#f99436", color: "white" }}>Submit</button><br />
            <br />
          </form>
        )}
      </div>
    );
  }
}

export default OtpApp;
