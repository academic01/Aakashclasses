import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'

// Import your publishable key
const PUBLISHABLE_KEY = "pk_test_Y29taWMtdXJzaW5lLTg2LmNsZXJrLmFjY291bnRzLmRldiQ"; 

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

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
  </StrictMode>,
)
