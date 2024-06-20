import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react';

const PayPathQRDisplay = () => {

    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {

        const handleMessage = (event) => {
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