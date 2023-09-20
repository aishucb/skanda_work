import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Routes
import Home from './home'; // Make sure the path is accurate
import WriteData from './WriteForm';
import ReadData from './ReadForm';


function App() {
  return (
    <Router>
    <Routes> {/* Use Routes instead of Switch */}
      <Route path="/" element={<Home />} />
      <Route path="/write" element={<WriteData />} /> {/* Use element prop */}
      <Route path="/read" element={<ReadData />} /> {/* Use element prop */}
    </Routes>
  </Router>
  );
}

export default App;
