import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
const Logedin = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
    //when logout take me to the login again
    navigate("/login");
  };

  return (
    <div>
      <main className="form-signin w-100 m-auto">
        <h1> User Logged In </h1>
        {user && (
          <div>
            <h3>
              Welcome! <br />
            </h3>
            <b>{user.displayName}</b> <br />
            your current email is:
            <b> {user.email} </b>
          </div>
        )}
        <button className="w-100 btn btn-lg btn-primary" onClick={logout}>
          {" "}
          Sign Out{" "}
        </button>
      </main>
    </div>
  );
};

export default Logedin;
