import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import PayPathQRDisplay from './Pages/PayPathQRDisplay'

function App() {

  return (
      <Routes>
        <Route path="/" element={<PayPathQRDisplay />} />
      </Routes>
  )
}

export default App
