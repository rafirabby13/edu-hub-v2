import React, { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";

import useAxiosSecure from "../hooks/useAxiosSecure";
import { SplineIcon } from "lucide-react";

const Privateroutes = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  

  // console.log(location.pathname);
  const { loading, user, responseCount } = useContext(AuthContext);
  const [status, setStatus] = useState('pending')
  console.log("loading", user);
  // if (loading) {
  //   return <SplineIcon/>
  // }
  // useEffect(() => {
  //   const userPaymentStatus = async () => {
  //     // const response = await axios.get(
  //     //   // `http://localhost:5000/${user?.email}`
  //     //   `${import.meta.env.VITE_BACKEND_URL}/user/${user?.email}`
  //     // );

  //     const response = await axiosSecure.get(`/user/${user?.email}`)
  //     console.log("res.....private..", response)
  //     setStatus(response?.data?.status)
  //     console.log(response.data);
  //   };
  //   userPaymentStatus()
  //   if (status === "success") {
  //     return
  //   }
  //   if (responseCount === 5) {
  //     // console.log("responseCount ", responseCount);
  //     navigate("/plans");
  //   }
  // }, [responseCount, navigate, status, user?.email, axiosSecure]);
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return children;
};

export default Privateroutes;
