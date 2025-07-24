import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/home';
import Info from './routes/info';
import Result from './routes/result';
import Details from './routes/details';
import Profile from './routes/profile';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:userId/info' element={<Info />} />
        <Route path='/:userId/details' element={<Details />} />
        <Route path='/:userId/:reportId/result' element={<Result />} />
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" forceRedirectUrl="/" /> } />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" forceRedirectUrl="/" />} />
        <Route path=":userId/profile" element={<><SignedIn><Profile /></SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>} />
       
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
