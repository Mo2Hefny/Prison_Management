import { useState } from 'react'
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import Page from './components/Page'

function App() {
  const [count, setCount] = useState(0)

  return (
//    <Router>
      <div className="App">
        <Sidebar></Sidebar>
        <div className="content">
        </div>
      </div>
//    </Router>
  )
}

export default App
