import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomDataGrid from '../components/CustomDataGrid/CustomDataGrid';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      await fetchTransactions(); 
    };
    initializeData();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/transactions/gettransactions');
      const transactionsWithId = response.data.map((transaction) => ({
        ...transaction,
        id: transaction.transaction_id, // Map transaction_id to id
      }));
      setTransactions(transactionsWithId);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'vendor', headerName: 'Vendor', width: 100 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'card_id', headerName: 'Card ID', width: 80 },
    { field: 'sender', headerName: 'Sender', width: 80 },
    { field: 'recipient', headerName: 'Recipient', width: 80 },
  ];

  return (
    <div>
      <h1>Transaction History</h1>
      <CustomDataGrid rows={transactions} columns={columns} />
    </div>
  );
};

export default Transactions;
