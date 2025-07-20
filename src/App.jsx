import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PromptGenerator from "./components/PromptGenerator";
import Tessaract from "./components/Tessaract";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      {/* //lg:max-w-[80%] lg:mx-auto */}
      <Navbar />
      <section className="h-[82px]"></section>
      <Outlet />
      <Footer/>
      {/* <PromptGenerator/> */}
      {/* <Tessaract/> */}
    </div>
  );
}

export default App;
