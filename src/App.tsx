/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import Analyze from './components/Analyze/Analyze';
import TransactionList from './components/TransactionList/TransactionList';
import { useSelector } from 'react-redux';

function App() {
  const statement = useSelector((state: any) => state.statement);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/analyze' element={<Analyze />} />
        <Route path='/transactions' element={<TransactionList transactions={statement}/>} />
      </Routes>
    </Router>
  )
}

export default App
