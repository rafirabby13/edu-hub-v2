import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";

import { SplineIcon } from "lucide-react";
import { axiosSecure } from "../hooks/useAxiosConfig";

const Privateroutes = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();


  // console.log(location.pathname);
  const { loading, user, responseCount } = useContext(AuthContext);
  const [status, setStatus] = useState('pending')
  // console.log("loading", user);

  useEffect(() => {
    const userPaymentStatus = async () => {
      // const response = await axios.get(
      //   // `http://localhost:5000/${user?.email}`
      //   `${import.meta.env.VITE_BACKEND_URL}/user/${user?.email}`
      // );
      if (loading) {
        return <SplineIcon />
      }
      const response = await axiosSecure.get(`/user/${user?.email}`)
      if (response) {
        
        console.log("res.....private..", response)
        setStatus(response?.data?.status)
        console.log(response.data);
      }
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
