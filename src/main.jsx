import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { ThemeProvider } from "./context/ThemeContext";
createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)