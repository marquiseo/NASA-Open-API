import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import ApodPage from './ApodPage';
import './App.css'

const App = () => {
  return (
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> | <Link to="/apod">NASA APOD</Link>
        </nav>
        <Outlet />
        <Routes>
          <Route path="/" element={<div>Home Page Content</div>} />
          <Route path="/apod" element={<ApodPage />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
