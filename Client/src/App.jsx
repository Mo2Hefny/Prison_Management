import { StrictMode, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import Page from './components/Page'
import UserTypePanel from './components/UserTypePanel'
import LoginPanel from './components/LoginPanel'
import Prisoners from './pages/Prisoners'
import PrisonUnits from './pages/PrisonUnits'
import Staff from './pages/Staff'
import Dashboard from './pages/Dashboard'
import Visitations from './pages/Visitations'
import MedicalRecords from './pages/MedicalRecords'

function App() {
  const [viewType, setViewType] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  console.log(viewType);
  const handleUserSelection = (type) => {
    setViewType("admin");
    setLoggedIn(true);
  }
  
  const logOut = () => {
    setLoggedIn(false);
  }

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Sidebar onLogOut={logOut} />
            <div className="content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard view={viewType} />} />
                <Route path="/prison-units" element={<PrisonUnits view={viewType} />} />
                <Route path="/prisoners" element={<Prisoners view={viewType} />} />
                <Route path="/visitations" element={<Visitations view={viewType} />} />
                <Route path="/staff" element={<Staff view={viewType} />} />
                <Route path="/medical-records" element={<MedicalRecords view={viewType} />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPanel onClick={handleUserSelection} />} />
            <Route path="/*" element={<Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App
