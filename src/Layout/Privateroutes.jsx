import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import Loading from '../components/Loading';

const Privateroutes = ({children}) => {
   const location = useLocation()
  console.log(location);
    const {loading, user} = useContext(AuthContext)
    console.log("loading", loading);
    if (loading) {
        return <Loading/>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
}

export default Privateroutes
