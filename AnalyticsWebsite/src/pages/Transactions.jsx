import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomDataGrid from '../components/CustomDataGrid/CustomDataGrid';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const API_BASE_URL = `http://${process.env.REACT_APP_LOCAL_IP}:8000`;

  useEffect(() => {
    const initializeData = async () => {
      await fetchTransactions(); 
    };
    initializeData();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions/gettransactions`);
      const transactionsWithId = response.data.map((transaction) => ({
        ...transaction,
        id: transaction.transaction_id, // Map transaction_id to id
        amount: "$"+transaction.amount
      }));
      setTransactions(transactionsWithId);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const columns = [
    // { field: 'id', headerName: 'ID', minWidth: 80 },
    // { field: 'vendor', headerName: 'Vendor', minWidth: 100 },
    { field: 'amount', headerName: 'Amount', minWidth: 200 },
    { field: 'date', headerName: 'Date', minWidth: 180 },
    { field: 'time', headerName: 'Time', minWidth: 180 },
    { field: 'description', headerName: 'Description', minWidth: 450 },
    // { field: 'card_id', headerName: 'Card ID', minWidth: 80 },
    // { field: 'sender', headerName: 'Sender', minWidth: 80 },
    // { field: 'recipient', headerName: 'Recipient', minWidth: 80 },
  ];

  return (
    <div className="page-container">
      <div className="dashboard-page-container">
        <h1>Transaction History</h1>
        <CustomDataGrid rows={transactions} columns={columns} />
      </div>
    </div>
  );
};

export default Transactions;
