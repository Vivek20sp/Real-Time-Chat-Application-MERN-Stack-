import React, { useContext, useEffect } from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import SignIn from './Pages/SignIn/SignIn';
import Home from './Pages/Home/Home';
import { Navigate, Routes, Route } from "react-router-dom";
import Toaster from 'react-hot-toast';
import Context from './Context/ContextApi.jsx';

const App = () => {
  const context = useContext(Context);
  const { AuthToken } = context;
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center bagroundImage">
        <Routes>
          <Route path='/' element={AuthToken ? <Home /> : <Navigate to='/login' />} />
          <Route path="/login" element={AuthToken ? <Navigate to='/' /> : <Login />} />
          <Route path="/signin" element={AuthToken ? <Navigate to='/' /> : <SignIn />} />
        </Routes>
        <Toaster position="top-center"
          reverseOrder={false} />
      </div>
    </>
  )
}

export default App

