import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Home from './routes/home';
import Info from './routes/info';
import Result from './routes/result';
import Input from './routes/input';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:userId/info' element={<Info />} />
        <Route path='/:userId/result' element={<Result />} />
        <Route path='/:userId/input' element={<Input />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}

export default App;
