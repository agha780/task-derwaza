import React from "react";
import { Alert } from "react-bootstrap";
import { auth } from "../firebase-config";
import { useState } from "react";
import PwdRequist from "./pwdRequist";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const Signup = () => {
  //useNavigate will allow us to move into routes between paths
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  //setError and errorMessage is used to check if the passwords matchs or not
  const [errorMessage, setError] = useState("");
  const [invalidGmail, setInvalidGmail] = useState("");
  const [errorMessageMail, setErrorMessageMail] = useState("");

  //user and setUser are used to display the email of the user
  const [user, setUser] = useState({});
  //this for the passowrd Requist field to check if the user clicked the Password field digit method.
  const [pwdRequist, setPwdRequist] = useState(false);
  //to check te displayName
  const [displayName, setDisplayName] = useState("");
  //useState for rules like the min characters: 8 + contains at least 1 letter, number and symbols
  const [checks, setCheck] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLentghCheck: false,
    specalCharCheck: false,
  });

  //Function for useranme to track the user input on the username field.
  const handleChangeUserName = (event) => {
    setDisplayName(event.target.value);

    // Just to check if everything is workng.
    console.log(displayName);
  };

  // This function will be called to gnerate the current user using firebase function, it will work like useEffect.
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // An important function to register new user on the signup page.
  const register = async () => {
    //I used an if statment to check if the two passwords are same or not.
    if (registerPassword !== confirmpassword) {
      console.log("The passwords dont match");
      setError("Password do not Match");
      return;
    } else {
      setError("");
      console.log("Ok.");
    }

    try {
      //CreateUserWithEmailAndPassword takes only email and password functions, for the username we will be using a diffrent function.
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      // UpdatProfile will allow us to take a displayName from the user.
      const users = await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      //navigate to the home page after its done.
      navigate("/home");
      //This user will have all the signup data for the user, consol.log it here made it easy to track the data.
      console.log(user);
    } catch (error) {
      setErrorMessageMail(error.message);
    }
    //Empty sets for some hardCoded errors to handle signup.
    setError("");
    setErrorMessageMail("");
    setInvalidGmail("");
  };

  //A function handlefocus for the password requist.
  const handleOnFocus = () => {
    setPwdRequist(true);
  };

  //A function Blur the password requist
  const handlOnBlur = () => {
    setPwdRequist(false);
  };

  // This function will check the min characters: 8 + contains at least 1 letter, number and symbols
  const handleOnKeyUp = (event) => {
    const { value } = event.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLentghCheck = value.length >= 8;
    const specalCharCheck = /[!@#$%^&*]/.test(value);
    //set the setCheck to new value
    setCheck({
      value,
      capsLetterCheck,
      numberCheck,
      pwdLentghCheck,
      specalCharCheck,
    });
  };
  // using Bootstrap makes CSS way easier
  return (
    <div className="text-center">
      <main className="form-signin w-100 m-auto">
        <div>
          <h1 className="h3 mb-4 fw-normal"> Sign Up</h1>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <div className="form-floating  mb-2">
            <input
              className="form-control mb-2"
              placeholder="Full Name..."
              value={displayName}
              onChange={handleChangeUserName}
            />{" "}
            <label htmlFor="floatingInput">User Name</label>
          </div>

          <div className="form-floating  mb-2">
            <input
              className="form-control"
              placeholder="name@example.com"
              type="email"
              id="floatingInput"
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          {/* needs to have the min characters: 8 + contains at least 1 letter, number and symbols */}
          <div className="form-floating  mb-2">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              value={registerPassword}
              onFocus={handleOnFocus}
              onBlur={handlOnBlur}
              onKeyUp={handleOnKeyUp}
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {/* this will appear when i clicked the input field of the password */}
          {pwdRequist ? (
            // Some conditons to check the Passwords rules
            <PwdRequist
              capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
              numberFlag={checks.numberCheck ? "valid" : "invalid"}
              pwdLentghFlag={checks.pwdLentghCheck ? "valid" : "invalid"}
              specalCharFlag={checks.specalCharCheck ? "valid" : "invalid"}
            />
          ) : null}

          <div className="form-floating  mb-2">
            <input
              className="form-control mb-2"
              placeholder=" Conform Password..."
              type="password"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <label htmlFor="floatingPasswordConfirmed">
              confirmed password
            </label>
          </div>

          <button className="w-100 btn btn-lg btn-primary " onClick={register}>
            {" "}
            Create User
          </button>
          <p className="mt-2 mb-1 ">
            {" "}
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
