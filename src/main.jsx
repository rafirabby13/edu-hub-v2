import React from 'react';

import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router';
import { router } from './Layout/Layout.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router}>
     <App />
   </RouterProvider>
   </AuthProvider>
  </StrictMode>,
)
