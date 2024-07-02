import React, { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import { QRCode } from '@jackybaby/react-custom-qrcode';
import axios from 'axios';

const PayPathQRDisplay = () => {

    const [paymentData, setPaymentData] = useState(null);
    // const [account, setAccount] = useState(null)

    const [updatedData, setData] = useState({})


    const ENDPOINT = "http://localhost:8000/transactions/gettransactions";
    const QR_IMAGE_ENDPOINT = "http://localhost:8000/qr_images/get/merchantId/13";
    const [numTransactions, setNumTransactions] = useState(0)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [image, setImage] = useState(null);
    const [logoOpacity] = useState(0.3);

    // QR Window launched - get current number of transactions
    useEffect(() => {
        getTransactions().then(
            response => {
                setNumTransactions(response.length);
            }
        ).catch(
            error => console.error(error)
        );
        getQRImage();
    }, [])

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

    const getQRImage = async () => {
        try {
            const response = await axios.get(QR_IMAGE_ENDPOINT, { responseType: 'blob' });
            const blob = URL.createObjectURL(new Blob([response.data], { type: "image/png" }));
            setImage(blob);
        } catch (error) {
            console.error(error);
        }
    };

    // Check for amount of transactions every 2 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            getTransactions().then(
                response => {
                    console.log(numTransactions)
                    if (response.length > numTransactions) {
                        setPaymentSuccess(true)
                        console.log("Success!!")
                        console.log(response.length)
                        window.parent.postMessage("Success", "http://localhost:5173");
                    }
                }
            ).catch(
                error => console.error(error)
            );
        }, 2000);

        return () => clearInterval(intervalId);
    }, [numTransactions]);

    useEffect(() => {

        const handleMessage = (event) => {
            console.log(event);
            if (event.origin !== "http://localhost:5173") return; // Ensure you are receiving messages from the correct origin

            console.log('Received message:', event.data);

            setPaymentData(event.data);

            setData({
                items: event.data.items,
                account_id: event.data.vendor,
                wallet_id: event.data.vendor,
                merchant: event.data.merchant_name,
                amount: event.data.amount,
                description: event.data.description,
            })
        };

        window.addEventListener("message", handleMessage);



        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [])

    // const data = [
    //     {
    //         name: "Wool Blend Wrap Felt Coat in Camel",
    //         price: 109.98,
    //         quantity: 1
    //     },
    //     {
    //         name: "Double Breasted Cut Away Chrombie Coat in Grey",
    //         price: 99.98,
    //         quantity: 1
    //     }
    // ]

    const calculateTotalPrice = (data) => {
        let total = 0;
        for (let item of data) {
            total += item.price
        }
        return total
    }

    // console.log(updatedData)

    // const qrData = 



    return (
        <div style={{ "display": "flex", "flexDirection": "column" }}>
            <h1>Pay with PayPath</h1>
            <div style={{ "display": "flex", "flexDirection": "column" }}>
                {paymentData ? (
                    <>
                        <div style={{ "display": "flex", "flexDirection": "column", "paddingBottom": "60px" }}>
                            <h2>{paymentData.merchant_name}</h2>
                            <h2>Payment Details</h2>
                            <div>Items:
                                {paymentData.items.map((item) => (
                                    <p>{item.name}</p>
                                ))
                                }</div>
                        </div>
                        <div>
                            <p>Total: ${updatedData.amount}</p>
                            <p>Scan this QR code in your PayPath app to confirm:</p>
                            {image ?
                                <QRCode
                                    value={JSON.stringify(updatedData)}
                                    size={260}
                                    bgColor="transparent"
                                    fgColor="#000000"
                                    logoImage={image}
                                    logoWidth={260}
                                    logoHeight={260}
                                    logoOpacity={logoOpacity}
                                    removeQrCodeBehindLogo={false}
                                    qrStyle="dots"
                                    ecLevel="H"
                                    id="myQRCode"
                                /> :
                                <QRCodeSVG
                                    value={JSON.stringify(updatedData)}
                                    size={260}
                                />
                            }

                        </div>
                    </>
                ) : (
                    <p>Waiting for payment data...</p>
                )}
            </div>
            {/* <div>
            <p>Don't have the app yet? Install here:</p>
            <button>Get PayPath on your mobile</button>
        </div> */}
        </div>
    )

}

export default PayPathQRDisplay