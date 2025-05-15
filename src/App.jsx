import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Inventory from './pages/Inventory/Inventory.jsx';
import Reports from './pages/Reports/Reports.jsx';
import Supplier from './pages/Suppliers/Supplier.jsx';
import Protected from './components/Protected.jsx';
import Orders from './pages/Orders/Orders.jsx';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route 
          path='/dashboard' 
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route 
          path='/inventory'
          element={
            <Protected>
              <Inventory />   
            </Protected>
          }
        />
        <Route
          path='/reports'
          element={
            <Protected>
              <Reports/>
            </Protected>
          }
        />
        <Route
          path='/supplier'
          element={
            <Protected>
              <Supplier/>
            </Protected>
          }
        />
        <Route
          path='/orders'
          element={
            <Protected>
              <Orders/>
            </Protected>
          }
        />

      </Routes>
    </HashRouter>
  )
}

export default App
