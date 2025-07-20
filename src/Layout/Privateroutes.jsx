import React, { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";
import { useEffect } from "react";
import axios from "axios";

const Privateroutes = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location.pathname);
  const { loading, user, responseCount } = useContext(AuthContext);
  const [status, setStatus] = useState('pending')
  // console.log("loading", loading);
  useEffect(() => {
    const userPaymentStatus = async () => {
      const response = await axios.get(
        `http://localhost:5000/${user?.email}`
        // `https://edu-hub-server-1p4b.vercel.app/${user?.email}`
      );
      setStatus(response?.data?.status)
      console.log(response.data);
    };
    userPaymentStatus()
    if (status === "success") {
      return
    }
    if (responseCount === 5) {
      // console.log("responseCount ", responseCount);
      navigate("/plans");
    }
  }, [responseCount, navigate, status, user?.email]);
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return children;
};

export default Privateroutes;
