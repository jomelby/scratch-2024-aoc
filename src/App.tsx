import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Day08 from './react_days/Day08';
import Day09 from './react_days/Day09';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/day08">Day 08</Link></li>
          <li><Link to="/day09">Day 09</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/day08" element={<Day08 />} />
        <Route path="/day09" element={<Day09 />} />
      </Routes>
    </Router>
  );
};

export default App;