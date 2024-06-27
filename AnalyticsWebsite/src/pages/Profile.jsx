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

const Profile = () => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const [account, setAccount] = useState(null);
    const [merchant, setMerchant] = useState(null);
    const accountId = 13;
    const [open, setOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSavePassword = async () => {
        const response = await fetch(`http://localhost:8000/accounts/updatepassword/${account.email}`, {
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
            const response = await fetch(`http://localhost:8000/accounts/getaccount/${accountId}`);
            const data = await response.json();
            setAccount(data);
        } catch (error) {
        }
        };

        fetchAccount();
    }, [accountId]);

    useEffect(() => {
        const fetchMerchant = async () => {
        try {
            const response = await fetch(`http://localhost:8000/accounts/getmerchant/${accountId}`);
            const data = await response.json();
            setMerchant(data);
        } catch (error) {
        }
        };

        fetchMerchant();
    }, [accountId]);

    return (
        <div ref={containerRef}>
            <h1>Profile</h1>
            <Card sx={{ minWidth: 575 }} ref={cardRef}>
                <CardContent sx={{textAlign:'left'}}>
                    <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom> Account details </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Phone number </Typography>
                    <Typography variant="body2">{account && account.phone_number}</Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Email </Typography>
                    <Typography variant="body2">{account && account.email}</Typography>
                    <Box display="flex" alignItems="left">
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Password
                        </Typography>
                        <IconButton onClick={handleClickOpen}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Typography variant="body2">********************</Typography>
                    <Divider sx={{margin:'1rem 0'}}/>
                    <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom> Merchant details </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Company Name </Typography>
                    <Typography variant="body2">{merchant && merchant.company_name}</Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> ABN </Typography>
                    <Typography variant="body2">{merchant && merchant.ABN}</Typography>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose} sx={{ minWidth: 575 }}>
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
