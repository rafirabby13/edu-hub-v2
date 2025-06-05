import React from "react";
import App from "../App";
import Home from "../Pages/Home/Home";
import PricingPlans from "../components/Pricingplans";
import PromptGenerator from "../components/PromptGenerator";
import Login from './../Pages/Login/Login';
import Register from './../Pages/Register/Register';
import { createBrowserRouter } from "react-router";
import Privateroutes from "./Privateroutes";
import ReactDOM from "react-dom/client";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "plans",
        element: <PricingPlans/>,
      },
      {
        path: "upload",
        element: <Privateroutes><PromptGenerator/></Privateroutes>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      },
    ],
  },
]);
