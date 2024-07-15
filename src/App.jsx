import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Firebase'; // Import auth from your Firebase configuration
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import SignUp from './components/Signup';
import Review from './components/Review'
import UserReview from './components/UserReview';
import UserMovieReviews from './components/UserMovieReviews';
// import Sidebar from './components/Sidebar';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      } else {
        navigate('/login');
      }
    });
  
    return () => unsubscribe();
  }, []);

  const name = localStorage.getItem('name');

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('Logout successful');
    }).catch((error) => {
      console.error('Logout error:', error.message);
    });
  };

  return (
    <div style={{height:'100vh', overflow:'hidden'}}>
      {/* <Sidebar /> */}
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/review/:id' element={<Review/>}/>
        <Route path='/profile/:name' element={<Profile/>}/>
        <Route path='/user/reviews' element={<UserReview/>}/> 
        <Route path='/user/:id' element={<UserMovieReviews/>}/>
      </Routes>
    </div>
  );
}

export default App;
