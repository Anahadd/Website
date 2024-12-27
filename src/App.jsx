import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  UNSAFE_useScrollRestoration
} from 'react-router-dom';
import TerminalIntro from './TerminalIntro';

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<TerminalIntro />} />
      </Routes>
    </Router>
  );
};

export default App;