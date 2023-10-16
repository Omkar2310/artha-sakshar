import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import Analyze from './components/Analyze/Analyze';

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/analyze' element={<Analyze />} />
      </Routes>
    </Router>
  )
}

export default App
