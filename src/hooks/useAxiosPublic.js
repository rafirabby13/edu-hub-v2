import axios from 'axios';


export const axiosPublic = axios.create({
    baseURL: "http://localhost:5000", // or your Vercel deployed backend URL
    withCredentials: true, // this is important for cookie-based auth
});