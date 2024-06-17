import React, { useState } from 'react'

import coat_image from "../assets/wool_blend_coat_image.jpg"
import grey_coat_image from "../assets/grey_coat_image.png"
import afterpay_logo from "../assets/afterpay_logo.png"
import paypath_logo from "../assets/APPlogo.png"
import credit_card_logo from "../assets/credit_card_icon.png"
import paypal_logo from "../assets/paypal_icon.png"

import "./CheckoutPage.css"

const CheckoutPage = () => {
    
    const [paymentOption, setPaymentOption] = useState(0) //Set which payment option is selected

    const altPaymentScreen = () => {

        return (
            <div>
                {paymentOption === 2 && <button className="paypal-button">Pay with PayPal</button>}
                {paymentOption === 3 && <button className="afterpay-button">Pay with Afterpay</button>}
                {paymentOption === 4 && <button className="paypath-button">Pay with PayPath</button>}
            </div>
        )
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
            <h1>Checkout</h1>
            <div className="item-list">
            <h2>Item List</h2>
                <div className="item">
                    <img src={coat_image} height="232" width="180" />
                    <div className="item-description">
                        <p style={{"fontWeight":"bold"}}>Basque</p>
                        <p>Wool Blend Wrap Felt Coat in Camel</p>
                        <p>$109.98</p>
                        <p>Quantity: 1</p>
                        <button>Remove Item</button>
                    </div>
                </div>
                <div className="item">
                    <img src={grey_coat_image} height="232" width="180"/>
                    <div className="item-description">
                        <p style={{"fontWeight":"bold"}}>Basque</p>
                        <p>Double Breasted Cut Away Crombie Coat in Grey</p>
                        <p>$99.98</p>
                        <p>Quantity: 1</p>
                        <button>Remove Item</button>
                    </div>
                </div>
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
                        <img src={paypath_logo} width="56" />
                        <p>PayPath</p>
                    </div>
                    <div>
                        {paymentOption === 4 && altPaymentScreen()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage