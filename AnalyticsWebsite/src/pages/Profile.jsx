import React, { useEffect, useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user: authUser } = useAuth(); 
  const [account, setAccount] = useState(null);
  const [merchant, setMerchant] = useState(null);
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const API_BASE_URL = `http://${process.env.REACT_APP_LOCAL_IP}:8000`;

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleSavePassword = async () => {
      const response = await fetch(`${API_BASE_URL}/accounts/updatepassword/${account.email}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
      console.log('Password updated successfully');
      handleClose();
      } else {
      console.error('Failed to update password');
      }
  };

  useEffect(() => {
      const fetchAccount = async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/accounts/getaccount/${authUser.account_id}`); 
          const data = await response.json();
          setAccount(data);
      } catch (error) {
          console.error('Failed to fetch account', error);
      }
      };

      if (authUser) {
          fetchAccount();
      }
  }, [authUser]);

  useEffect(() => {
      const fetchMerchant = async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/accounts/getmerchant/${authUser.account_id}`);
          const data = await response.json();
          setMerchant(data);
      } catch (error) {
          console.error('Failed to fetch merchant', error);
      }
      };

      if (authUser) {
          fetchMerchant();
      }
  }, [authUser]);

  return (
      <div className="page-container">
        <h1>Profile</h1>

        <Card sx={{ minWidth: 475 }}>
          <CardContent sx={{ textAlign: 'left' }}>

            <Typography sx={{ fontSize: 'var(--font-size-heading1)', marginBottom: '20px'}} color="text.primary" gutterBottom>
              Account details
            </Typography>

            <Typography sx={{ fontSize: 'var(--font-size-paragraph)', fontWeight: '600' }} color="text.secondary" gutterBottom>
              Phone number
            </Typography>
            <Typography sx={{ fontSize: 'var(--font-size-paragraph)', marginBottom: '20px'}} color="text.primary" variant="body2">
              {account && account.phone_number}
              </Typography>

            <Typography sx={{ fontSize: 'var(--font-size-paragraph)', fontWeight: '600' }} color="text.secondary" gutterBottom>
              Email
            </Typography>
            <Typography sx={{ fontSize: 'var(--font-size-paragraph)', marginBottom: "20px" }} variant="body2" color="text.primary">
              {account && account.email}
            </Typography>

            <Box display="inline-flex" alignItems="center" sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: 'var(--font-size-paragraph)', flexGrow: 1, fontWeight: '600' }} color="text.secondary">
                Password
              </Typography>
              <IconButton
                onClick={handleClickOpen}
                sx={{
                  ml: 1,
                  outline: 'none',
                  border: 'none',
                  padding: 0,
                  ':focus': { outline: 'none', border: 'none' },
                  justifyContent: 'left',
                  background: 'transparent !important',
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography sx={{ fontSize: 'var(--font-size-heading1)' }} 
              variant="body2" 
              color="text.primary"
            >
              ********************
            </Typography>
            
            <Divider sx={{ margin: '2rem 0' }} />

            
            <Typography sx={{ fontSize: 'var(--font-size-heading1)', marginBottom: '20px' }} color="text.primary" gutterBottom>
              Merchant details
            </Typography>

            <Typography sx={{ fontSize: 'var(--font-size-paragraph)', fontWeight: '600' }} color="text.secondary" gutterBottom>
              Company Name
            </Typography>

            <Typography sx={{ fontSize: 'var(--font-size-paragraph)', marginBottom: '20px' }} variant="body2" color="text.primary">
              {merchant && merchant.company_name}
            </Typography>

            <Typography sx={{ fontSize: 'var(--font-size-paragraph)', fontWeight: '600' }} color="text.secondary" gutterBottom>
              ABN
            </Typography>

            <Typography sx={{ fontSize: 'var(--font-size-paragraph)' }} variant="body2" color="text.primary">
              {merchant && merchant.ABN}
            </Typography>
          </CardContent>
        </Card>
  
        <Dialog open={open} onClose={handleClose} sx={{ '.MuiDialog-paper': { minWidth: 575, p: 1 } }}>
          <DialogTitle>Update Password</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="newPassword"
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSavePassword}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

export default Profile;
