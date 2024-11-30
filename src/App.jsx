// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TerminalIntro from './TerminalIntro';
import Home from './Home';
import MainPage from './MainPage';  // Add this import

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TerminalIntro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/main" element={<MainPage />} />  {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;