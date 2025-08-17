// Import React's StrictMode - Helps identify potential problems in development
// Enables additional checks and warnings for component lifecycle, deprecated APIs, etc.
import { StrictMode } from 'react'

// Import createRoot - Modern React 18+ way to render apps (replaces ReactDOM.render)
// Creates a root container for the React application
import { createRoot } from 'react-dom/client'

// Import global CSS styles that apply to the entire application
import './index.css'

// Import the main App component - The root component of our application
import App from './App.jsx'

// Import BrowserRouter - Enables client-side routing for single-page applications
// Allows navigation between different "pages" without full page reloadsf
import { BrowserRouter } from 'react-router'

// Import Toaster - Component for displaying toast notifications (success, error, info messages)
// From react-hot-toast library for user feedback
import {Toaster} from 'react-hot-toast'

// Create the root of the React application and render it to the DOM
// document.getElementById('root') finds the HTML element with id="root" (usually in index.html)
createRoot(document.getElementById('root')).render(
  // StrictMode wrapper - Only runs in development, helps catch bugs early
  <StrictMode>
    {/* BrowserRouter enables routing - wraps the entire app to enable navigation */}
    <BrowserRouter>
      {/* Main App component - Contains all our application logic and components */}
      <App />
      {/* Toaster component - Displays toast notifications anywhere in the app */}
      <Toaster/>
    </BrowserRouter>
  
  </StrictMode>,
)
