import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'

// Fetch key with a safety fallback string to prevent top-level crashes
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_YmFsYW5jZWQtbGlvbi04OC5jbGVyay5hY2NvdW50cy5kZXYk"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider>
        <AppProvider>
          <App />
          <Toaster position="bottom-right" reverseOrder={false} />
        </AppProvider>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>
)
