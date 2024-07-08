import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import almond_milk from "../assets/almond_milk.png"
import coffee_beans from "../assets/coffee_beans.jpg"
import french_press from "../assets/french_press.png"

import afterpay_logo from "../assets/afterpay_logo.png"
import credit_card_logo from "../assets/credit_card_icon.png"
import paypal_logo from "../assets/paypal_icon.png"
import paypal_logo_small from "../assets/paypal_logo_small.png"
import afterpay_logo_small from "../assets/afterpay_logo_small.png"
import paypath_logo_small from "../assets/ap_logo_small.png"

import "./CheckoutPage.css";

const CheckoutPage = () => {

    const navigate = useNavigate();
    
    const [paymentOption, setPaymentOption] = useState(4); //Set which payment option is selected

    const altPaymentScreen = () => {

        return (
            <div>
                {paymentOption === 2 && 
                    <button className="paypal-button">
                        <div style={{"display":"flex", "justifyContent":"center"}}>
                            <img style={{"paddingRight":"12px"}} src={paypal_logo_small} width="30" />Pay with PayPal
                        </div>
                    </button>}
                {paymentOption === 3 && 
                    <button className="afterpay-button">
                        <div style={{"display":"flex", "justifyContent":"center"}}>
                            <img style={{"paddingRight":"12px"}} src={afterpay_logo_small} width="30" />Pay with Afterpay
                        </div>
                    </button>}
                {paymentOption === 4 && 
                    <button className="paypath-button" id="paypath-button" onClick={() => window.paypathButtonOnClick()}>
                        <div id="paypath-div" style={{"display":"flex", "justifyContent":"center"}}>
                            <img id="paypath-logo" style={{"paddingRight":"12px", "width": "30px"}} src={paypath_logo_small}/>Pay with PayPath
                        </div>
                    </button>
                }
            </div>
        )
    }

    const listOfItems = [
        {
            name: "Lora's Signature Coffee Beans 500g",
            price: 29.00,
            quantity: 2
        },
        {
            name: "French Press Coffee Maker",
            price: 69.95,
            quantity: 1
        },
        {
            name: "MILKLAB Almond Milk (8 X 1L)",
            price: 48.99,
            quantity: 1
        },
    ]

    window.getItems = () => {
        return listOfItems;
    }

    window.transactionComplete = () => {
        navigate("/receipt");
        return false;
    }

    const calculateTotalPrice = (data) => {
        let total = 0;
        for (let item of data) {
            total += item.price * item.quantity
        }
        return total
    }

    const creditCardForm = () => {

        return (
            <form>
                <input type="text" placeholder="Card Number" />
                <div class="date-field">
                    <div class="month">
                        <select name="Month">
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                        </select>
                    </div>
                    <div class="year">
                        <select name="Year">
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        </select>
                    </div>
                </div>
                <div class="card-verification">
                    <div class="cvv-input">
                        <input type="text" placeholder="CVV" />
                    </div>
                </div>
                <button type="submit" class="proceed-btn">Proceed</button>
            </form>
        )
    }
    
    return (
        <div>
            <h1>Lora's Cafe Specialty Products</h1>
            <div className="item-list">
            <h2>Checkout</h2>
                <div className="item">
                    <img src={coffee_beans} height="232" width="180" />
                    <div className="item-description">
                        <p style={{"fontWeight":"bold"}}>{listOfItems[0].name}</p>
                        <p>${listOfItems[0].price.toFixed(2)}</p>
                        <p>Quantity: {listOfItems[0].quantity}</p>
                        <button>Remove Item</button>
                    </div>
                </div>
                <div className="item">
                    <img src={french_press} height="232" width="180"/>
                    <div className="item-description">
                        <p style={{"fontWeight":"bold"}}>{listOfItems[1].name}</p>
                        <p>${listOfItems[1].price}</p>
                        <p>Quantity: {listOfItems[1].quantity}</p>
                        <button>Remove Item</button>
                    </div>
                </div>
                <div className="item">
                    <img src={almond_milk} height="232" width="180"/>
                    <div className="item-description">
                        <p style={{"fontWeight":"bold"}}>{listOfItems[2].name}</p>
                        <p>${listOfItems[2].price}</p>
                        <p>Quantity: {listOfItems[2].quantity}</p>
                        <button>Remove Item</button>
                    </div>
                </div>
            </div>
            <div className="total-price">
                <p><b>Subtotal(Before GST):</b> ${(calculateTotalPrice(listOfItems) * 0.91).toFixed(2)}</p>
                <p><b>GST:</b> ${(calculateTotalPrice(listOfItems) * 0.09).toFixed(2)}</p>
                <p><b>Total:</b> ${calculateTotalPrice(listOfItems)}</p>
            </div>
            <div className="all-payments">
                <h2>Pay Here:</h2>
                <div className="payment" onClick={() => setPaymentOption(1)}>
                    <div className="payment-name">
                        <img src={credit_card_logo} width="56" />
                        <p>Credit/Debit Card</p>
                    </div>
                    <div>
                        {paymentOption === 1 && creditCardForm()}
                    </div>
                </div>
                <div className="payment" onClick={() => setPaymentOption(2)}>
                    <div className="payment-name">
                        <img src={paypal_logo} width="56" />
                        <p>PayPal</p>
                    </div>
                    <div>
                        {paymentOption === 2 && altPaymentScreen()}
                    </div>
                </div>
                <div className="payment" onClick={() => setPaymentOption(3)}>
                    <div className="payment-name">
                        <img src={afterpay_logo} width="56" />
                        <p>Afterpay</p>
                    </div>
                    <div>
                        {paymentOption === 3 && altPaymentScreen()}
                    </div>
                </div>
                <div className="payment" onClick={() => setPaymentOption(4)}>
                    <div className="payment-name">
                        <img src={paypath_logo_small} width="56" />
                        <p>PayPath</p>
                    </div>
                    <div id="payPathApiDiv">
                        {paymentOption === 4 && altPaymentScreen()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage