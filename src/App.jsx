import { useState } from 'react';  
import './App.css';
import Product from './components/procard.jsx';  // Ensure this file exists
import LoginPage from './components/pages/loging.jsx';
import HomePage from './components/pages/home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHomePage from './components/pages/adminhome.jsx';
import SignInPage from './components/pages/signup.jsx';
import SignUpPage from './components/pages/signup.jsx';
import { Toaster } from 'react-hot-toast';
import FileUploadTest from './components/pages/test.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
    <Toaster position='top-right'/>
    <Routes path="/*">
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<SignUpPage/>}/>
    <Route path="/product" element={<Product/>}/>
    <Route path="/admin/*" element={<AdminHomePage/>}/>
    <Route path="/*" element={<HomePage/>}/>
    <Route path="/test" element={<FileUploadTest/>}/>


    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
