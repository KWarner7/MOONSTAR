import logo from './logo.svg';
import './App.css';
import { SignIn } from './login.js';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Moonstar
        </p>
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      </header>
    </div>
  );
}
   

export default App;
