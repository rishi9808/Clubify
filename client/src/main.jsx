import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "twind/shim"   // <-- Add this line
import { setup } from 'twind'    // <-- Add this line

setup()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
