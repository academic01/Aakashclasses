import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

// Conditional Wrapper to prevent the "White Screen of Death"
const AppWithAuth = () => {
  if (!PUBLISHABLE_KEY) {
    return (
      <AuthProvider>
        <AppProvider>
          <App />
          <Toaster position="bottom-right" reverseOrder={false} />
        </AppProvider>
      </AuthProvider>
    );
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider>
        <AppProvider>
          <App />
          <Toaster position="bottom-right" reverseOrder={false} />
        </AppProvider>
      </AuthProvider>
    </ClerkProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithAuth />
  </StrictMode>
)
