import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "twind/shim"   // <-- Add this line
import { setup } from 'twind'    // <-- Add this line
import { Provider } from 'react-redux'
import {store} from './state'

setup()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
