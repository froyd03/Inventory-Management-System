import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Nav from './components/Nav.jsx'
import Header from './components/Header.jsx'

function App() {
  return (
    <BrowserRouter>
     <Header />
   </BrowserRouter>
  )
}

export default App
