import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './Home';
import Gallery from './Gallery';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;