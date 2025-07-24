import React from "react";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from './../Pages/Login/Login';
import Register from './../Pages/Register/Register';
import { createBrowserRouter } from "react-router";
import Privateroutes from "./Privateroutes";
import Faq from "../components/Faq";
import BlogSection from "../components/BlogSection";
import Plans from './../components/Plans';
import Chat from "../components/Chat";


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
        // element: <PricingPlans/>,
        element: <Plans/>,
      },
      {
        path: "upload",
        // element: <Privateroutes><PromptGenerator /></Privateroutes>
        element: <Privateroutes><Chat /></Privateroutes>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      },
      {
        path: "faq",
        element: <Faq/>
      },
      {
        path: "blog",
        element: <BlogSection/>
      },
      // {
      //   path: "chat",
      //   element: <Chat/>
      // }
    ],
  },
]);
