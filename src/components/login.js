import React, { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
//useNavigate is used to relocat the user to the homepage after clicking the submit button
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  //declare useNavigate function to be a constant to call it everytime to relocate the user to the home page;
  const navigate = useNavigate();

  //This function to keep the user Loged in no matter how much the page is refreshed
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate("/home");

      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <main className="form-signin w-100 m-auto">
        <h3 className="h3 mb-4 fw-normal"> Login </h3>
        <div className="form-floating  mb-2">
          <input
            className="form-control"
            placeholder="Email..."
            type="email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating  mb-2">
          <input
            className="form-control"
            placeholder="Password..."
            type="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />{" "}
          <label htmlFor="floatingInput">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary " onClick={login}>
          {" "}
          Login
        </button>
        <p className="mt-2 mb-1 ">
          {" "}
          Need an account? <Link to="/signup">Sign Up </Link>
        </p>
      </main>
    </div>
  );
};

export default Login;
