import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Landing from './pages/landingPage/Landing';
import Contact from './pages/contact/Contact';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import Users from './pages/users/Users';
import User from './pages/users/User';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/users/:id' element={<User/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      
    </>
  )
}

export default App
