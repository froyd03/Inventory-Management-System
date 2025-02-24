import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Nav from './components/Nav.jsx'
import Header from './components/Header.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' 
              element={
                <>
                <Nav /> 
                <Header />
                </>
              }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
