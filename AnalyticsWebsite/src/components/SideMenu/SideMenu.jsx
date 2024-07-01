import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Logo from '../../assets/applogo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 250;
const menuItems = [
    { text: 'Dashboard', value: '' },
    { text: 'Transactions', value: 'transactions' },
    { text: 'QR Customisation', value: 'customize' },
    { text: 'Profile', value: 'profile' },
];

export default function SideMenu() {
  const { authToken, logout } = useAuth();

  return (
    <Box sx={{ display: 'flex', marginLeft: '2rem' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            margin: '2rem',
            borderRadius: '10px',
            border: 'none',
            height: 'calc(100% - 4rem)',
            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            top: 0,
            left: 0, 
            // display: 'flex',
            // justifyContent: 'space-between',       
          },
        }}
        variant="permanent"
        anchor="left"
      >

        <Toolbar sx={{ paddingBottom: '1rem' }}>
          <Link to='/landing'>
            <Box component="img" src={Logo} alt="Logo" sx={{ height: 40, paddingTop: '1.5rem' }} />
          </Link>
        </Toolbar>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.value} sx={{ padding: '0 .5rem' }}>
              <ListItemButton
                sx={{
                  '&:hover': {
                    backgroundColor: 'blue',
                    color: 'white',
                  },
                }}
              >
                <Link to={item.value}>
                  {item.text}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
          {authToken && (
            <ListItem sx={{ padding: '0 .5rem' }}>
              <ListItemButton
                sx={{
                  '&:hover': {
                    backgroundColor: 'blue',
                    color: 'white',
                  },
                }}
                onClick={logout} 
              >
                <Link to="/login">
                  Logout
                </Link>
              </ListItemButton>
            </ListItem>
          )}
        </List>

      </Drawer>
    </Box>
  );
}
