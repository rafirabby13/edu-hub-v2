import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PromptGenerator from './components/PromptGenerator'
import Tessaract from './components/Tessaract';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <PromptGenerator/>
     {/* <Tessaract/> */}
    </>
  )
}

export default App
