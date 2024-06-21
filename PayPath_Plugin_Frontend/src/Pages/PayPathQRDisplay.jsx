import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react';
import axios from 'axios';

const PayPathQRDisplay = () => {

    const [paymentData, setPaymentData] = useState(null);
    const ENDPOINT = "http://localhost:8000/transactions/gettransactions";
    const [numTransactions, setNumTransactions] = useState(0)
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    // QR Window launched - get current number of transactions
    useEffect(() => {
        getTransactions().then(
            response => {
                setNumTransactions(response.length);
            }
        ).catch(
            error => console.error(error)
        );
    })

    // API call
    const getTransactions = async () => {
        try {
            const response = await axios.get(ENDPOINT);
            return response.data;
        } catch (error) {
            console.error('Get Transactions error:', error);
            throw error;
        }
    };

    // Check for amount of transactions every 2 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            getTransactions().then(
                response => {
                    if (response.length > numTransactions) {
                        setPaymentSuccess(true)
                        window.parent.postMessage("Success", "http://localhost:5173");
                    }
                }
            ).catch(
                error => console.error(error)
            );
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {

        const handleMessage = (event) => {
            console.log(event);
            if (event.origin !== "http://localhost:5173") return; // Ensure you are receiving messages from the correct origin

            console.log('Received message:', event.data);

            setPaymentData(event.data);
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [])

    return (
        <div>
            <h1>PayPath Payment</h1>
            {paymentData && (
                <div>
                    <h2>Payment Details</h2>
                    <p>Items: {paymentData.items.join(", ")}</p>
                    <p>Description: {paymentData.description}</p>
                    <p>Amount: ${paymentData.amount}</p>
                    <p>Vendor: {paymentData.vendor}</p>
                    <QRCode value={JSON.stringify(paymentData)} />
                </div>
            )}
        </div>
    )
}

export default PayPathQRDisplay