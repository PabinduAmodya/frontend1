import { useState } from 'react';  
import './App.css';
import Product from './components/procard.jsx';  // Ensure this file exists
import LoginPage from './components/pages/loging.jsx';
import HomePage from './components/pages/home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes path="/*">
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/*" element={<h1>ERROR OCCUR</h1>}/>

    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
