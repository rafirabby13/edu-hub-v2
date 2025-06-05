import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";
import { useEffect } from "react";

const Privateroutes = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location.pathname);
  const { loading, user, responseCount } = useContext(AuthContext);
  // console.log("loading", loading);
  useEffect(() => {
    if (responseCount === 5) {
      // console.log("responseCount ", responseCount);
      navigate("/plans");
    }
  }, [responseCount, navigate]);
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return children;
};

export default Privateroutes;
