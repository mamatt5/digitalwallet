import './App.css'
import { Routes, Route, useLocation  } from 'react-router-dom';

///////////////////// MaterialUI ////////////////////
import Box from '@mui/material/Box';

//////////////////// PAGES /////////////////////////
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import Index from './pages/Index';
import QRCustomization from './pages/QRCustomization';
import Profile from './pages/Profile';
import ApiDocumentation from './pages/ApiDocumentation';
import PayPathQRDisplay from './pages/PayPathQRDisplay';

//////////////////// COMPONENTS ////////////////////////
import SideMenu from './components/SideMenu/SideMenu';
import ProtectedRoute from './contexts/ProtectedRoute';

function App() {
  const location = useLocation(); 
  const hideMenuRoutes = ['/register', '/login', '/pay'];

  return (
    <Box className="box-styling">
      {!hideMenuRoutes.includes(location.pathname) && <SideMenu />}
      <Box component="main" className="box-main-styling">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/customize" element={<ProtectedRoute><QRCustomization /></ProtectedRoute>} />
          <Route path="/api" element={<ProtectedRoute><ApiDocumentation /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/pay" element={<PayPathQRDisplay></PayPathQRDisplay>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App
