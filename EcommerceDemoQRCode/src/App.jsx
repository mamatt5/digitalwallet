import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import './App.css'

import CheckoutPage from "./pages/CheckoutPage.jsx"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<CheckoutPage />} />
      </Routes>
    </div>
  )
}

export default App
