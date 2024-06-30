import './App.css'
import { Routes, Route, useLocation  } from 'react-router-dom';

///////////////////// MaterialUI ////////////////////
import Box from '@mui/material/Box';

//////////////////// PAGES /////////////////////////
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import Index from './pages/Index';
import QRCustomization from './pages/QRCustomization';
import Landing from './pages/Landing';
import Profile from './pages/Profile';

//////////////////// COMPONENTS ////////////////////////
import SideMenu from './components/SideMenu/SideMenu';
import Register from './pages/Register';
import ProtectedRoute from './contexts/ProtectedRoute';

function App() {
  const location = useLocation(); 
  const hideMenuRoutes = ['/register', '/login'];

  return (
    <Box sx={{ display: 'flex' }}>
      {!hideMenuRoutes.includes(location.pathname) && <SideMenu />}
      <Box component="main" >
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/customize" element={<ProtectedRoute><QRCustomization /></ProtectedRoute>} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App
