import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import { CurrencyExchange, Logout, QrCode, ManageAccounts, SsidChart, Menu, Visibility, OpenInNew } from '@mui/icons-material';

import PayPathLogo from '../../assets/PayPath_logo_edited.png'

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useMediaQuery, useTheme } from '@mui/material';

import './SideMenu.css';

const drawerWidth = 250;
const collapsedDrawerWidth = 72;

const menuItems = [
  { text: 'Dashboard', value: '', icon: SsidChart },
  { text: 'Transactions', value: 'transactions', icon: CurrencyExchange },
  { text: 'QR Customisation', value: 'customize', icon: QrCode },
  { text: 'Profile', value: 'profile', icon: ManageAccounts },
];

export default function SideMenu() {
  const { authToken, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ ml:'0', paddingBottom: '1rem', paddingLeft: '1rem!important', display: '-webkit-box', alignItems: 'center', overflow: 'hidden' }}>
          <IconButton
            onClick={handleToggleCollapse}
            sx={{
              paddingLeft: '0',
              paddingTop: '2rem',
              marginRight: collapsed ? '0!important' : '1rem',
              marginLeft: collapsed ? '12px' : 0,
              outline: 'none',
              border: 'none',
              ':focus': { outline: 'none' },
              ':active': { outline: 'none', border: 'none' },
              ':hover': { backgroundColor: 'transparent' },
            }}
          >
            {collapsed ? <Visibility /> : <Menu />}
          </IconButton>

          {/* {!collapsed && <div style={{ display: 'flex', alignItems: 'center', margin: '0', paddingLeft: '-10px', textAlign: 'center', marginBottom: '15px', backgroundColor: 'orange'}}>
            <Box component="img" src={PayPathLogo} alt="Logo" sx={{ height: 50 }} />
            <h3 style={{ margin: 0, color: 'var(--primary)', marginLeft: '10px' }}>PayPath</h3>
          </div>} */}

        </Toolbar>
        
        <Box sx={{ flexGrow: 1 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.value} sx={{ padding: '0 .5rem', width: '100%' }}>

                <Link to={item.value} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
                  <ListItemButton
                    sx={{
                      '&:hover': {
                        backgroundColor: 'var(--secondary)',
                        color: 'var(--text)',
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
            <ListItem key="api" sx={{ padding: '0 .5rem', width: '100%' }}>

              <a href="https://paypath-2024.web.app/" target="_blank" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
                <ListItemButton
                  sx={{
                    '&:hover': {
                      backgroundColor: 'var(--secondary)',
                      color: 'var(--text)',
                    },
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    width: '100%',
                  }}
                >
                  <OpenInNew sx={{ fontSize: 24 }} />
                  {!collapsed && <span style={{ marginLeft: '10px' }}>PayPath API Documentation</span>}
                </ListItemButton>
              </a>
            </ListItem>

            {authToken && (
              <ListItem sx={{ padding: '0 .5rem', width: '100%' }}>
                <Link to="/login" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
                  <ListItemButton
                    sx={{
                      '&:hover': {
                        backgroundColor: 'var(--secondary)',
                        color: 'var(--text)',
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
        </Box>

        <div style={{ display: collapsed ? 'none' : 'flex', justifyContent: 'left', alignItems: 'center', padding: '1rem', textAlign: 'center', marginBottom: '15px' }}>
          <Box component="img" src={PayPathLogo} alt="Logo" sx={{ height: 40 }} />
          <h3 style={{ margin: 0, color: 'var(--primary)', marginLeft: '10px' }}>PayPath</h3>
        </div>

      </Drawer>
    </Box>
  );
}
