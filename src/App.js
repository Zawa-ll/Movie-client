import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './containers/HomePage';
import LoginForm from './containers/LoginForm';
import Navbar from './containers/Navbar';
import RegisterForm from './containers/RegisterForm';

function App() {
  return (
    <Router>
      <Navbar /> {/* Render the Navbar component */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
