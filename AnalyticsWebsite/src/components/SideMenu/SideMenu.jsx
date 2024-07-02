import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import { CurrencyExchange, Logout, QrCode, ManageAccounts, SsidChart, Menu, Visibility } from '@mui/icons-material';
import Logo from '../../assets/applogo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './SideMenu.css';

const drawerWidth = 250;
const collapsedDrawerWidth = 70;

const menuItems = [
  { text: 'Dashboard', value: '', icon: SsidChart },
  { text: 'Transactions', value: 'transactions', icon: CurrencyExchange },
  { text: 'QR Customisation', value: 'customize', icon: QrCode },
  { text: 'Profile', value: 'profile', icon: ManageAccounts },
];

export default function SideMenu() {
  const { authToken, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <Box sx={{ display: 'flex', marginLeft: '2rem' }}>
      <Drawer
        sx={{
          width: collapsed ? collapsedDrawerWidth : drawerWidth,
          overflow: 'hidden',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: collapsed ? collapsedDrawerWidth : drawerWidth,
            boxSizing: 'border-box',
            margin: '2rem',
            borderRadius: '10px',
            border: 'none',
            height: 'calc(100% - 4rem)',
            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            top: 0,
            left: 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ paddingBottom: '1rem', paddingLeft:'1rem!important', display: '-webkit-box' , alignItems: 'center', overflow: 'hidden' }}>
          <IconButton onClick={handleToggleCollapse} 
            sx={{ 
              paddingLeft: '0', 
              paddingTop: '2rem', 
              marginRight: collapsed ? '2rem' : '1rem',
              outline: 'none',
              border: 'none',
              ':focus': { outline: 'none' },
              ':active': { outline: 'none', border: 'none' },
              ':hover': { backgroundColor: 'transparent' }
            }}>
            {collapsed ? <Visibility /> : <Menu />}
          </IconButton>
          {!collapsed && <Box component="img" src={Logo} alt="Logo" sx={{ height: 50, paddingTop: '1.5rem' }} />}
        </Toolbar>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.value} sx={{ padding: '0 .5rem', width: '100%' }}>
              <Link to={item.value} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
                <ListItemButton
                  sx={{
                    '&:hover': {
                      backgroundColor: 'blue',
                      color: 'white',
                    },
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    width: '100%',
                  }}
                >
                  <item.icon sx={{ fontSize: 24 }} />
                  {!collapsed && <span style={{ marginLeft: '10px' }}>{item.text}</span>}
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
          {authToken && (
            <ListItem sx={{ padding: '0 .5rem', width: '100%' }}>
              <Link to="/login" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
                <ListItemButton
                  sx={{
                    '&:hover': {
                      backgroundColor: 'blue',
                      color: 'white',
                    },
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    width: '100%',
                  }}
                  onClick={logout}
                >
                  <Logout sx={{ fontSize: 24 }} />
                  {!collapsed && <span style={{ marginLeft: '10px' }}>Logout</span>}
                </ListItemButton>
              </Link>
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
