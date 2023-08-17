import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MovieDetailPage from './components/MovieDetailPage';
import Account from './containers/Account';
import Homepage from './containers/HomePage';
import LoginForm from './containers/LoginForm';
import Navbar from './containers/Navbar';
import RegisterForm from './containers/RegisterForm';
import SearchPage from './containers/SearchPage';
import WishList from './containers/WishList';

function App() {
  return (
    <Router>
      <Navbar /> {/* Render the Navbar component */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/search_page" element={<SearchPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
