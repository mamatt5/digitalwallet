import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import './App.css'

import CheckoutPage from "./pages/CheckoutPage.jsx"
import ReceiptPage from './pages/ReceiptPage.jsx';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<CheckoutPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
      </Routes>
    </div>
  )
}

export default App
