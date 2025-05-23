import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";
import PricingPlans from "../components/Pricingplans";
import Tessaract from "../components/Tessaract";
import PromptGenerator from "../components/PromptGenerator";


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
        element: <PromptGenerator/>
      },
    ],
  },
]);
