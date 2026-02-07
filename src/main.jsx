import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from "react-ga4";

// Initialize Google Analytics 4
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (GA_ID) {
    ReactGA.initialize(GA_ID);
    // Track initial pageload
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </React.StrictMode>,
)
