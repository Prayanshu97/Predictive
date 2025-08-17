import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/home';
import Info from './routes/info';
import Result from './routes/result';
import Details from './routes/details';
import Profile from './routes/profile';
import About from './routes/about';
import SignInPage from './auth/SignInPage';
import SignUpPage from './auth/SignUpPage';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { useEnsureUserProfile } from './lib/useEnsureUserProfile';

function AppRoutes() {
  useEnsureUserProfile();
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/:userId/info' element={<Info />} />
        <Route path='/:userId/details' element={<Details />} />
        <Route path='/:userId/:reportId/result' element={<Result />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path=":userId/profile" element={<><SignedIn><Profile /></SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
