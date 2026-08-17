import './App.css'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import toast, { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/client/register'
import HomePage from './pages/HomePage'
import { GoogleOAuthProvider } from '@react-oauth/google'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const hasGoogleClientId = Boolean(googleClientId && googleClientId.trim());

  const appContent = (
    <BrowserRouter>
      <Toaster position='top-center'/>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />}></Route>
        <Route
          path="/login"
          element={
            hasGoogleClientId ? <LoginPage /> : (
              <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                  <h2 className="text-xl font-semibold text-slate-800">Google login is not configured</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Add your Google client ID in the frontend .env file to enable the Google sign-in button.
                  </p>
                </div>
              </div>
            )
          }
        ></Route>
        <Route path="/*" element={<HomePage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );

  if (!hasGoogleClientId) {
    return appContent;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {appContent}
    </GoogleOAuthProvider>
  );
}

export default App
