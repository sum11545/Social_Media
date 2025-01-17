import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Form from "./Components/Form"; // Corrected here: 'Form' instead of 'From'
import AdminDashboard from "./Components/AdminDashboard";

const App = () => {
  return (
    <Router> {/* Wrap everything inside Router */}
      <div>
        <Routes>
          <Route path="/" element={<Form />} /> {/* Corrected: use Form here */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
