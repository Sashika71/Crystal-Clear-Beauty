import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import toast, { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/client/register'
import HomePage from './pages/HomePage'
function App() {


  return (

 <BrowserRouter>

 <Toaster position='top-center'/>

 <Routes>
          <Route path="/admin/*" element={<AdminPage />}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/*" element={<HomePage/>}></Route>
          {/* <Route path="/*" element={<h1>404 not found</h1>}></Route> */}
          <Route path="/register" element={<RegisterPage/>}></Route>



 </Routes>
 </BrowserRouter>
  );
}

export default App
