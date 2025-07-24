import axios from 'axios';
import React from 'react'


export const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", // or your Vercel deployed backend URL
    withCredentials: true, // this is important for cookie-based auth
});