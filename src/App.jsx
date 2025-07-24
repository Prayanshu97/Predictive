import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Home from './routes/home';
import Info from './routes/info';
import Result from './routes/result';
import Details from './routes/details';
import Profile from './routes/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:userId/info' element={<Info />} />
        <Route path='/:userId/details' element={<Details />} />
        <Route path='/:userId/:reportId/result' element={<Result />} />
        <Route path='/:userId/profile' element={<Profile />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}

export default App;
