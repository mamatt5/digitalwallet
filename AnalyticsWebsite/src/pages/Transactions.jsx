import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomDataGrid from '../components/CustomDataGrid/CustomDataGrid';

const generateTransactions = (numTransactions) => {
  const transactions = [];
  for (let i = 1; i <= numTransactions; i++) {
      const transaction = {
          vendor: 'Example ' + i,
          date: `2024-06-${Math.floor(Math.random() * 30) + 1}`,
          time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          amount: parseFloat((Math.random() * 1000).toFixed(2)),
          card_id: Math.floor(Math.random() * 20),
          sender: Math.floor(Math.random() * 10),
          recipient: 13,
          description: `Transaction ${i}`,
          items: [
              {
                  name: `Item ${i}`,
                  price: parseFloat((Math.random() * 100).toFixed(2)),
                  quantity: Math.floor(Math.random() * 10) + 1
              }
          ]
      };
      transactions.push(transaction);
  }
  return transactions;
};

const addDummyTransactions = async (numTransactions) => {
  const transactions = generateTransactions(numTransactions);
  for (const transaction of transactions) {
      try {
          await axios.post(`http://localhost:8000/transactions/addtransaction`, transaction);
      } catch (error) {
          console.error('Error adding transaction:', error);
      }
  }
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      await addDummyTransactions(10);
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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'vendor', headerName: 'Vendor', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'time', headerName: 'Time', width: 130 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'card_id', headerName: 'Card ID', width: 130 },
    { field: 'sender', headerName: 'Sender', width: 130 },
    { field: 'recipient', headerName: 'Recipient', width: 130 },
  ];

  return (
    <div>
      <h1>Transaction History</h1>
      <CustomDataGrid rows={transactions} columns={columns} />
    </div>
  );
};

export default Transactions;
