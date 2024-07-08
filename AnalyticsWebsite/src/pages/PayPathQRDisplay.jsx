import React, { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import { QRCode } from '@jackybaby/react-custom-qrcode';
import axios from 'axios';

import PayPathLogoEdited from '../assets/PayPath_logo_edited.png';

import LogoHeader from '../components/LogoHeader/LogoHeader';

const PayPathQRDisplay = () => {

    const [paymentData, setPaymentData] = useState(null);
    // const [account, setAccount] = useState(null)

    const [updatedData, setData] = useState({})


    const QR_IMAGE_ENDPOINT = "http://localhost:8000/qr_images/get/merchantId/13";
    const API_BASE_URL = "http://localhost:8000";
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    window.addEventListener("beforeunload", () => {
        window.opener.postMessage("windowClosed", "http://localhost:5174")
    })
    const [image, setImage] = useState(null);
    const [logoOpacity] = useState(0.4);

    // QR Window launched - get QR Image if available
    useEffect(() => {
        getQRImage();
    }, [])

    // API call
    const checkTransaction = async (transaction_ref) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/transactions/checktransaction/${transaction_ref}`);
            return response.data;
        } catch (error) {
            console.error('Check Transaction error:', error);
            throw error;
        }
    }

    const getQRImage = async () => {
        try {
            const response = await axios.get(QR_IMAGE_ENDPOINT, { responseType: 'blob' });
            const blob = URL.createObjectURL(new Blob([response.data], { type: "image/png" }));
            setImage(blob);
        } catch (error) {
            console.error(error);
        }
    };

    let transaction_reference = "";
    const salt = Math.random().toString(36).substring(2, 15);
    transaction_reference = updatedData.merchant + salt;

    // Check for amount of transactions every 2 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            checkTransaction(transaction_reference).then(
                response => {
                    if (response) {
                        setPaymentSuccess(true)
                        console.debug("Success!!")
                        console.debug(response.length)
                        var opener = window.opener;
                        if (opener) {
                            opener.postMessage("Success", "http://localhost:5174");
                        }
                        setPaymentSuccess(true);
                        setTimeout(() => {
                            window.close();
                        }, 5000);
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
            if (event.origin !== "http://localhost:5174") return; // Ensure you are receiving messages from the correct origin

            console.log('Received message:', event.data);

            setPaymentData(event.data);

            setData({
                items: event.data.items,
                account_id: event.data.vendor,
                wallet_id: event.data.vendor,
                merchant: event.data.merchant_name,
                amount: event.data.amount,
                description: event.data.description,
                ...(transaction_reference && { transaction_reference }),
            })
        };

        window.addEventListener("message", handleMessage);



        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [])

    const calculateTotalPrice = (data) => {
        let total = 0;
        for (let item of data) {
            total += item.price
        }
        return total
    }

    return (
        <div className="page-container">

            <div className="PayPath-container">

                <div className="PayPath-logo-container">
                    <img 
                        src={PayPathLogoEdited} 
                        alt="PayPath logo"
                    />
                    <h3>PayPath</h3>
                </div>  

                <div className="PayPath-card">

                {paymentData ? (

                    !paymentSuccess ? 

                    <>
                        <h1 style={{marginBottom: "20px"}}>{paymentData.merchant_name}</h1>

                        <section className="PayPath-section payment-details">

                        <svg  xmlns="http://www.w3.org/2000/svg"  
                            width="80"  
                            height="80"  
                            viewBox="0 0 24 24"  
                            fill="none"  
                            stroke="var(--desat-secondary)"  
                            stroke-width="2"  
                            stroke-linecap="round"  
                            stroke-linejoin="round"  
                            class="icon icon-tabler icons-tabler-outline icon-tabler-receipt">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2" />
                        </svg>
                            <h2>Payment Details</h2>

                            <table className="payment-table">
                                <tbody>
                                    {paymentData.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="item-column">{item.name}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="item-column total"><strong>Total:</strong></td>
                                        <td className="amount-column total"><strong>${updatedData.amount}</strong></td>
                                    </tr>
                                </tbody>
                            </table>

                        </section>

                        <section className="PayPath-section">

                            <div style={{padding: "0 40px"}}>
                                <h2 style={{marginBottom: "0"}}>Confirm payment</h2>
                                <p>Scan the QR code below with PayPath app</p>
                                <div className="qr-code-container">

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

                            </div>
                            
                        </section>
                        
                    </> 
                    
                    :

                    // payment received
                    (<>
                        <h1 style={{marginBottom: "20px"}}>{paymentData.merchant_name}</h1>

                        <section className="PayPath-section payment-details">

                            <svg xmlns="http://www.w3.org/2000/svg"  
                                width="80"  
                                height="80"  
                                viewBox="0 0 24 24"  
                                fill="none"  
                                stroke="#23b864"  
                                stroke-width="2"  
                                stroke-linecap="round"  
                                stroke-linejoin="round"  
                                class="icon icon-tabler icons-tabler-outline icon-tabler-circle-check">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                    <path d="M9 12l2 2l4 -4" />
                            </svg>
                            <h2 style={{marginTop: "0"}}>Payment received</h2>

                            <table className="payment-table">
                                <tbody>
                                    {paymentData.items.map((item, index) => (
                                        <tr key={index}
                                            className={index === paymentData.items.length - 1 ? 'last-item-row' : ''}
                                        >
                                            <td className="item-column">{item.name}</td>
                                        </tr>
                                    ))}
                                    <tr className="total-row">
                                        <td className="item-column total"><strong>Total:</strong></td>
                                        <td className="amount-column total"><strong>${updatedData.amount}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
   
                        </section>

                        <section className="PayPath-section" style={{padding: "0"}}>
                        </section>

                    </> )

                ) : (
                    <p>Waiting for payment data...</p>
                )}

                </div>

            </div>

        </div>
    )

}

export default PayPathQRDisplay