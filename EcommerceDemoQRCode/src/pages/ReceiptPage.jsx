import React, { useState } from 'react'

import "./ReceiptPage.css"

const ReceiptPage = () => {
  return (
    <div>
      
      <h1>Lora's Cafe Specialty Products</h1>

      <h2>Thanks for your order! 😊☕️</h2>

      {/* <div className="item">

      </div> */}
      <div style={{
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        marginBottom: "20px"
      }}>

        <p style={{width: "65%"}}>If you have any questions or need to modify your order, please contact us at (123) 456-7890 or email support@lorascafe.com.
        </p>

      </div>
    
      <button>Back to store</button>


    </div>
  )
}

export default ReceiptPage