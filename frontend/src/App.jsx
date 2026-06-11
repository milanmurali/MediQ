import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Welcome } from './pages/Welcome'
import { Register } from './pages/Register'
import { Admin } from './pages/Admin'
import { Token } from './pages/Token'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/token" element={<Token />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
