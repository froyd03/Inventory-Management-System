import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider >
      <StrictMode>
        <App />
    </StrictMode>,
  </AuthProvider>
)
