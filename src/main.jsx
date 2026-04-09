import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.warn("Clerk Publishable Key is missing. Auth features will be disabled.");
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <AuthProvider>
      <AppProvider>
        <App />
        <Toaster position="bottom-right" reverseOrder={false} />
      </AppProvider>
    </AuthProvider>
  </ClerkProvider>
)
