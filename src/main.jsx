import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'

// Fetch key with a safety fallback string to prevent top-level crashes
// Support both Vite and Next.js naming conventions for the Clerk key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

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
