import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import LoggedIn from './pages/LoggedIn';

const App = () => {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<LoginPage />} />
          <Route path='/login' element={<LoggedIn />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
