import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import WriteData from './WriteForm';
import ReadData from './ReadForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<WriteData />} />
        <Route path="/read" element={<ReadData />} />
      </Routes>
    </Router>
  );
}

export default App;
