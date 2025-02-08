import { useState } from 'react';  
import './App.css';
import Product from './components/procard.jsx';  // Ensure this file exists
import LoginPage from './components/pages/loging.jsx';
import HomePage from './components/pages/home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHomePage from './components/pages/adminhome.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes path="/*">
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/product" element={<Product/>}/>
    <Route path="/admin/*" element={<AdminHomePage/>}/>
    <Route path="/*" element={<HomePage/>}/>

    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
