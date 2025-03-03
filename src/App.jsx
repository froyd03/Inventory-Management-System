import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Nav from './components/Nav.jsx'
import Header from './components/Header.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Protected from './components/Protected.jsx'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' 
              element={
                <Protected>
                  <Nav />
                  <Header />
                  <Dashboard />
                </Protected>
              }/>
      </Routes>
    </HashRouter>
  )
}

export default App
