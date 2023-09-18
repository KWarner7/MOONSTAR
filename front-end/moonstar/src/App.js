import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage.js';
import Login from './Login.js';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </header>
    </div>
    </Router>
  );
}


export default App;