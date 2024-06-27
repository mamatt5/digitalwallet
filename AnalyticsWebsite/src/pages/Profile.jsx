import React, { useEffect, useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Profile = () => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const [account, setAccount] = useState(null);
    const [merchant, setMerchant] = useState(null);
    const accountId = 13;

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

  console.log(account)
  console.log(merchant)

    return (
        <div ref={containerRef}>
            <h1>Profile</h1>
            <Card sx={{ minWidth: 275 }} ref={cardRef}>
                <CardContent sx={{textAlign:'left'}}>
                    <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom> Account details </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Email </Typography>
                    <Typography variant="body2">{account && account.email}</Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Password </Typography>
                    <Typography variant="body2">{account && account.password}</Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Phone number </Typography>
                    <Typography variant="body2">{account && account.phone_number}</Typography>
                    <Divider sx={{margin:'1rem 0'}}/>
                    <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom> Merchant details </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> Company Name </Typography>
                    <Typography variant="body2">{merchant && merchant.company_name}</Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> ABN </Typography>
                    <Typography variant="body2">{merchant && merchant.ABN}</Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
