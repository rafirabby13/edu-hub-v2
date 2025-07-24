import React from "react";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../firebase/Firebase.init.js";
import axios from "axios";
import { axiosSecure } from "../hooks/useAxiosConfig.jsx";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(true);
  const [theme, setTheme] = useState('light')
  const [responseCount, setResponseCount] = useState(0)
  const [tutors, setTutors] = useState([]);


  const googleProvider = new GoogleAuthProvider()

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin=()=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const authInfo = {
    loginUser,
    registerUser,
    user,
    loading,
    setLoading,
    logoutUser,
    tutors,
    setUser,
    setTutors,
    booking,
    setBooking,
    theme, 
    googleLogin,
    setTheme,
    responseCount,
    setResponseCount
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("currentUser", currentUser?.email);
      setUser(currentUser);
      if (currentUser?.email) {
        const user = {
          email: currentUser.email
        }
        // axios.post("http://localhost:5000/jwt", user, { withCredentials: true })
        
        axiosSecure.post("/jwt", user).then(res=>{
          console.log(res.data)
          if (res.data.success) {
            setLoading(false)
            
          }
        })

        
      }
      else{
        axios.post("http://localhost:5000/logout", {}, {withCredentials: true}).then(res=>{
          console.log(res.data)
          if (res.data.success) {
            setLoading(false)
            
          }
        })
        
      }
     
    });

    return () => {
      unsubscribe();
    };
  }, [loading]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
