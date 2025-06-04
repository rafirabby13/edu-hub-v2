import React from 'react';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router';
import { router } from './Layout/Layout.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
// import {AuthProvider} from '../src/providers/AuthProvider.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router}>
     <App />
   </RouterProvider>
   </AuthProvider>
  </StrictMode>,
)
