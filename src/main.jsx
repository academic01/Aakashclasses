import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AppProvider>
      <App />
      <Toaster position="bottom-right" reverseOrder={false} />
    </AppProvider>
  </AuthProvider>
)
