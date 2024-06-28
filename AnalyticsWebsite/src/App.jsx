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
          <Route path="/" element={<Index />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/customize" element={<QRCustomization />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App
