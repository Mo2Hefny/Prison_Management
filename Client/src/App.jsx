import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import Page from './components/Page'
import Prisoners from './pages/Prisoners'
import PrisonUnits from './pages/PrisonUnits'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Sidebar></Sidebar>
        <div className="content">
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="/prison-units" element={<PrisonUnits/>}></Route>
          <Route exact path="/prisoners" element={<Prisoners/>}></Route>
          <Route exact path="/" element={<Prisoners/>}></Route>

        </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
