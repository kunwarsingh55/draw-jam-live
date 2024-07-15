import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import WhiteBoardPage from './Pages/WhiteBoardPage/WhiteBoardPage'

import { DataContext } from './Contexts/DataContext';

function App() {

  const [user, setUser] = useState(null);
  const [whiteBoardSession, setWhiteBoardSession] = useState(null);
  

  return (
    <DataContext.Provider value={{ user, setUser, whiteBoardSession, setWhiteBoardSession }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/whiteboard" element={<WhiteBoardPage />} />
        </Routes>
      </Router>
    </DataContext.Provider >
  )
}

export default App;
